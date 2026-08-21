<template>
  <Title>{{ $t('devtitle') }} - HyperOS.fans</Title>
  <v-app>
    <div id="top" tabindex="-1"></div>
    <Nav></Nav>
    <main id="main-content" tabindex="-1">
      <v-card v-for="(os, osIndex) in data['HyperOS']" :key="osIndex" elevation="2">
        <v-card-item style="padding:0px;">
          <v-container fluid>
            <a v-for="(dev, devIndex) in os['weeks']" :key="devIndex" :href="('/' + locale + '/dev/' + dev)" class="text-HyperBlue" style="margin-right: 5px;">
              <v-chip style="margin-top:5px;margin-right:5px;">{{ $t('num') }}{{ dev }}{{ $t('week') }}</v-chip>
            </a>
          </v-container>
        </v-card-item>
      </v-card>
    </main>
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
import { useTheme } from 'vuetify'
const { locale, locales } = useI18n()
const url = "https://data.hyperos.fans/dev.json"
const { data } = await useFetch(url)
const theme = useTheme();
function toggleTheme() {
  theme.change(theme.current.dark ? 'light' : 'dark')
}
</script>
