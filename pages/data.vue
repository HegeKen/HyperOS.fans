<script setup lang="ts">
const route = useRoute()
</script>
<template>
  Page visits: {{ route.path }}
</template>