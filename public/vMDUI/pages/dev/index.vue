<template>
  <title>{{ $t('devtitle') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <h3 style="padding-left:10px;">
      <span v-for="{ bigVer, latest, weeks } in data.HyperOS" style="padding-left:10px">{{ bigVer }}
        <div style="padding:10px"></div>
        <NuxtLink v-for="(week) in weeks" :to="('/' + locale + '/dev/' + week)" class="HyperBlue" style="margin-right: 5px;">
      <mdui-chip v-if="week == latest"><mdui-icon name='fiber_new'></mdui-icon> &nbsp {{ $t('num') }}{{ week }}{{ $t('week') }}</mdui-chip>
      <mdui-chip v-else>{{ $t('num') }}{{ week }}{{ $t('week') }}</mdui-chip>
    </NuxtLink>
      </span>

    </h3>
  </mdui-card>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
</template>
<script setup>
const {locale} = useI18n();
const url = "https://data.hyperos.fans/dev.json"
const { data } = await useFetch(url)
</script>