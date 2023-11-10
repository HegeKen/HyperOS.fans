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
    <Styles></Styles>
    <div>
      <div class="Center" style="font-size: 40px;">小米澎湃<span class="HyperBlue">OS</span></div>
      <div class="Center" style="font-size: 30px;font-weight: lighter;">即将到来.....</div>
      <div class="Center" style="font-weight: lighter;">...非官方网站...</div>
    </div>
  </div>
  <div v-if="lang == 'en-US'">
    <title>Xiaomi HyperOS, It's about time</title>
    <Styles></Styles>
    <div>
      <div class="Center" style="font-size: 50px;">Xiaomi Hyper<span class="HyperBlue">OS</span></div>
      <div class="Center" style="font-size: 30px;font-weight: lighter;">Coming soon.....</div>
      <div class="Center" style="font-weight: lighter;">...Not a official site...</div>
    </div>
  </div>
  <div v-else>
    <title>language error</title>
    
  </div>
</template>
