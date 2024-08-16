<template>
  <title>{{ $t('hometitle') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <h3 style="padding-left:10px;">{{ $t('sitev') }}<span class="text-HyperBlue">{{ home.siteVer }}</span></h3>
    <h3 style="padding-left:10px;">{{ $t('supported') }}</h3><span v-for="({ code, name },index) in device.mi" style="padding-left:10px;text-indent: 20px;">
      <span v-if="index<device.mi.length-1"><NuxtLink :to="('/' + locale + '/devices/' + code)" style="text-indent: 20px;" class="text-HyperBlue">{{ name[locale] }}</NuxtLink>;</span>
      <span v-else><NuxtLink :to="('/' + locale + '/devices/' + code)" class="text-HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink></span>
    </span>
  </mdui-card>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <h3 style="padding-left:10px;">{{ $t('dev') }}</h3>
    <h3 style="padding-left:10px;">{{ $t('latedev') }}<NuxtLink :to="('/dev/'+latest.week)" style="font-size: 16px;font-weight: lighter;">{{ latest.title[locale]}}</NuxtLink></h3>
    <h3 style="padding-left:10px;" v-show="latest.show == 'yes'">{{ $t('supported') }}</h3>
    <span v-for="({ device, name },index) in latest.roms" style="padding-left:10px;" v-show="latest.show == 'yes'">
      <span v-if="index<latest.roms.length-1"><NuxtLink :to="('/' + locale + '/devices/' + device)" class="text-HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink>;</span>
      <span v-else><NuxtLink :to="('/' + locale + '/devices/' + device)" class="text-HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink></span>
    </span>
  </mdui-card>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <h3 style="padding-left:10px;">{{ $t('update') }}</h3>
    <h3 style="padding-left:10px;">{{ $t('uptime') }} {{ home.recent.time }}</h3>
    <ol v-for="({ code, name, rom },index) in home.recent.roms" style="padding-left:10px;list-style-type:none;">
      <li v-if="index<home.recent.roms.length-1"><NuxtLink :to="('/' + locale + '/devices/' + code)" class="text-HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink> : {{ rom }};</li>
      <li v-else><NuxtLink :to="('/' + locale + '/devices/' + code)" class="text-HyperBlue" style="text-indent: 20px;">{{ name[locale] }}</NuxtLink> : {{ rom }}</li>
    </ol>
  </mdui-card>
  
  <Disclamier></Disclamier>
  <Analystics></Analystics>
  <Nav></Nav>
  <br /><br /><br />
</template>

<script setup>
const {locale} = useI18n();
const devices = "https://data.hyperos.fans/devices.json"
const index = "https://data.hyperos.fans/index.json"
const { data:device } = await useFetch(devices)
const { data:home } = await useFetch(index)
const { data:latest } = await useFetch('https://data.hyperos.fans/dev/'+home.value.latest+'.json')
</script>