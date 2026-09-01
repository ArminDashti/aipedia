import { createRouter, createWebHistory } from 'vue-router'
import { applyRouteSeo } from '@/lib/seo'
import { seoRoutes, DEFAULT_SEO_DESCRIPTION } from '@/data/seo-routes'
import { getAdminToken } from '@/lib/api'
import SkillsView from '@/views/SkillsView.vue'
import McpView from '@/views/McpView.vue'
import ToolsView from '@/views/ToolsView.vue'
import ReposView from '@/views/ReposView.vue'
import CompaniesView from '@/views/CompaniesView.vue'
import ModelsView from '@/views/ModelsView.vue'
import CodeView from '@/views/CodeView.vue'
import ChatBotsView from '@/views/ChatBotsView.vue'
import AdminLoginView from '@/views/admin/AdminLoginView.vue'
import AdminEntriesView from '@/views/admin/AdminEntriesView.vue'

const viewByName = {
  skills: SkillsView,
  mcp: McpView,
  tools: ToolsView,
  repos: ReposView,
  companies: CompaniesView,
  models: ModelsView,
  code: CodeView,
  chatbots: ChatBotsView,
} as const

function isAdminHost(): boolean {
  if (typeof window === 'undefined') return false
  const host = window.location.hostname
  return host === 'admin-aipedia.xaigrok.ir' || host.startsWith('admin-aipedia.')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => (isAdminHost() ? '/admin' : '/skills'),
    },
    ...seoRoutes.map((route) => ({
      path: route.path,
      name: route.name,
      component: viewByName[route.name as keyof typeof viewByName],
      meta: {
        title: route.title,
        description: route.description,
      },
    })),
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLoginView,
      meta: {
        title: 'AIPedia Admin Login',
        description: 'Sign in to manage AIPedia catalog entries.',
        admin: true,
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminEntriesView,
      meta: {
        title: 'AIPedia Admin',
        description: 'Manage AIPedia catalog entries.',
        admin: true,
        requiresAuth: true,
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (isAdminHost() && !to.path.startsWith('/admin')) {
    return { path: '/admin' }
  }
  if (to.meta.requiresAuth && !getAdminToken()) {
    return { path: '/admin/login', query: { redirect: to.fullPath } }
  }
  return true
})

router.afterEach((to) => {
  const title =
    typeof to.meta.title === 'string' ? to.meta.title : 'AIPedia — AI Knowledge Encyclopedia'
  const description =
    typeof to.meta.description === 'string' ? to.meta.description : DEFAULT_SEO_DESCRIPTION

  applyRouteSeo({
    title,
    description,
    path: to.path,
  })
})

export default router
