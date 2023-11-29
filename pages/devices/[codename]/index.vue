<template>
  <title v-if="lang == 'en'">{{ $t('rompage') }} {{ data.name[lang] }} - HyperOS.fans</title>
  <title v-else>{{ data.name[lang] }} {{ $t('rompage') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;height: 170px;align-items: center;margin-top:1vw;margin-right:1vw">
    <p style="padding-left:10px;">{{ $t('name') }} ： <span>{{ data.name[lang] }}</span></p>
    <p style="padding-left:10px;">{{ $t('codename') }} ： <span>{{ data.device }}</span></p>
    <p style="padding-left:10px;">{{ $t('tips') }} ： <span><NuxtLink :to="('/'+lang+'/tips/403')">{{ $t('fix403') }}</NuxtLink></span></p>
    <p style="padding-left:10px;">{{ $t('miui') }} ： <span v-if="data.miui == 'yes'">{{ $t('yes') }} {{ $t('gotomiui') }}<a :href="('https://roms.miuier.com/devices/'+data.device)">{{ data.name[lang] }}({{ data.device }}) {{ $t('miuier') }}</a></span><span v-else>{{ $t('no') }}</span></p>
  </mdui-card>
  <div v-for="{ name, roms, show } in data.branches">
    <mdui-list v-show="show != 0">
      <mdui-collapse accordion>
        <mdui-collapse-item>
          <mdui-list-item slot="header">{{ name[lang] }} <mdui-icon slot="end-icon" class="example-trigger" name="keyboard_arrow_down"></mdui-icon></mdui-list-item>
          <div>
              <div class="mdui-prose" style="width:95vw;">
                <table>
                  <thead>
                    <th>{{ $t('os') }}</th>
                    <th>{{ $t('android') }}</th>
                    <th>{{ $t('recovery') }}</th>
                    <th>{{ $t('fastboot') }}</th>
                  </thead>
                  <tbody>
                    <tr v-for="{ os, android, recovery, fastboot } in roms">
                      <!-- <td><NuxtLink :to="(route.path+'/'+os)">{{ os }}</NuxtLink></td> -->
                      <td>{{ os }}</td>
                      <td>{{ android }}</td>
                      <td v-if="recovery == ''">{{ $t('yet') }}</td>
                      <td v-else><a :href="('https://hugeota.d.miui.com/' + os + '/' + recovery)"><span v-if="$device.isDesktopOrTablet">{{ recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
                      <td v-if="fastboot == ''">{{ $t('yet') }}</td>
                      <td v-else><a :href="('https://hugeota.d.miui.com/' + os + '/' + fastboot)"><span v-if="$device.isDesktopOrTablet">{{ fastboot }}</span><span v-else>{{ $t('fastboot') }}</span></a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
          </div>
        </mdui-collapse-item>
      </mdui-collapse>
    </mdui-list>
  </div>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
</template>
<script setup>
const route = useRoute()
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices/" + route.params.codename + ".json"
const { data } = await useFetch(url)
</script>