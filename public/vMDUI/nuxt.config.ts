export default defineNuxtConfig({
  modules: [
    'nuxt-simple-sitemap',
    '@nuxtjs/i18n',
    '@nuxtjs/device'
    
  ],
  i18n: {
    locales: [
      {
        code: 'zh',
        name: '中文'
      },
      {
        code: 'en',
        name: 'English'
      }
    ],
    strategy: 'prefix',
    defaultLocale: 'zh',
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },
  vite: {
    /* options for vite */
    // ssr: true // enable unstable server-side rendering for development (false by default)
    // experimentWarning: false // hide experimental warning message (disabled by default for tests)
    vue: {
      template: {
        compilerOptions: {
          // 所有以 mdui- 开头的标签名都是 mdui 组件
          isCustomElement: (tag) => tag.startsWith('mdui-')
        }
      }
    },
  },
  site: {
    url: 'https://www.hyperos.fans',
  }
})