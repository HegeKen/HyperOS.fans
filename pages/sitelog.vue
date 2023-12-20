<template>
    <title>{{ $t('sitelog') }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <v-timeline align="start" size="large" side="end">
    <v-timeline-item v-for="(elog) in sitelog.logs" dot-color="#2655ff" fill-dot :icon='elog.icon' >
      <v-card elevation="2">
      <v-card-item>
        <v-card-title class="HyperBlue">
          {{ $t('sitev') }} {{ elog.siteVer }}
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <div><b>{{ $t('time') }}</b> {{ elog.date }}</div>
        <div><b>{{ $t('log') }}</b>
          <ol style="margin-left:20px;">
            <li v-for="(log) in elog['log']">{{ log[locale] }}</li>
          </ol>
        </div>
      </v-card-text>
    </v-card>
    <Space></Space>
    </v-timeline-item>
  </v-timeline>
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
const { locale, locales } = useI18n()
const site = "https://data.hyperos.fans/sitelog.json"
const { data: sitelog } = await useFetch(site)
</script>
