<template>
  <title>{{ $t('devtitle') }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <v-card v-for="os in data.HyperOS" elevation="2">
      <v-card-item style="padding:0px;">
        <v-container fluid>
          <NuxtLink v-for="dev in os.weeks" :to="('/' + locale + '/dev/' + dev)" class="text-HyperBlue" style="margin-right: 5px;">
            <v-chip style="margin-top:5px;margin-right:5px;">{{ $t('num') }}{{ dev }}{{ $t('week') }}</v-chip>
          </NuxtLink>
        </v-container>
      </v-card-item>
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
const url = "https://data.hyperos.fans/dev.json"
const { data } = await useFetch(url)
</script>
