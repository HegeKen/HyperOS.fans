<script setup>
const locale = useLocale()
const route = useRoute()
var lang = route.query.lang
if (lang == undefined || lang == "") {
  lang = locale
} else if (lang == locale) { }
else {
}
</script>
<template>
  <div v-if="lang == 'zh-CN'">
    <title>小米澎湃OS, Xiaomi HyperOS - 即将到来</title>
    <Nav>你好</Nav>
  </div>
  <div v-if="lang == 'en-US'">
    <title>Xiaomi HyperOS, It's about time</title>
    <Nav>Hello</Nav>
  </div>
  <div v-else>
    <title>language error</title>
    
  </div>
</template>
