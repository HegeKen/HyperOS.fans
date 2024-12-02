<template>
  <Disclaimer></Disclaimer>
  <div v-if="$device.isDesktopOrTablet">
    <!-- PC Disclaimer -->
  </div>
  <div v-else class="NavLinks">
    <br /><br /><br />
    <v-bottom-navigation horizontal style="padding-bottom: 80px;">
      <NuxtLink v-for="(item) in items" :to="('/' + locale + '/' + item['path'])">
        <v-btn>
          <v-icon class="text-tab_text">{{ item['icon'] }}</v-icon>
          <span class="text-capitalize text-tab_text">{{ item[locale] }}</span>
        </v-btn>
      </NuxtLink>
      <a href="#top">
        <v-btn>
          <v-icon class="text-tab_text">mdi-arrow-up</v-icon>
          <span class="text-capitalize text-tab_text">{{ $t('top') }}</span>
        </v-btn>
      </a>
    </v-bottom-navigation>
    <Space></Space>
    <Space></Space>
    <!-- Mobile Disclaimer -->
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
        { zh: '站点日志', en: 'Sitelog', path: 'sitelog', icon: 'mdi-update' },
      ],
      drawer: null,
    }
  },
}
</script>
<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
const { locale, locales } = useI18n()
</script>
