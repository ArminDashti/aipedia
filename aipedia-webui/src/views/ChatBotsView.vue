<script setup lang="ts">
import CatalogTable from '@/components/CatalogTable.vue'
import { chatbots } from '@/data/chatbots'

const columns = [
  { key: 'owner', label: 'Owner', type: 'brand' as const },
  { key: 'chatbot', label: 'ChatBot', type: 'named-link' as const },
  { key: 'freePlan', label: 'Free plan', type: 'tick' as const },
  { key: 'paidPlan', label: 'Paid plan', type: 'tick' as const },
]
</script>

<template>
  <CatalogTable
    title="ChatBots"
    description="Major consumer chatbot products and their free or paid plans."
    :columns="columns"
    :rows="chatbots"
    initial-sort-key="owner"
    initial-sort-dir="asc"
  />
</template>
