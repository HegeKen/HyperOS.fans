<template>
  <Title v-if="locale == 'en'">HyperOS {{ data['title'][locale] }} - HyperOS.fans</Title>
  <Title v-else>HyperOS {{ data['title'][locale] }} - HyperOS.fans</Title>
  <v-app>
    <div id="top" tabindex="-1"></div>
    <Nav></Nav>
    <main id="main-content" tabindex="-1">
      <Space></Space>
      <v-card :title="data['title'][locale]" elevation="2">
        <v-card-text>
          <p><b>{{ $t('uptime') }}</b>{{ data['update'] }}</p>
          <p><b>{{ $t('versions') }}</b>{{ data['versions'] }}</p>
          <p><b>{{ $t('comlink') }}</b><a :href="('https://www.xiaomi.cn/post/') + data['postId']" target="_blank" rel="noopener noreferrer">{{ data['title'][locale] }}</a></p>
        </v-card-text>
      </v-card>
      <Space></Space>
      <v-card elevation="2">
        <v-card-title>{{ $t('description') }}</v-card-title>
        <v-card-text>
          <ul style="margin-left:20px;">
            <li v-for="(desc, descIndex) in data['description']" :key="descIndex">{{ desc[locale] }}</li>
          </ul>
        </v-card-text>
      </v-card>
      <Space></Space>
      <v-card elevation="2">
        <v-card-title>{{ $t('attention') }}</v-card-title>
        <v-card-text>
          <ul style="margin-left:20px;">
            <li v-for="(att, attIndex) in data['attention']" :key="attIndex">{{ att[locale] }}</li>
          </ul>
        </v-card-text>
      </v-card>
      <Space></Space>
      <v-card elevation="2">
        <v-card-title>{{ $t('logs') }}</v-card-title>
        <v-card-text>
          <div v-for="(logGroup, lgIndex) in data['logs']" :key="lgIndex">
            <p><b>{{ logGroup['module'][locale] }}</b>
            <p v-for="(log, logIndex) in logGroup['log']" :key="logIndex">
              {{ log[locale] }}
            </p>
            </p>
          </div>
        </v-card-text>
      </v-card>
      <Space></Space>
      <v-card elevation="2" v-show="data['show'] == 'yes'">
        <v-card-title>{{ $t('roms') }}</v-card-title>
        <v-card-text>
          <v-table>
            <caption class="sr-only">{{ $t('rom_table_caption') }}</caption>
            <thead>
              <tr>
                <th class="text-left" scope="col">{{ $t('name') }}</th>
                <th class="text-left" scope="col">{{ $t('hyperos') }}</th>
                <th class="text-left" scope="col">{{ $t('android') }}</th>
                <th class="text-left" scope="col">{{ $t('recovery') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ device, name, rom } in data['roms']" v-show="rom['recovery'] != ''" :key="device">
                <td>{{ name[locale] }}({{ device }})</td>
                <td>{{ rom['os'] }}</td>
                <td>{{ rom['android'] }}</td>
                <td v-if="rom['recovery'] == ''">{{ $t('yet') }}</td>
                <td v-else><a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + rom['os'] + '/' + rom['recovery'])" :aria-label="$t('getitdown') + ': ' + rom['recovery']"><span v-if="$device.isDesktopOrTablet">{{ rom['recovery'] }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </v-card>
      <v-expansion-panels variant="accordion" v-model="panel" v-show="data['suspended'].length != 0">
        <v-expansion-panel>
          <v-expansion-panel-title>{{ $t('suspended') }}</v-expansion-panel-title>
          <v-expansion-panel-text>
            <p><span style="color: red;">{{ $t('note') }} </span>{{ $t('suspendednote') }}</p>
            <v-table>
              <caption class="sr-only">{{ $t('suspended_table_caption') }}</caption>
              <thead>
                <tr>
                  <th class="text-left" scope="col">{{ $t('name') }}</th>
                  <th class="text-left" scope="col">{{ $t('hyperos') }}</th>
                  <th class="text-left" scope="col">{{ $t('android') }}</th>
                  <th class="text-left" scope="col">{{ $t('recovery') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="{ device, name, rom } in data['suspended']" :key="device">
                  <td>{{ name[locale] }}({{ device }})</td>
                  <td>{{ rom['os'] }}</td>
                  <td>{{ rom['android'] }}</td>
                  <td v-if="rom['recovery'] == ''">{{ $t('yet') }}</td>
                  <td v-else><a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + rom['os'] + '/' + rom['recovery'])" :aria-label="$t('getitdown') + ': ' + rom['recovery']"><span v-if="$device.isDesktopOrTablet">{{ rom['recovery'] }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
                </tr>
              </tbody>
            </v-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </main>
    <br />
    <Footer></Footer>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      panel: [],
      drawer: null,
    };
  },
};
</script>
<script setup>
import { useTheme } from 'vuetify'
const route = useRoute()
const { locale } = useI18n();
const url = "https://data.hyperos.fans/dev/" + route.params.week.toLowerCase() + ".json"
const { data } = await useFetch(url)
const theme = useTheme();
function toggleTheme() {
  theme.change(theme.current.dark ? 'light' : 'dark')
}
</script>