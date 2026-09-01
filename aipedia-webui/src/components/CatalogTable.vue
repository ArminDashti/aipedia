<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { companyHomeUrl, companyIconSrc, companyLetter } from '@/data/company-icons'

export type CatalogColumn = {
  key: string
  label: string
  type?: 'text' | 'logo' | 'link' | 'multiline' | 'tick' | 'flag-country' | 'brand' | 'named-link'
  sortable?: boolean
}

type SortDir = 'asc' | 'desc'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    columns: CatalogColumn[]
    rows: Record<string, unknown>[]
    initialSortKey?: string | null
    initialSortDir?: SortDir
    /** Hide page title and description; use for nested section tables. */
    bare?: boolean
  }>(),
  {
    initialSortKey: null,
    initialSortDir: 'asc',
    bare: false,
  },
)

const filterColumnKey = ref('')
const filterQuery = ref('')
const sortKey = ref<string | null>(props.initialSortKey)
const sortDir = ref<SortDir>(props.initialSortDir)

const filterableColumns = computed(() =>
  props.columns.filter((column) => column.type !== 'logo'),
)

watch(
  filterableColumns,
  (columns) => {
    if (!columns.length) {
      filterColumnKey.value = ''
      return
    }
    if (!columns.some((column) => column.key === filterColumnKey.value)) {
      filterColumnKey.value = columns[0].key
    }
  },
  { immediate: true },
)

function cellValue(row: Record<string, unknown>, key: string): unknown {
  return row[key]
}

function asString(value: unknown): string {
  if (value == null) return '—'
  return String(value)
}

function asLink(value: unknown): string | null {
  if (typeof value !== 'string' || !value) return null
  return value
}

function asBoolean(value: unknown): boolean {
  return value === true
}

function resolveLinkHref(row: Record<string, unknown>, columnKey: string): string | null {
  return asLink(cellValue(row, columnKey)) ?? asLink(row.url) ?? null
}

function resolveNamedLinkHref(row: Record<string, unknown>, columnKey: string): string | null {
  const cell = cellValue(row, columnKey)
  if (typeof cell === 'string' && /^https?:\/\//i.test(cell)) return cell
  return asLink(row.github) ?? asLink(row.url) ?? null
}

function brandName(row: Record<string, unknown>, columnKey: string): string {
  return asString(cellValue(row, columnKey))
}

function brandIcon(row: Record<string, unknown>, columnKey: string): string | null {
  const fromMap = companyIconSrc(brandName(row, columnKey))
  if (fromMap) return fromMap
  const logo = asLink(row.logo)
  return logo
}

function brandHref(row: Record<string, unknown>, columnKey: string): string | null {
  const name = brandName(row, columnKey)
  const mapped = companyHomeUrl(name)
  if (mapped) return mapped
  const rowUrl = asLink(row.url)
  if (rowUrl) return rowUrl
  if (columnKey === 'owner' && name && name !== '—') {
    return `https://github.com/${name}`
  }
  return null
}

function searchableText(row: Record<string, unknown>, column: CatalogColumn): string {
  if (column.type === 'tick') {
    const yes = asBoolean(cellValue(row, column.key))
    return yes ? 'yes true ✓' : 'no false ✗'
  }
  if (column.type === 'flag-country') {
    return `${asString(row.flag)} ${asString(row.country)}`.toLowerCase()
  }
  if (column.type === 'link' || column.type === 'named-link') {
    return `${asString(cellValue(row, column.key))} ${resolveNamedLinkHref(row, column.key) ?? ''}`.toLowerCase()
  }
  if (column.type === 'brand') {
    return brandName(row, column.key).toLowerCase()
  }
  return asString(cellValue(row, column.key)).toLowerCase()
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return Number(a) - Number(b)
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }
  const left = a == null ? '' : String(a)
  const right = b == null ? '' : String(b)
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' })
}

const displayedRows = computed(() => {
  const column = props.columns.find((item) => item.key === filterColumnKey.value)
  const query = filterQuery.value.trim().toLowerCase()

  let next = props.rows
  if (column && query) {
    next = next.filter((row) => searchableText(row, column).includes(query))
  }

  if (!sortKey.value) return next

  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...next].sort((left, right) => dir * compareValues(cellValue(left, key), cellValue(right, key)))
})

function isSortable(column: CatalogColumn): boolean {
  return column.sortable !== false && column.type !== 'logo'
}

function toggleSort(column: CatalogColumn) {
  if (!isSortable(column)) return
  if (sortKey.value !== column.key) {
    sortKey.value = column.key
    sortDir.value = 'asc'
    return
  }
  if (sortDir.value === 'asc') {
    sortDir.value = 'desc'
    return
  }
  sortKey.value = null
  sortDir.value = 'asc'
}

function sortIndicator(column: CatalogColumn): string {
  if (sortKey.value !== column.key) return '↕'
  return sortDir.value === 'asc' ? '↑' : '↓'
}
</script>

<template>
  <section class="flex flex-1 flex-col gap-4">
    <header v-if="!bare" class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-tight">{{ title }}</h1>
      <p v-if="description" class="text-sm text-muted-foreground">{{ description }}</p>
    </header>

    <div class="flex flex-wrap items-center gap-2">
      <label class="sr-only" for="catalog-filter-column">Column</label>
      <select
        id="catalog-filter-column"
        v-model="filterColumnKey"
        class="h-9 rounded-md border border-input bg-background px-2 text-sm"
      >
        <option
          v-for="column in filterableColumns"
          :key="column.key"
          :value="column.key"
        >
          {{ column.label }}
        </option>
      </select>
      <label class="sr-only" for="catalog-filter-query">Search</label>
      <input
        id="catalog-filter-query"
        v-model="filterQuery"
        type="search"
        placeholder="Search…"
        class="h-9 min-w-[12rem] flex-1 rounded-md border border-input bg-background px-3 text-sm"
      />
    </div>

    <div class="overflow-x-auto rounded-lg border bg-card">
      <table class="w-full border-collapse text-left text-sm">
        <thead>
          <tr class="border-b bg-muted/50">
            <th
              v-for="column in columns"
              :key="column.key"
              class="whitespace-nowrap px-3 py-2.5 font-medium text-muted-foreground"
            >
              <button
                v-if="isSortable(column)"
                type="button"
                class="inline-flex items-center gap-1 hover:text-foreground"
                @click="toggleSort(column)"
              >
                <span>{{ column.label }}</span>
                <span class="text-xs opacity-70" aria-hidden="true">{{ sortIndicator(column) }}</span>
              </button>
              <span v-else>{{ column.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in displayedRows"
            :key="index"
            class="border-b last:border-b-0 hover:bg-accent/40"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-3 py-2.5 align-middle"
            >
              <template v-if="column.type === 'logo'">
                <img
                  v-if="asLink(cellValue(row, column.key))"
                  :src="asString(cellValue(row, column.key))"
                  :alt="''"
                  width="24"
                  height="24"
                  class="size-6 bg-transparent"
                  loading="lazy"
                />
                <span v-else class="text-muted-foreground">—</span>
              </template>
              <template v-else-if="column.type === 'brand'">
                <span class="inline-flex items-center gap-2">
                  <img
                    v-if="brandIcon(row, column.key)"
                    :src="brandIcon(row, column.key)!"
                    alt=""
                    width="24"
                    height="24"
                    class="size-6 bg-transparent object-contain"
                    loading="lazy"
                  />
                  <span
                    v-else
                    class="inline-flex size-6 items-center justify-center bg-transparent text-xs font-semibold text-foreground"
                    aria-hidden="true"
                  >{{ companyLetter(brandName(row, column.key)) }}</span>
                  <a
                    v-if="brandHref(row, column.key)"
                    :href="brandHref(row, column.key)!"
                    class="text-primary underline-offset-2 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{{ brandName(row, column.key) }}</a>
                  <span v-else>{{ brandName(row, column.key) }}</span>
                </span>
              </template>
              <template v-else-if="column.type === 'named-link'">
                <a
                  v-if="resolveNamedLinkHref(row, column.key)"
                  :href="resolveNamedLinkHref(row, column.key)!"
                  class="text-primary underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >{{ asString(cellValue(row, column.key)) }}</a>
                <span v-else>{{ asString(cellValue(row, column.key)) }}</span>
              </template>
              <template v-else-if="column.type === 'link'">
                <a
                  v-if="resolveLinkHref(row, column.key)"
                  :href="resolveLinkHref(row, column.key)!"
                  class="text-primary underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
                <span v-else class="text-muted-foreground">—</span>
              </template>
              <template v-else-if="column.type === 'multiline'">
                <div class="whitespace-pre-line leading-relaxed">{{ asString(cellValue(row, column.key)) }}</div>
              </template>
              <template v-else-if="column.type === 'tick'">
                <span
                  class="inline-flex text-base font-semibold"
                  :class="asBoolean(cellValue(row, column.key)) ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'"
                  :aria-label="asBoolean(cellValue(row, column.key)) ? 'Yes' : 'No'"
                >
                  {{ asBoolean(cellValue(row, column.key)) ? '✓' : '✗' }}
                </span>
              </template>
              <template v-else-if="column.type === 'flag-country'">
                <span class="inline-flex items-center gap-2">
                  <span class="text-base leading-none" aria-hidden="true">{{ asString(cellValue(row, 'flag')) }}</span>
                  <span>{{ asString(cellValue(row, 'country')) }}</span>
                </span>
              </template>
              <template v-else>
                {{ asString(cellValue(row, column.key)) }}
              </template>
            </td>
          </tr>
          <tr v-if="displayedRows.length === 0">
            <td
              :colspan="columns.length"
              class="px-3 py-8 text-center text-muted-foreground"
            >
              No entries yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
