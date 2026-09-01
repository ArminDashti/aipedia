<script setup lang="ts">
import CatalogSections from '@/components/CatalogSections.vue'
import { mcpSections } from '@/data/mcp'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'MCP', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogSections
    title="MCP"
    description="Model Context Protocol servers and registries, grouped by purpose."
    :columns="columns"
    :sections="mcpSections"
    initial-sort-key="owner"
  />
</template>
