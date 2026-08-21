<template>
  <v-app>
    <v-main>
      <main id="main-content" class="d-flex align-center justify-center" style="min-height: 100vh;">
        <v-container class="text-center">
          <h1 class="text-h3 font-weight-bold">{{ error.statusCode }}</h1>
          <p class="text-h6 mt-2">{{ error.message || $t('error_unknown') }}</p>
          <v-btn color="primary" class="mt-4" :to="localePath('/')" @click="handleError">
            <v-icon icon="mdi-home" class="mr-2" aria-hidden="true"></v-icon>
            {{ $t('back_home') }}
          </v-btn>
        </v-container>
      </main>
    </v-main>
  </v-app>
</template>

<script setup>
import { useTheme } from 'vuetify'
const error = useError()
const { locale, t } = useI18n()
const localePath = useLocalePath()
let url = useRequestURL()
const route = useRoute()
let domain = url.hostname
if (domain == "https://www.hyperos.fans") {
  url = 'https://hyperos.fans' + route.path
  await navigateTo(url, { external: true })
}
useHead({
  title: () => `${error.value?.statusCode || ''} ${t('error_title')} - HyperOS.fans`
})
const theme = useTheme();
function toggleTheme() {
  theme.change(theme.current.dark ? 'light' : 'dark')
}
function handleError() {
  clearError({ redirect: '/' })
}
</script>
