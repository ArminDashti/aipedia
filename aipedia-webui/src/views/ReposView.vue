<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { repos } from '@/data/repos'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'repo', label: 'Repo', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogTable
    title="Repos"
    description="Unique GitHub repositories referenced across the AIPedia bookmarks catalog."
    :columns="columns"
    :rows="repos"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
