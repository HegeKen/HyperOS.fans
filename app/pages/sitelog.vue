<template>
  <Title>{{ $t('sitelog') }} - HyperOS.fans</Title>
  <v-app>
    <div id="top" tabindex="-1"></div>
    <Nav></Nav>
    <main id="main-content" tabindex="-1">
      <v-timeline align="start" size="large" side="end">
        <v-timeline-item v-for="(elog, i) in sitelog['logs']" :key="i" dot-color="#2655ff" fill-dot :icon="elog['icon']">
          <v-card elevation="2">
            <v-card-item>
              <v-card-title class="text-HyperBlue">
                {{ $t('sitev') }} {{ elog['siteVer'] }}
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <div><b>{{ $t('time') }}</b> {{ elog['date'] }}</div>
              <div><b>{{ $t('log') }}</b>
                <ol style="margin-left:20px;">
                  <li v-for="(log, logIndex) in elog['log']" :key="logIndex">{{ log[locale] }}</li>
                </ol>
              </div>
            </v-card-text>
          </v-card>
          <Space></Space>
        </v-timeline-item>
      </v-timeline>
    </main>
    <Space></Space>
    <Footer></Footer>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      drawer: null,
    }
  },
}
</script>
<script setup>
import { useTheme } from 'vuetify'
const { locale, locales } = useI18n()
const site = "https://data.hyperos.fans/sitelog.json"
const { data: sitelog } = await useFetch(site)
const theme = useTheme();
function toggleTheme() {
  theme.change(theme.current.dark ? 'light' : 'dark')
}
</script>
