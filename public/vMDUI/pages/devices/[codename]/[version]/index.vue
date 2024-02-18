<template>
  {{ route.params.codename }}
  {{ route.params.version }}
  {{ locale }}
  <!-- {{ data["branches"]["roms"][route.params.version] }} -->
  <Analystics></Analystics>
</template>
<script setup>
const route = useRoute()
const {locale} = useI18n();
const url = "https://data.hyperos.fans/devices/" + route.params.codename + ".json"
const { data } = await useFetch(url)

</script>