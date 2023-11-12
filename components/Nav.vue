<script setup>
import '~/assets/hyper.css'
import 'mdui/mdui.css';
import 'mdui';
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})
</script>
<template>
  <div>
    <mdui-bottom-app-bar>
      <NuxtLink :to="('/' + locale)">
        <div class="buttom-nav-item">
          <div class="buttom-nav-icom"><mdui-button-icon icon="home"></mdui-button-icon></div>
          {{ $t('home') }}
        </div>
      </NuxtLink>
      <NuxtLink :to="('/' + locale + '/devices')">
        <div class="buttom-nav-item">
          <div class="buttom-nav-icom"><mdui-button-icon icon="devices"></mdui-button-icon></div>
          {{ $t('devices') }}
        </div>
      </NuxtLink>
      <a href="https://github.com/HegeKen/">
        <div class="buttom-nav-item">
          <div class="buttom-nav-icom"><mdui-button-icon icon="code"></mdui-button-icon></div>
          {{ $t('code') }}
        </div>
      </a>
      <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">
        <div class="buttom-nav-item">
          <div class="buttom-nav-icom"><mdui-button-icon icon="translate"></mdui-button-icon></div>
          {{ locale.name }}
        </div>
      </NuxtLink>
      <div style="flex-grow: 1"></div>
      <mdui-fab icon="arrow_upward" href="#top"></mdui-fab>
    </mdui-bottom-app-bar>
  </div>
</template>