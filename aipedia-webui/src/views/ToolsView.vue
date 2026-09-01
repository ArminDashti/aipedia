<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { tools } from '@/data/tools'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'Tool', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogTable
    title="Tools"
    description="Agents, memory, RAG, compression, and vector databases."
    :columns="columns"
    :rows="tools"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
