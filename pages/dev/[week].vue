<template>
  <title v-if="locale == 'en'">HyperOS {{ data.title[locale] }} - HyperOS.fans</title>
  <title v-else>HyperOS {{ data.title[locale] }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <Space></Space>
    <v-card :title="data.title[locale]" elevation="2">
      <v-card-text>
        <p><b>{{ $t('uptime') }}</b>{{ data.update }}</p>
        <p><b>{{ $t('versions') }}</b>{{ data.versions }}</p>
        <p><b>{{ $t('comlink') }}</b><a :href="('https://www.xiaomi.cn/post/') + data.postId" target="_blank">{{ data.title[locale] }}</a></p>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2">
      <v-card-title>{{ $t('description') }}</v-card-title>
      <v-card-text>
        <ul style="margin-left:20px;">
          <li v-for="(data) in data.description">{{ data[locale] }}</li>
        </ul>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2">
      <v-card-title>{{ $t('attention') }}</v-card-title>
      <v-card-text>
        <ul style="margin-left:20px;">
          <li v-for="(data) in data.attention">{{ data[locale] }}</li>
        </ul>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2">
      <v-card-title>{{ $t('logs') }}</v-card-title>
      <v-card-text>
        <div v-for="(data) in data.logs">
          <p><b>{{ data.module[locale] }}</b>
          <p v-for="(data) in data.log">
            {{ data[locale] }}
          </p>
          </p>
        </div>
      </v-card-text>
    </v-card>
    <Space></Space>
    <v-card elevation="2" v-show="data.show == 'yes'">
      <v-card-title>{{ $t('roms') }}</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">{{ $t('name') }}</th>
              <th class="text-left">{{ $t('os') }}</th>
              <th class="text-left">{{ $t('android') }}</th>
              <th class="text-left">{{ $t('recovery') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ device, name, rom } in data.roms" v-show="rom.recovery != ''">
              <td>{{ name[locale] }}({{ device }})</td>
              <td>{{ rom.os }}</td>
              <td>{{ rom.android }}</td>
              <td v-if="rom.recovery == ''">{{ $t('yet') }}</td>
              <td v-else><a :href="('https://cdnorg.d.miui.com/' + rom.os + '/' + rom.recovery)"><span v-if="$device.isDesktopOrTablet">{{ rom.recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <v-expansion-panels variant="accordion" v-model="panel" v-show="data.suspended.length != 0">
      <v-expansion-panel>
        <v-expansion-panel-title>{{ $t('suspended') }}</v-expansion-panel-title>
        <v-expansion-panel-text>
          <p><span style="color: red;">{{ $t('note') }} </span>{{ $t('suspendednote') }}</p>
          <v-table>
          <thead>
            <tr>
              <th class="text-left">{{ $t('name') }}</th>
              <th class="text-left">{{ $t('os') }}</th>
              <th class="text-left">{{ $t('android') }}</th>
              <th class="text-left">{{ $t('recovery') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ device, name, rom } in data.suspended">
              <td>{{ name[locale] }}({{ device }})</td>
              <td>{{ rom.os }}</td>
              <td>{{ rom.android }}</td>
              <td v-if="rom.recovery == ''">{{ $t('yet') }}</td>
              <td v-else><a :href="('https://cdnorg.d.miui.com/' + rom.os + '/' + rom.recovery)"><span v-if="$device.isDesktopOrTablet">{{ rom.recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
            </tr>
          </tbody>
        </v-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
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
const route = useRoute()
const { locale } = useI18n();
const url = "https://data.hyperos.fans/dev/" + route.params.week + ".json"
const { data } = await useFetch(url)
</script>