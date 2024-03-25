<template>
  <title v-if="locale == 'en'"> {{ data.title[locale] }} - HyperOS.fans</title>
  <title v-else>{{ data.title[locale] }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;padding-top:10px">
      <h3 class="HyperBlue">{{ data.title[locale] }}</h3>
      <h3>{{ $t('uptime') }} : <span style="font-weight: lighter;">{{ data.update }}</span></h3>
      <h3>{{ $t('versions') }} : <span style="font-weight: lighter;">{{ data.versions }}</span></h3>
      <h3>{{ $t('comlink') }} : <span style="font-weight: lighter;"><a :href="('https://www.xiaomi.cn/post/') + data.postId" target="_blank">{{ data.title[locale] }}</a></span></h3>
    </div>
  </mdui-card>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;padding-top:10px">
      <h3>{{ $t('description') }}</h3>
      <ul v-for="(data) in data.description">
        <li>{{ data[locale] }}</li>
      </ul>
    </div>
  </mdui-card>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;padding-top:10px">
      <h3>{{ $t('attention') }}</h3>
      <ul v-for="(data) in data.attention">
        <li>{{ data[locale] }}</li>
      </ul>
    </div>
  </mdui-card>
  <mdui-card style="width: 99vw;padding-bottom: 20px;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;padding-top:10px">
      <h3>{{ $t('logs') }}</h3>
      <div v-for="(data) in data.logs">
        <p><b>{{ data.module[locale] }}</b>
        <p v-for="(data) in data.log">
          {{ data[locale] }}
        </p>
        </p>
      </div>
      <div></div>
    </div>
  </mdui-card>
    <div class="mdui-prose" style="width:95vw;">
      <div style="padding-left:10px;padding-top:10px">
        <h3>{{ $t('roms') }}</h3>
      </div>
      <table>
        <thead>
          <th>{{ $t('name') }}</th>
          <th>{{ $t('os') }}</th>
          <th>{{ $t('android') }}</th>
          <th>{{ $t('recovery') }}</th>
          <th>{{ $t('fastboot') }}</th>
        </thead>
        <tbody>
          <tr v-for="{ device, name, rom } in data.roms">
            <td>{{ name[locale] }}({{ device }})</td>
            <td style="font-size: 10px;">{{ rom.os }}</td>
            <td>{{ rom.android }}</td>
            <td v-if="rom.recovery == ''">{{ $t('yet') }}</td>
            <td v-else><a :href="('https://bn.d.miui.com/' + rom.os + '/' + rom.recovery)"><span v-if="$device.isDesktopOrTablet">{{ rom.recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
            <td v-if="rom.fastboot == ''">{{ $t('yet') }}</td>
            <td v-else><a :href="('https://bn.d.miui.com/' + rom.os + '/' + rom.fastboot)"><span v-if="$device.isDesktopOrTablet">{{ rom.fastboot }}</span><span v-else>{{ $t('fastboot') }}</span></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
  <br /><br /><br />
</template>
<script setup>
const route = useRoute()
const {locale} = useI18n();
const url = "https://data.hyperos.fans/dev/" + route.params.week + ".json"
const { data } = await useFetch(url)
</script>

