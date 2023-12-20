<template>
  <title>{{ $t('source') }} - HyperOS.fans</title>
<v-app>
  <Nav></Nav>
  <Space></Space>
  <v-card elevation="2">
    <v-card-title>{{ $t('source') }}</v-card-title>
    <v-card-text>
      <h3>1. {{ $t('sources') }}</h3>
      <Space></Space>
      <ul style="margin-left:20px;">  
        <li><a href="https://xiaomifirmwareupdater.com/">XiaomiFirmwareUpdater.com</a></li>
        <li><a href="https://mifirmware.com/">MiFirmware.com</a></li>
        <li><a href="new.c.mi.com">{{ $t('gcom') }}</a></li>
        <li><a href="https://coolapk.com">{{ $t('coolapk') }}</a></li>
      </ul>
    </v-card-text>
  </v-card>
  <Space></Space>
  <v-card elevation="2">
    <v-card-text>
      <h3>2. {{ $t('source-code') }}</h3>
      <ul style="margin-left:20px;">  
        <li>Web : <a href="https://github.com/HegeKen/HyperOS.fans">HyperOS.fans</a></li>
        <li> {{ $t('data') }} <a href="https://github.com/HegeKen/HyperData">HyperData</a></li>
      </ul>
    </v-card-text>
  </v-card>
  <Space></Space>
  <Footer></Footer>
</v-app>
</template>


<script>
export default {
data() {
  return {
    drawer: null,
  }
},
}
</script>
<script setup>
const { locale, locales } = useI18n()
</script>
