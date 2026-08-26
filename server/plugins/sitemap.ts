import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineNitroPlugin } from 'nitropack/runtime'

// sitemap 支持的语言（multi-sitemap 下每个 locale 独立一个 sitemap，i18n 策略为 prefix_and_default）
const SITEMAP_LOCALES = ['zh', 'en']

// 数据源：优先读本地 public/data（随仓库部署的 HyperData 子模块），缺失时回退到线上 API，
// 保证 sitemap 与页面 useFetch 的数据一致。
const REMOTE_DATA_BASE = 'https://data.hyperos.fans'

// 运行时按 locale 注入开发版周次页 / 机型详情页的真实 URL，使 sitemap 收录动态详情页。
// 注意：`sitemap:sources` 是 Nitro 运行时钩子，必须通过 defineNitroPlugin 注册，
// 不能写在 nuxt.config.ts 的 nitro.hooks（构建时 NestedHooks<NitroHooks>）中。
function resolveDataRoot(): string {
  const candidates = [
    resolve(process.cwd(), 'public/data'),
    resolve(process.cwd(), '.output/public/data'),
    resolve(process.cwd(), '../public/data'),
  ]
  return candidates.find((c) => existsSync(c)) || candidates[0]!
}

async function loadJson(dataRoot: string, file: string): Promise<any> {
  const local = resolve(dataRoot, file)
  if (existsSync(local)) {
    try {
      return JSON.parse(readFileSync(local, 'utf-8'))
    } catch (e) {
      console.warn(`[sitemap] 读取本地 ${file} 失败，回退远程：`, (e as Error).message)
    }
  }
  const res = await $fetch(`${REMOTE_DATA_BASE}/${file}`)
  return res
}

export default defineNitroPlugin((nitroApp) => {
  const DATA_ROOT = resolveDataRoot()

  nitroApp.hooks.hook('sitemap:sources', async ({ sitemapName, sources }) => {
    if (!SITEMAP_LOCALES.includes(sitemapName)) return
    console.log('[sitemap:sources] fired for', sitemapName, 'DATA_ROOT=', DATA_ROOT)
    try {
      // prefix_and_default：zh 同时有无前缀与 /zh 前缀两种 URL，en 为 /en 前缀。
      // 三个 locale 变体都推入每个 sitemap 的 sources，由模块按 _sitemap 过滤，
      // 并据此为每个详情页生成 x-default/zh/en 三种 hreflang 互链。
      const urls: { loc: string }[] = []

      const dev = await loadJson(DATA_ROOT, 'dev.json')
      const weeks = new Set<string>()
      for (const os of dev.HyperOS || []) {
        for (const week of os.weeks || []) weeks.add(String(week))
      }
      for (const week of weeks) {
        urls.push({ loc: `/zh/dev/${week}` })
        urls.push({ loc: `/dev/${week}` })
        urls.push({ loc: `/en/dev/${week}` })
      }

      const devices = await loadJson(DATA_ROOT, 'devices.json')
      const codes = new Set<string>()
      for (const group of Object.values(devices)) {
        for (const d of (group as any).devices || []) codes.add(d.code)
      }
      for (const code of codes) {
        urls.push({ loc: `/zh/devices/${code}` })
        urls.push({ loc: `/devices/${code}` })
        urls.push({ loc: `/en/devices/${code}` })
      }

      if (urls.length) {
        sources.push({ context: { name: 'data' }, urls })
        console.log('[sitemap:sources] injected', urls.length, 'urls for', sitemapName)
      }
    } catch (e) {
      console.warn('[sitemap] 加载 data 来源失败：', (e as Error).message)
    }
  })
})
