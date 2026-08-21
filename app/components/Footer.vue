<template>
  <Disclaimer></Disclaimer>
  <div v-if="$device.isDesktopOrTablet">
    <!-- PC Disclaimer -->
  </div>
  <div v-else class="NavLinks">
    <br /><br /><br />
    <v-bottom-navigation horizontal style="padding-bottom: 80px;" :aria-label="$t('footer_nav')">
      <v-btn v-for="(item) in items" :key="item.path" :href="'/' + locale + '/' + item['path']">
        <v-icon class="text-tab_text" aria-hidden="true">{{ item['icon'] }}</v-icon>
        <span class="text-capitalize text-tab_text">{{ item[locale] }}</span>
      </v-btn>
      <v-btn href="/search.html">
        <v-icon class="text-tab_text" aria-hidden="true">mdi-magnify</v-icon>
        <span class="text-capitalize text-tab_text">{{ $t('search') }}</span>
      </v-btn>
      <v-btn href="#top">
        <v-icon class="text-tab_text" aria-hidden="true">mdi-arrow-up</v-icon>
        <span class="text-capitalize text-tab_text">{{ $t('top') }}</span>
      </v-btn>
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
const theme = useTheme();
function toggleTheme() {
  theme.change(theme.current.dark ? 'light' : 'dark')
}
const { locale, locales } = useI18n()
</script>
