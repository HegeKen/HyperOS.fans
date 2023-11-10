export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n'
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
  }
})