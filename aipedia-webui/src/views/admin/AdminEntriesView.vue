<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  adminCreateEntry,
  adminDeleteEntry,
  adminListCategories,
  adminListEntries,
  adminUpdateEntry,
  type ApiCategory,
  type ApiEntry,
  type EntryWriteBody,
} from '@/lib/api'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { username, refresh, signOut } = useAuth()

const entries = ref<ApiEntry[]>([])
const categories = ref<ApiCategory[]>([])
const filter = ref('')
const loading = ref(true)
const error = ref('')
const saving = ref(false)
const editingId = ref<number | null>(null)
const showForm = ref(false)

const form = reactive({
  categoryId: 0,
  name: '',
  nameUrl: '',
  logoUrl: '',
  ownerName: '',
  ownerUrl: '',
  websiteUrl: '',
  description: '',
  origin: '',
  freePlan: '',
  paidPlan: '',
  links: '',
})

const leafCategories = computed(() =>
  categories.value.filter((c) => c.kind === 'leaf' || c.entryCount > 0 || c.childCount === 0),
)

onMounted(async () => {
  const ok = await refresh()
  if (!ok) {
    await router.replace('/admin/login')
    return
  }
  await loadAll()
})

async function loadAll() {
  loading.value = true
  error.value = ''
  try {
    const [e, c] = await Promise.all([
      adminListEntries(filter.value),
      adminListCategories(),
    ])
    entries.value = e
    categories.value = c
    if (!form.categoryId && leafCategories.value.length) {
      form.categoryId = leafCategories.value[0].id
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Load failed'
    if (error.value === 'unauthorized') {
      await router.replace('/admin/login')
    }
  } finally {
    loading.value = false
  }
}

async function onSearch() {
  await loadAll()
}

function resetForm() {
  editingId.value = null
  form.name = ''
  form.nameUrl = ''
  form.logoUrl = ''
  form.ownerName = ''
  form.ownerUrl = ''
  form.websiteUrl = ''
  form.description = ''
  form.origin = ''
  form.freePlan = ''
  form.paidPlan = ''
  form.links = ''
  if (leafCategories.value.length) {
    form.categoryId = leafCategories.value[0].id
  }
}

function openCreate() {
  resetForm()
  showForm.value = true
}

function openEdit(entry: ApiEntry) {
  editingId.value = entry.id
  form.categoryId = entry.categoryId
  form.name = entry.name
  form.nameUrl = entry.nameUrl ?? ''
  form.logoUrl = entry.logoUrl ?? ''
  form.ownerName = entry.ownerName ?? ''
  form.ownerUrl = entry.ownerUrl ?? ''
  form.websiteUrl = entry.websiteUrl ?? ''
  form.description = entry.description ?? ''
  form.origin = entry.origin ?? ''
  form.freePlan = entry.freePlan ?? ''
  form.paidPlan = entry.paidPlan ?? ''
  form.links = entry.links ?? ''
  showForm.value = true
}

function toBody(): EntryWriteBody {
  const emptyToNull = (v: string) => {
    const t = v.trim()
    return t === '' ? null : t
  }
  return {
    categoryId: form.categoryId,
    name: form.name.trim(),
    nameUrl: emptyToNull(form.nameUrl),
    logoUrl: emptyToNull(form.logoUrl),
    ownerName: emptyToNull(form.ownerName),
    ownerUrl: emptyToNull(form.ownerUrl),
    websiteUrl: emptyToNull(form.websiteUrl),
    description: emptyToNull(form.description),
    origin: emptyToNull(form.origin),
    freePlan: emptyToNull(form.freePlan),
    paidPlan: emptyToNull(form.paidPlan),
    links: emptyToNull(form.links),
  }
}

async function onSave() {
  if (!form.name.trim() || !form.categoryId) {
    error.value = 'Name and category are required'
    return
  }
  saving.value = true
  error.value = ''
  try {
    const body = toBody()
    if (editingId.value) {
      await adminUpdateEntry(editingId.value, body)
    } else {
      await adminCreateEntry(body)
    }
    showForm.value = false
    resetForm()
    await loadAll()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Save failed'
  } finally {
    saving.value = false
  }
}

async function onDelete(entry: ApiEntry) {
  if (!confirm(`Delete “${entry.name}”?`)) return
  error.value = ''
  try {
    await adminDeleteEntry(entry.id)
    await loadAll()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Delete failed'
  }
}

async function onLogout() {
  await signOut()
  await router.replace('/admin/login')
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Entries</h1>
        <p class="text-sm text-muted-foreground">
          Signed in as {{ username }}. Add, edit, or delete catalog entries.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" @click="onLogout">Log out</Button>
        <Button size="sm" @click="openCreate">Add entry</Button>
      </div>
    </div>

    <form class="flex flex-wrap gap-2" @submit.prevent="onSearch">
      <input
        v-model="filter"
        type="search"
        placeholder="Filter entries…"
        class="h-9 min-w-[16rem] flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <Button type="submit" variant="outline" size="sm">Search</Button>
    </form>

    <p v-if="error" class="text-sm text-destructive" role="alert">{{ error }}</p>
    <p v-if="loading" class="text-sm text-muted-foreground">Loading…</p>

    <div
      v-if="showForm"
      class="rounded-lg border bg-card p-4 shadow-sm"
    >
      <h2 class="mb-3 text-lg font-medium">
        {{ editingId ? 'Edit entry' : 'New entry' }}
      </h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <label class="flex flex-col gap-1 text-sm sm:col-span-2">
          Category
          <select
            v-model.number="form.categoryId"
            class="h-9 rounded-md border border-input bg-background px-2 text-sm"
            required
          >
            <option v-for="cat in leafCategories" :key="cat.id" :value="cat.id">
              {{ cat.path }} — {{ cat.title }}
            </option>
          </select>
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Name
          <input v-model="form.name" required class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Owner
          <input v-model="form.ownerName" class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm sm:col-span-2">
          Description
          <textarea v-model="form.description" rows="2" class="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Website URL
          <input v-model="form.websiteUrl" class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Name URL
          <input v-model="form.nameUrl" class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Logo URL
          <input v-model="form.logoUrl" class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
        <label class="flex flex-col gap-1 text-sm">
          Owner URL
          <input v-model="form.ownerUrl" class="h-9 rounded-md border border-input bg-background px-3 text-sm" />
        </label>
      </div>
      <div class="mt-4 flex gap-2">
        <Button :disabled="saving" @click="onSave">{{ saving ? 'Saving…' : 'Save' }}</Button>
        <Button variant="outline" @click="showForm = false">Cancel</Button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg border">
      <table class="w-full min-w-[40rem] text-left text-sm">
        <thead class="border-b bg-muted/50">
          <tr>
            <th class="px-3 py-2 font-medium">Name</th>
            <th class="px-3 py-2 font-medium">Category</th>
            <th class="px-3 py-2 font-medium">Owner</th>
            <th class="px-3 py-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="entry in entries"
            :key="entry.id"
            class="border-b last:border-0 hover:bg-accent/40"
          >
            <td class="px-3 py-2 font-medium">{{ entry.name }}</td>
            <td class="px-3 py-2 text-muted-foreground">{{ entry.categoryPath }}</td>
            <td class="px-3 py-2 text-muted-foreground">{{ entry.ownerName || '—' }}</td>
            <td class="px-3 py-2">
              <div class="flex gap-2">
                <Button variant="outline" size="sm" @click="openEdit(entry)">Edit</Button>
                <Button variant="outline" size="sm" @click="onDelete(entry)">Delete</Button>
              </div>
            </td>
          </tr>
          <tr v-if="!loading && entries.length === 0">
            <td colspan="4" class="px-3 py-6 text-center text-muted-foreground">No entries.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
