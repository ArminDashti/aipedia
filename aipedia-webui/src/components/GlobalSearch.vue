<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import {
  buildCatalogIndex,
  categoryPathToHref,
  KIND_LABEL,
  searchCatalog,
  type CatalogSearchItem,
} from '@/lib/catalog-search'
import { searchEntries, type ApiEntry } from '@/lib/api'

type UnifiedResult = {
  key: string
  kindLabel: string
  label: string
  subtitle: string
  description: string
  href: string
  externalUrl?: string | null
  logo?: string | null
  source: 'catalog' | 'api'
}

const router = useRouter()
const query = ref('')
const open = ref(false)
const activeIndex = ref(0)
const catalogIndex = ref<CatalogSearchItem[]>([])
const catalogHits = ref<CatalogSearchItem[]>([])
const apiHits = ref<ApiEntry[]>([])
const loadingApi = ref(false)
const rootEl = ref<HTMLElement | null>(null)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const results = computed<UnifiedResult[]>(() => {
  const seen = new Set<string>()
  const out: UnifiedResult[] = []

  for (const item of catalogHits.value) {
    seen.add(`${item.label}|${item.subtitle}`.toLowerCase())
    out.push({
      key: item.id,
      kindLabel: KIND_LABEL[item.kind],
      label: item.label,
      subtitle: item.subtitle,
      description: item.description,
      href: item.href,
      externalUrl: item.url,
      logo: item.logo,
      source: 'catalog',
    })
    if (out.length >= 24) return out
  }

  for (const entry of apiHits.value) {
    const dedupe = `${entry.name}|${entry.ownerName ?? ''}`.toLowerCase()
    if (seen.has(dedupe)) continue
    seen.add(dedupe)
    out.push({
      key: `api:${entry.id}`,
      kindLabel: entry.categoryTitle || entry.categoryPath,
      label: entry.name,
      subtitle: entry.ownerName ?? entry.categoryPath,
      description: entry.description ?? '',
      href: categoryPathToHref(entry.categoryPath),
      externalUrl: entry.websiteUrl ?? entry.nameUrl,
      logo: entry.logoUrl,
      source: 'api',
    })
    if (out.length >= 24) break
  }
  return out
})

onMounted(async () => {
  catalogIndex.value = await buildCatalogIndex()
  document.addEventListener('keydown', onGlobalKey)
  document.addEventListener('click', onDocClick)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onGlobalKey)
  document.removeEventListener('click', onDocClick)
  if (debounceTimer) clearTimeout(debounceTimer)
})

function onGlobalKey(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    const input = rootEl.value?.querySelector('input')
    input?.focus()
    open.value = true
  }
}

function onDocClick(e: MouseEvent) {
  if (!rootEl.value?.contains(e.target as Node)) {
    open.value = false
  }
}

watch(query, (value) => {
  activeIndex.value = 0
  catalogHits.value = searchCatalog(catalogIndex.value, value)
  open.value = value.trim().length > 0

  if (debounceTimer) clearTimeout(debounceTimer)
  const q = value.trim()
  if (!q) {
    apiHits.value = []
    loadingApi.value = false
    return
  }
  loadingApi.value = true
  debounceTimer = setTimeout(async () => {
    try {
      apiHits.value = await searchEntries(q)
    } catch {
      apiHits.value = []
    } finally {
      loadingApi.value = false
    }
  }, 220)
})

function onKeydown(e: KeyboardEvent) {
  if (!open.value || results.value.length === 0) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % results.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    void selectResult(results.value[activeIndex.value])
  } else if (e.key === 'Escape') {
    open.value = false
  }
}

async function selectResult(item: UnifiedResult | undefined) {
  if (!item) return
  open.value = false
  query.value = ''
  await router.push(item.href)
}
</script>

<template>
  <div ref="rootEl" class="relative w-full max-w-md min-w-[12rem] flex-1">
    <label class="sr-only" for="global-search">Search AIPedia</label>
    <input
      id="global-search"
      v-model="query"
      type="search"
      autocomplete="off"
      placeholder="Search skills, tools, MCP…"
      class="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      aria-autocomplete="list"
      :aria-expanded="open"
      aria-controls="global-search-results"
      @focus="open = query.trim().length > 0"
      @keydown="onKeydown"
    />
    <kbd
      class="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground sm:inline"
    >
      Ctrl K
    </kbd>

    <div
      v-if="open"
      id="global-search-results"
      role="listbox"
      class="absolute left-0 right-0 z-50 mt-1 max-h-80 overflow-auto rounded-md border bg-card shadow-lg"
    >
      <p
        v-if="results.length === 0 && !loadingApi"
        class="px-3 py-4 text-sm text-muted-foreground"
      >
        No matches.
      </p>
      <button
        v-for="(item, idx) in results"
        :key="item.key"
        type="button"
        role="option"
        class="flex w-full items-start gap-3 border-b border-border/60 px-3 py-2 text-left last:border-0 hover:bg-accent"
        :class="idx === activeIndex ? 'bg-accent' : ''"
        :aria-selected="idx === activeIndex"
        @mouseenter="activeIndex = idx"
        @click="selectResult(item)"
      >
        <img
          v-if="item.logo"
          :src="item.logo"
          alt=""
          class="mt-0.5 h-5 w-5 shrink-0 rounded"
          loading="lazy"
        />
        <span v-else class="mt-0.5 h-5 w-5 shrink-0 rounded bg-muted" />
        <span class="min-w-0 flex-1">
          <span class="flex flex-wrap items-center gap-2">
            <span class="truncate text-sm font-medium text-foreground">{{ item.label }}</span>
            <span
              class="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
            >
              {{ item.kindLabel }}
            </span>
          </span>
          <span class="block truncate text-xs text-muted-foreground">
            {{ item.subtitle }}
            <template v-if="item.description"> — {{ item.description }}</template>
          </span>
        </span>
      </button>
      <p v-if="loadingApi" class="px-3 py-2 text-xs text-muted-foreground">Searching API…</p>
    </div>
  </div>
</template>
