<template>
	<title v-if="locale == 'en'">
		{{ $t("rompage") }} {{ data.name[locale.locale.value] }} - HyperOS.fans
	</title>
	<title v-else>
		{{ data.name[locale.locale.value] }} {{ $t("rompage") }} - HyperOS.fans
	</title>
	<v-app>
		<Nav></Nav>
		<Space></Space>
		<v-card>
			<v-card-title>{{ $t('devinfo') }}</v-card-title>
			<v-card-text>
				<p style="padding-left:10px;">{{ $t('name') }} ： <span>{{ data.name[locale.locale.value] }}</span></p>
				<p style="padding-left:10px;">{{ $t('codename') }} ： <span>{{ data.device }}</span></p>
				<p style="padding-left:10px;">{{ $t('tips') }} ： <span>
						<NuxtLink :to="('/' + locale.locale.value + '/tips/403')">{{ $t('fix403') }}</NuxtLink>
					</span></p>
				<p style="padding-left:10px;">{{ $t('miui') }} ： <span v-if="data.miui == 'yes'">{{ $t('yes') }} {{ $t('gotomiui') }}<a v-if="locale.locale.value == 'zh'" :href="('https://roms.miuier.com/mobile/zh-cn/devices/' + data.device)">{{ data.name[locale.locale.value] }}({{ data.device }}) {{ $t('miuier') }}</a><a v-else :href="('https://roms.miuier.com/mobile/en-us/devices/' + data.device)">{{ data.name[locale.locale.value] }}({{ data.device }}) {{ $t('miuier') }}</a></span><span v-else>{{ $t('no') }}</span></p>
			</v-card-text>
		</v-card>

		<Space></Space>
		<v-expansion-panels variant="accordion" v-model="panel">
			<v-expansion-panel v-for="branche in data.branches" v-show="branche.show == '1'">
				<v-expansion-panel-title>
					{{ branche.name[locale.locale.value] }}
				</v-expansion-panel-title>
				<v-expansion-panel-text>
					<v-table>
						<thead>
							<tr>
								<th class="text-left">{{ $t('os') }}</th>
								<th class="text-left">{{ $t('android') }}</th>
								<th class="text-left">{{ $t('release') }}</th>
								<th class="text-left">{{ $t('recovery') }}</th>
								<th class="text-left">{{ $t('fastboot') }}</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="{ os, android, release, recovery, fastboot } in branche.roms">
								<td>{{ os }}</td>
								<td>{{ android }}</td>
								<td>{{ release }}</td>
								<td v-if="recovery == ''">{{ $t('yet') }}</td>
								<td v-else><a :href="('https://bigota.d.miui.com/' + os + '/' + recovery)"><span v-if="$device.isDesktopOrTablet">{{ recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
								<td v-if="fastboot == ''">{{ $t('yet') }}</td>
								<td v-else><a :href="('https://bigota.d.miui.com/' + os + '/' + fastboot)"><span v-if="$device.isDesktopOrTablet">{{ fastboot }}</span><span v-else>{{ $t('fastboot') }}</span></a></td>
							</tr>
						</tbody>
					</v-table>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
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
const route = useRoute();
const locale = useI18n();
const url =
	"https://data.hyperos.fans/devices/" + route.params.codename + ".json";
const { data } = await useFetch(url);
</script>
