<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { Button } from '@/components/ui/button'
import GlobalSearch from '@/components/GlobalSearch.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()
const route = useRoute()

const isAdminHost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'admin-aipedia.xaigrok.ir' ||
    window.location.hostname.startsWith('admin-aipedia.'))

const isAdminSection = computed(
  () => isAdminHost || route.path.startsWith('/admin'),
)

const navItems = [
  { to: '/chatbots', label: 'ChatBots' },
  { to: '/code', label: 'Code' },
  { to: '/companies', label: 'Companies' },
  { to: '/mcp', label: 'MCP' },
  { to: '/models', label: 'Models' },
  { to: '/skills', label: 'Skills' },
  { to: '/tools', label: 'Tools' },
] as const
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <header class="sticky top-0 z-20 border-b bg-card/90 backdrop-blur">
      <div class="mx-auto flex w-full flex-wrap items-center gap-3 px-4 py-3">
        <RouterLink
          :to="isAdminSection ? '/admin' : '/skills'"
          class="shrink-0 text-lg font-semibold text-primary"
          :aria-label="isAdminSection ? 'AIPedia admin home' : 'AIPedia home'"
        >
          {{ isAdminSection ? 'AIPedia Admin' : 'AIPedia' }}
        </RouterLink>

        <template v-if="!isAdminSection">
          <nav
            class="flex min-w-0 flex-1 flex-wrap items-center gap-1 sm:gap-2"
            aria-label="Primary"
          >
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="rounded-md px-2 py-1 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              active-class="!text-foreground bg-accent font-medium"
            >
              {{ item.label }}
            </RouterLink>
          </nav>

          <GlobalSearch />
        </template>
        <div v-else class="min-w-0 flex-1" />

        <Button
          variant="outline"
          size="sm"
          class="shrink-0"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          {{ theme === 'dark' ? 'Light' : 'Dark' }}
        </Button>
      </div>
    </header>

    <main class="mx-auto flex w-full flex-1 flex-col px-4 py-6">
      <RouterView />
    </main>

    <SiteFooter v-if="!isAdminSection" />
  </div>
</template>
