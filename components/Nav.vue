<template>
  <html :lang ="locale" ></html>
  <div v-if="$device.isDesktopOrTablet">
      <v-app-bar color="white" :elevation="2" rounded>
          <v-app-bar-title>
            <b>Hyper<span class="HyperBlue">OS</span>.fans</b>
            </v-app-bar-title>
        <v-tabs v-model="tab" stacked class="HyperBlue NavLinks">
          <NuxtLink v-for="(item, i) in items" :key="i" :value="item" :to="('/' + locale + '/' + item.path)">
            <v-tab>
              <v-icon :icon="item.icon"></v-icon>
              <span v-text="item[locale]" class="text-capitalize"></span>
            </v-tab></NuxtLink>
          <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)" color="#2655ff"><v-tab value="translate">
              <v-icon icon="mdi-translate"></v-icon>
              <span class="text-capitalize">{{ $t('lang') }}</span>
            </v-tab></NuxtLink>
          <a href="#top" color="#2655ff"><v-tab value="totop">
              <v-icon icon="mdi-arrow-up"></v-icon>
              <span class="text-capitalize">{{ $t('top') }}</span>
            </v-tab></a>
        </v-tabs>
      </v-app-bar>
      <br /><br />
    <Space></Space>
    <Space></Space>
    <!-- PC Nav -->
  </div>
  <div v-else>
    <v-app-bar elevation="2" rounded>
      <v-btn icon="mdi-menu" @click.stop="drawer = !drawer"></v-btn>
      <v-app-bar-title><b>Hyper<span class="HyperBlue">OS</span>.fans</b></v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <NuxtLink v-for="(item, i) in items" :key="i" :value="item" :to="('/' + locale + '/' + item.path)">
          <v-list-item class="NavLinks text-capitalize" style="color:black">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item[locale]"></v-list-item-title>
          </v-list-item>
        </NuxtLink>

        <NuxtLink class="text-capitalize NavLinks" v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)"><v-list-item value="translate">
            <template v-slot:prepend>
              <v-icon icon="mdi-translate"></v-icon>
            </template>
            <v-list-item-title>{{ $t('lang') }}</v-list-item-title>
          </v-list-item></NuxtLink>
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
        { zh: '开发版', en: 'DEV', path: 'dev', icon: 'mdi-dev-to' },
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
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const availableLocales = computed(() => {
  return (locales.value).filter(i => i.code !== locale.value)
})

</script>
