<template>{{ error.statusCode }}</template>
<script setup>
import { useTheme } from 'vuetify'
const error = useError()
let url = useRequestURL()
const route = useRoute()
let domain = url.hostname
if (domain == "https://www.hyperos.fans") {
  url = 'https://hyperos.fans' + route.path
  await navigateTo(url, { external: true })
}
const theme = useTheme();
function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>
