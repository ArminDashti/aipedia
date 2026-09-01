# aipedia-webui

Vue 3 + Vite + Tailwind (shadcn-style) WebUI for AIPedia, with active SEO for search engines.

## Public site

- https://aipedia.xaigrok.ir/

SEO includes canonical URL, Open Graph, Twitter cards, `robots.txt`, `sitemap.xml`, JSON-LD `WebSite`, and per-route document titles.

Hosted on Irancell-T3 behind HAProxy.

## Run

```bash
cp .env.example .env
npm install
npm run dev
```

Dev server: `:5174`. Vite proxies `/api` and `/health` to `http://127.0.0.1:8091` when `VITE_API_BASE_URL` is empty.
