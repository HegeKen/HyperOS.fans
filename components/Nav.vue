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
    <mdui-navigation-rail alignment="center">
      <NuxtLink :to="('/'+locale)"><mdui-navigation-rail-item icon="home">{{ $t('home') }}</mdui-navigation-rail-item></NuxtLink>
      <NuxtLink :to="('/'+locale+'/devices')"><mdui-navigation-rail-item icon="devices">{{ $t('devices') }}</mdui-navigation-rail-item></NuxtLink>
      <NuxtLink :to="('/'+locale)+'/source'"><mdui-navigation-rail-item icon="code">{{ $t('code') }}</mdui-navigation-rail-item></NuxtLink>
      <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"><mdui-navigation-rail-item icon="translate">{{ locale.name }}</mdui-navigation-rail-item></NuxtLink>
    </mdui-navigation-rail>
  </div></template>