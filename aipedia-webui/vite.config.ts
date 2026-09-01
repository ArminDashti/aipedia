import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { seoPrerenderPlugin } from './vite-plugins/seo-prerender'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://aipedia.xaigrok.ir').replace(/\/$/, '')

  return {
    base: '/',
    plugins: [vue(), seoPrerenderPlugin(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 5174,
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY || 'http://127.0.0.1:8091',
          changeOrigin: true,
        },
        '/health': {
          target: env.VITE_API_PROXY || 'http://127.0.0.1:8091',
          changeOrigin: true,
        },
      },
    },
  }
})
