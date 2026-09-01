<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { models } from '@/data/models'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'model', label: 'Model', type: 'named-link' as const },
  { key: 'openSource', label: 'OpenSource', type: 'tick' as const },
  { key: 'openWeight', label: 'OpenWeight', type: 'tick' as const },
  { key: 'introducedAt', label: 'Introduced' },
  { key: 'inputPrice', label: 'Input (~/M)' },
  { key: 'outputPrice', label: 'Output (~/M)' },
  { key: 'context', label: 'Context' },
  { key: 'parameters', label: 'Parameters', type: 'multiline' as const },
]
</script>

<template>
  <CatalogTable
    title="Models"
    description="Each model version is listed separately. Parameters show size variants on separate lines."
    :columns="columns"
    :rows="models"
    initial-sort-key="introducedAt"
    initial-sort-dir="desc"
  />
</template>
