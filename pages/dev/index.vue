<template>
    <title>{{ $t('devtitle') }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <space></space>
    <v-card v-for="os in data.HyperOS" elevation="2">
      <v-card-title>{{ os.bigVer }}</v-card-title>
      <v-card-item style="padding:0px;">
        <v-container fluid>
						<!-- <nuxt-link v-for="dev in os.weeks" :to="('/'+locale+'/dev/'+dev)">
							<v-chip style="margin-top:5px;margin-right:5px;">
								<span class="HyperBlue">{{dev}}</span>
							</v-chip>
						</nuxt-link> -->

            <NuxtLink v-for="dev in os.weeks" :to="('/' + locale + '/dev/' + dev)" class="HyperBlue" style="margin-right: 5px;">
      <v-chip v-if="dev == os.latest"><v-icon icon='mdi-new-box'></v-icon> &nbsp {{ $t('num') }}{{ dev }}{{ $t('week') }}</v-chip>
      <v-chip v-else>{{ $t('num') }}{{ dev }}{{ $t('week') }}</v-chip>
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
