<template>{{ error.statusCode }}</template>
<script setup>
const error = useError()
let url = useRequestURL()
const route = useRoute()
let domain = url.hostname
if (domain == "https://www.hyperos.fans") {
  url = 'https://hyperos.fans' + route.path
  await navigateTo(url, { external: true })
}
</script>
