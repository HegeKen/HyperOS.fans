import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          dark: false,
          colors: {
            tab: '#ffffff',
            HyperBlue: '#2655ff',
            tab_text: '#000000',
          }
        },
        dark: {
          dark: true,
          colors: {
            tab: '#000000',
            HyperBlue: '#2655ff',
            tab_text: '#ffffff',
          }
        }
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
