<script setup lang="ts">
import { computed, ref } from 'vue'
import CatalogTable, { type CatalogColumn } from '@/components/CatalogTable.vue'
import Button from '@/components/ui/button/Button.vue'
import type { CatalogSection } from '@/data/types'

const ALL_ID = '__all__'

const props = defineProps<{
  title: string
  description?: string
  columns: CatalogColumn[]
  sections: CatalogSection[]
  initialSortKey?: string
}>()

const activeSectionId = ref(ALL_ID)

const activeSection = computed(() =>
  props.sections.find((section) => section.id === activeSectionId.value) ?? null,
)

const displayedRows = computed(() => {
  if (activeSectionId.value === ALL_ID) {
    return props.sections.flatMap((section) => section.rows)
  }
  return activeSection.value?.rows ?? []
})

const activeDescription = computed(() => {
  if (activeSectionId.value === ALL_ID) return undefined
  return activeSection.value?.description
})
</script>

<template>
  <div class="flex flex-1 flex-col gap-6">
    <div class="flex flex-wrap gap-2" role="tablist" :aria-label="`${title} categories`">
      <Button
        :variant="activeSectionId === ALL_ID ? 'default' : 'outline'"
        size="sm"
        type="button"
        role="tab"
        :aria-selected="activeSectionId === ALL_ID"
        @click="activeSectionId = ALL_ID"
      >
        All
      </Button>
      <Button
        v-for="section in sections"
        :key="section.id"
        :variant="activeSectionId === section.id ? 'default' : 'outline'"
        size="sm"
        type="button"
        role="tab"
        :aria-selected="activeSectionId === section.id"
        @click="activeSectionId = section.id"
      >
        {{ section.title }}
      </Button>
    </div>

    <p v-if="activeDescription" class="text-sm text-muted-foreground">
      {{ activeDescription }}
    </p>

    <CatalogTable
      :title="title"
      :columns="columns"
      :rows="displayedRows"
      :initial-sort-key="initialSortKey"
      initial-sort-dir="asc"
      bare
    />
  </div>
</template>
