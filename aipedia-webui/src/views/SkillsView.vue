<script setup lang="ts">
import CatalogSections from '@/components/CatalogSections.vue'
import { skillSections } from '@/data/skills'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'name', label: 'Skill', type: 'named-link' as const },
  { key: 'description', label: 'Description' },
]
</script>

<template>
  <CatalogSections
    title="Skills"
    description="Agent skills and instruction packs for coding agents, grouped by topic."
    :columns="columns"
    :sections="skillSections"
    initial-sort-key="owner"
  />
</template>
