<script setup lang="ts">
import CatalogSections from '@/components/CatalogSections.vue'
import { toolSections } from '@/data/tools'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'Tool', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogSections
    title="Tools"
    description="Agents, memory, RAG, compression, and vector databases — grouped by purpose."
    :columns="columns"
    :sections="toolSections"
    initial-sort-key="owner"
  />
</template>
