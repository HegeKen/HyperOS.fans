<template>
  <Nav></Nav>
  <title>{{ $t('hometitle') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;height: 78vh;align-items: center;margin-top:1vw;margin-right:1vw">
    <h3 style="padding-left:20px;">{{ $t('sitev') }}<span class="HyperBlue">V0.0.1</span></h3>
    <h3 style="padding-left:20px;">{{ $t('supported') }}</h3><span v-for="({ code, name },index) in data.mi" style="padding-left:20px;">
      <span v-if="index<data.mi.length-1"><NuxtLink :to="('/' + locale.locale.value + '/devices/' + code)" class="HyperBlue">{{ name[lang] }}</NuxtLink>;</span>
      <span v-else><NuxtLink :to="('/' + locale.locale.value + '/devices/' + code)" class="HyperBlue">{{ name[lang] }}</NuxtLink></span>
    </span>
  </mdui-card>
  <Disclamier></Disclamier>
  <Analystics></Analystics>
</template>

<script setup>
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices.json"
const { data } = await useFetch(url)
</script>