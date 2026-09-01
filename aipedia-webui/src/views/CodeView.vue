<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { code } from '@/data/code'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'code', label: 'Code', type: 'named-link' as const },
  { key: 'byok', label: 'BYOK', type: 'tick' as const },
  { key: 'freePlan', label: 'Free plan', type: 'tick' as const },
  { key: 'paidPlan', label: 'Paid plan', type: 'tick' as const },
  { key: 'cli', label: 'CLI', type: 'tick' as const },
  { key: 'editor', label: 'Editor', type: 'tick' as const },
]
</script>

<template>
  <CatalogTable
    title="Code"
    description="Code editors and CLI coding agents. Green ✓ / red ✗ for plan and surface support."
    :columns="columns"
    :rows="code"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
