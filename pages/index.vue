<template>
  <title>{{ $t('hometitle') }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <v-card elevation="2">
      <v-card-item>
        <v-card-title class="HyperBlue">
          {{ $t('sitev') }} {{ sitelog.logs[0].siteVer }}
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <div><b>{{ $t('time') }}</b> {{ sitelog.logs[0].date }}</div>
        <div><b>{{ $t('log') }}</b>
          <ol style="margin-left:20px;">
            <li v-for="(log) in sitelog.logs[0]['log']">{{ log[locale] }}</li>
          </ol>
        </div>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2">
      <v-card-title class="HyperBlue">
        {{ $t('dev') }}
      </v-card-title>
      <v-card-text>
        <div><b>{{ $t('latedev') }}</b>
          <NuxtLink :to="('/'+locale + '/dev/' + latest.week)" class="HyperBlue">{{ latest.title[locale] }}</NuxtLink>
        </div>
        <div>
          <b v-show="latest.show == 'yes'">{{ $t('supported') }}</b>
          <span v-for="({ device, name, rom }, index) in latest.roms" style="padding-left:10px;" v-show="latest.show == 'yes'">
            <span v-if="index < latest.roms.length - 1" v-show="rom.recovery != ''">
              <NuxtLink :to="('/' + locale + '/devices/' + device)" class="HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink>&nbsp;;
            </span>
            <span v-else v-show="rom.recovery != ''">
              <NuxtLink :to="('/' + locale + '/devices/' + device)" class="HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink>
            </span>
          </span>
        </div>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2" v-show="home.recent.roms.length > 0">
      <v-card-title class="HyperBlue">
        {{ $t('update') }}
      </v-card-title>
      <v-card-text>
        <div><b>{{ $t('uptime') }} </b> <span>{{ home.recent.time }}</span>
        </div>
        <div>
          <ol style="margin-left:20px;">
            <li v-for="({ code, name, rom }, index) in home.recent.roms">
              <span v-if="index < home.recent.roms.length - 1"><NuxtLink :to="('/' + locale + '/devices/' + code)" class="HyperBlue" style="text-indent: 20px;">{{ name[locale] }}({{ code }})</NuxtLink> : {{ rom }};</span>
              <span v-else><NuxtLink :to="('/' + locale + '/devices/' + code)" class="HyperBlue" style="text-indent: 20px;">{{ name[locale] }}({{ code }})</NuxtLink> : {{ rom }}</span>
            </li>
          </ol>
        </div>
      </v-card-text>
    </v-card>
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
const { locale, locales } = useI18n()
const devs = "https://data.hyperos.fans/dev.json"
const index = "https://data.hyperos.fans/index.json"
const site = "https://data.hyperos.fans/sitelog.json"
const { data: dev } = await useFetch(devs)
const { data: home } = await useFetch(index)
const { data: sitelog } = await useFetch(site)
const { data: latest } = await useFetch('https://data.hyperos.fans/dev/' + dev.value.HyperOS[0]['latest'] + '.json')
</script>
