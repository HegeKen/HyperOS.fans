<template>
  <title>{{ $t('devlist') }} - HyperOS.fans</title>
  <Nav>
  </Nav>
  <br>
  <div class="mdui-prose">
    <NuxtLink v-for="{ code, name } in data.mi" :to="('/' + lang + '/devices/' + code)" class="HyperBlue"><mdui-chip>{{ name[lang] }}</mdui-chip></NuxtLink>
  </div>
</template>
<script setup>
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices.json"
const { data } = await useFetch(url)
</script>