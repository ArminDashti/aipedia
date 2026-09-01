<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { mcp } from '@/data/mcp'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'MCP', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogTable
    title="MCP"
    description="Model Context Protocol servers and registries."
    :columns="columns"
    :rows="mcp"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
