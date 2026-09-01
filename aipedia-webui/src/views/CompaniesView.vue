<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { companies } from '@/data/companies'

const columns = [
  { key: 'company', label: 'Company', type: 'brand' as const },
  { key: 'country', label: 'Country', type: 'flag-country' as const },
  { key: 'foundYear', label: 'Found (Year)' },
]
</script>

<template>
  <CatalogTable
    title="Companies"
    description="AI companies and labs."
    :columns="columns"
    :rows="companies"
    initial-sort-key="company"
    initial-sort-dir="asc"
  />
</template>
