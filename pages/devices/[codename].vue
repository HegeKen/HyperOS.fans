<script setup>
const route = useRoute()
const url = "https://data.miuier.com/data/devices/"+route.params.codename+".json"
const { data } = await useFetch(url)
</script>

<template>
  Page visits: {{ data }}
</template>