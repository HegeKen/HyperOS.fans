<template>
  <br>
  <title v-if="lang == 'en'">{{ $t('rompage') }} {{ data.name[lang] }} - HyperOS.fans</title>
  <title v-else>{{ data.name[lang] }} {{ $t('rompage') }} - HyperOS.fans</title>
  <Nav>
  </Nav>
  <div class="mdui-prose">
    <h3>{{ $t('name') }} ： <span>{{ data.name[lang] }}</span></h3>
    <h3>{{ $t('codename') }} ： <span>{{ data.device }}</span></h3>
    <h3>{{ $t('miui') }} ： <span v-if="data.miui == 'yes'">{{ $t('yes') }}</span><span v-else>{{ $t('no') }}</span></h3>
    <div v-for="{ name, roms } in data.branches">
      <mdui-list>
        <mdui-collapse accordion>
          <mdui-collapse-item>
            <mdui-list-item slot="header">{{ name[lang] }} <mdui-icon slot="end-icon" class="example-trigger" name="keyboard_arrow_down"></mdui-icon></mdui-list-item>
            <div style="margin-left: 2.5rem">
              <mdui-list-item>
                <table>
                  <title>name[lang]</title>
                  <thead>
                    <th>{{ $t('os') }}</th>
                    <th>{{ $t('Android') }}</th>
                    <th>{{ $t('recovery') }}</th>
                    <th>{{ $t('fastboot') }}</th>
                  </thead>
                  <tbody>
                    <tr v-for="{ os, android, recovery, fastboot } in roms">
                      <td>{{ os }}</td>
                      <td>{{ android }}</td>
                      <td v-if="recovery == ''">{{ $t('yet') }}</td>
                      <td v-else><a :href="('https://hugeota.d.miui.com/' + os + '/' + recovery)">{{ recovery }}</a></td>
                      <td v-if="fastboot == ''">{{ $t('yet') }}</td>
                      <td v-else><a :href="('https://hugeota.d.miui.com/' + os + '/' + fastboot)">{{ fastboot }}</a></td>
                    </tr>
                  </tbody>
                </table>
                <br>
              </mdui-list-item>
            </div>
          </mdui-collapse-item>
        </mdui-collapse>
      </mdui-list>
    </div>
  </div>
</template>
<script setup>
const route = useRoute()
const locale = useI18n()
const lang = locale.locale.value
const url = "https://data.hyperos.fans/devices/" + route.params.codename + ".json"
const { data } = await useFetch(url)
</script>