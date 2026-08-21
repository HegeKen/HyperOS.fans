<template>
  <div v-if="$device.isDesktopOrTablet">
    <a class="skip-link" href="#main-content">{{ $t('skip_to_content') }}</a>
    <v-app-bar :elevation="2" rounded>
      <v-app-bar-title>
        <NuxtLink :to="localePath('/')" class="brand-link" :aria-label="'HyperOS.fans - ' + $t('home')">
          <b>Hyper<span class="text-HyperBlue">OS</span>.fans</b>
        </NuxtLink>
      </v-app-bar-title>
      <v-tabs v-model="tab" stacked class="text-HyperBlue NavLinks">
        <v-tab v-for="(item, i) in items" :key="i" :value="item" :to="'/' + locale + '/' + item['path']">
          <v-icon :icon="item['icon']" class="text-tab_text" aria-hidden="true"></v-icon>
          <span v-text="item[locale]" class="text-capitalize text-tab_text"></span>
        </v-tab>
        <v-tab v-for="l in availableLocales" :key="l['code']" :to="switchLocalePath(l['code'])" :aria-label="'HyperOS.fans - ' + $t('lang')">
          <v-icon icon="mdi-translate" class="text-tab_text" aria-hidden="true"></v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('lang') }}</span>
        </v-tab>
        <v-tab :to="'/' + locale + '/dev'">
          <v-icon icon="mdi-dev-to" class="text-tab_text" aria-hidden="true"></v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('dev') }}</span>
        </v-tab>
        <v-tab href="/search.html">
          <v-icon icon="mdi-magnify" class="text-tab_text" aria-hidden="true"></v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('search') }}</span>
        </v-tab>
        <v-tab href="#top">
          <v-icon icon="mdi-arrow-up" class="text-tab_text" aria-hidden="true"></v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('top') }}</span>
        </v-tab>
        <v-btn @click="toggleTheme" class="text-tab_text" variant="text">
          <v-icon icon="mdi-theme-light-dark" class="text-tab_text" aria-hidden="true"></v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('changetheme') }}</span>
        </v-btn>
      </v-tabs>
    </v-app-bar>
    <br /><br />
    <Space></Space>
    <Space></Space>
    <!-- PC Nav -->
  </div>
  <div v-else>
    <a class="skip-link" href="#main-content">{{ $t('skip_to_content') }}</a>
    <v-app-bar elevation="2" rounded>
      <v-btn icon="mdi-menu" :aria-label="$t('nav_menu')" :aria-expanded="drawer ? 'true' : 'false'" aria-controls="nav-drawer" @click.stop="drawer = !drawer"></v-btn>
      <v-app-bar-title>
        <NuxtLink :to="localePath('/')" class="brand-link" :aria-label="'HyperOS.fans - ' + $t('home')">
          <b>Hyper<span class="text-HyperBlue">OS</span>.fans</b>
        </NuxtLink>
      </v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" id="nav-drawer" :aria-label="$t('nav_menu')">
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="'/' + locale + '/' + item['path']" class="NavLinks text-capitalize text-tab_text">
          <template v-slot:prepend>
            <v-icon :icon="item['icon']" class="text-tab_text" aria-hidden="true"></v-icon>
          </template>
          <v-list-item-title v-text="item[locale]" class="text-tab_text"></v-list-item-title>
        </v-list-item>
        <v-list-item :to="'/' + locale + '/dev'" class="text-capitalize NavLinks">
          <template v-slot:prepend>
            <v-icon icon="mdi-dev-to" class="text-tab_text" aria-hidden="true"></v-icon>
          </template>
          <v-list-item-title class="text-tab_text">{{ $t('dev') }}</v-list-item-title>
        </v-list-item>
        <v-list-item href="/search.html" class="text-capitalize NavLinks">
          <template v-slot:prepend>
            <v-icon icon="mdi-magnify" class="text-tab_text" aria-hidden="true"></v-icon>
          </template>
          <v-list-item-title class="text-tab_text">{{ $t('search') }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-for="l in availableLocales" :key="l['code']" :to="switchLocalePath(l['code'])" class="text-capitalize NavLinks" :aria-label="'HyperOS.fans - ' + $t('lang')">
          <template v-slot:prepend>
            <v-icon icon="mdi-translate" class="text-tab_text" aria-hidden="true"></v-icon>
          </template>
          <v-list-item-title v-text="$t('lang')" class="text-tab_text"></v-list-item-title>
        </v-list-item>
        <v-list-item class="NavLinks text-capitalize text-tab_text" role="button" tabindex="0" @click="toggleTheme" @keydown.enter.prevent="toggleTheme" @keydown.space.prevent="toggleTheme">
          <template v-slot:prepend>
            <v-icon icon="mdi-theme-light-dark" class="text-tab_text" aria-hidden="true"></v-icon>
          </template>
          <v-list-item-title class="text-tab_text">{{ $t('changetheme') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <br /><br /><br />
    <!-- Mobile Nav -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { zh: '首页', en: 'Home', path: '', icon: 'mdi-home' },
        { zh: '机型列表', en: 'Devices', path: 'devices', icon: 'mdi-devices' },
        { zh: '源码', en: 'Source', path: 'source', icon: 'mdi-code-json' },
        { zh: '站点日志', en: 'Sitelog', path: 'sitelog', icon: 'mdi-update' },
      ],
      drawer: null,
      tab: null,
      rail: true
    }
  },
}
</script>
<script setup>
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
useHead({
  htmlAttrs: {
    lang: locale
  }
})
let url = useRequestURL()
const route = useRoute()
let domain = url.hostname
if (domain == "https://www.hyperos.fans") {
  url = 'https://hyperos.fans' + route.path
  await navigateTo(url, { external: true })
}

const theme = useTheme();

onMounted(() => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('hyperos-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    setTimeout(() => {
      if (savedTheme) {
        theme.change(savedTheme)
      } else if (prefersDark) {
        theme.change('dark')
      }
    }, 100)
  }
})

function toggleTheme() {
  // 使用 theme.global 来检查和切换主题
  const currentThemeName = theme.global.name.value || 'light'
  const newTheme = currentThemeName === 'dark' ? 'light' : 'dark'

  // 使用新的 API 切换主题
  theme.change(newTheme)

  // 保存到 localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('hyperos-theme', newTheme)
  }
}
</script>
