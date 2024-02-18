<template>
  <title>{{ $t('devlist') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;padding-top:10px">
      <NuxtLink v-for="{ code, name } in data.mi" :to="('/' + locale + '/devices/' + code)" class="HyperBlue" style="margin-right: 5px;">
      <mdui-chip>{{ name[locale] }}({{ code }})</mdui-chip>
    </NuxtLink>
    </div>
  </mdui-card>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
</template>
<script setup>
const {locale} = useI18n();
const url = "https://data.hyperos.fans/devices.json"
const { data } = await useFetch(url)
</script>