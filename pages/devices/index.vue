<script setup>
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices.json"
const { data } = await useFetch(url)
</script>

<template>
  <title v-if="lang == 'zh'">小米澎湃OS机型列表</title>
  <title v-if="lang == 'en'">Device list for Xiaomi HyperOS</title>
  <title v-else>小米澎湃OS机型列表</title>
  <Nav>
  </Nav>
  <br>
    <div class="mdui-prose">
      <NuxtLink v-for="{ code, name } in data.mi" :to="('/' + lang + '/devices/' + code)" class="HyperBlue"><mdui-chip>{{ name[lang] }}</mdui-chip></NuxtLink>
    </div>
</template>