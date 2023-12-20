import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'assets/hyper.css',
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    'nuxt-simple-sitemap',
    '@nuxtjs/i18n',
    '@nuxtjs/device',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
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
    strategy: 'prefix_and_default',
    defaultLocale: 'zh',
    vueI18n: './i18n.config.ts' // if you are using custom path, default 
  },
  vite: {
    /* options for vite */
    // ssr: true // enable unstable server-side rendering for development (false by default)
    // experimentWarning: false // hide experimental warning message (disabled by default for tests)
    vue: {
      template: {
        transformAssetUrls,
      }
    },
  },
  site: {
    url: 'https://www.hyperos.fans',
  }
})