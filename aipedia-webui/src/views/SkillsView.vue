<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { skills } from '@/data/skills'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'Skill', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogTable
    title="Skills"
    description="Agent skills and instruction packs for coding agents."
    :columns="columns"
    :rows="skills"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
