<template>
  <Nav></Nav>
  <title>{{ $t('hometitle') }} - HyperOS.fans</title>
  <br>
  <div class="mdui-prose">
    <h3>{{ $t('sitev') }}<span class="HyperBlue">V0.0.1</span></h3>
    <h3>{{ $t('supported') }}</h3><span v-for="{ code, name } in data.mi">
      <NuxtLink :to="('/' + locale.locale.value + '/devices/' + code)" class="HyperBlue">{{ name[lang] }}</NuxtLink>;
    </span>
  </div>
</template>

<script setup>
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices.json"
const { data } = await useFetch(url)
</script>