<template>
	<title v-if="locale == 'en'">
		{{ $t("rompage") }} {{ data.name[locale] }} - HyperOS.fans
	</title>
	<title v-else>
		{{ data.name[locale] }} {{ $t("rompage") }} - HyperOS.fans
	</title>
	<v-app>
		<Nav></Nav>
		<Space></Space>
		<v-card>
			<v-card-title>{{ $t('devinfo') }}</v-card-title>
			<v-card-text>
				<p style="padding-left:10px;">{{ $t('name') }} ： <span>{{ data.name[locale] }}</span></p>
				<p style="padding-left:10px;">{{ $t('codename') }} ： <span>{{ data.device }}</span></p>
				<p style="padding-left:10px;">{{ $t('tips') }} ： <span>{{ $t('fixed') }}
						<!-- <NuxtLink :to="('/' + locale + '/tips/403')">{{ $t('fix403') }}</NuxtLink> -->
					</span></p>
					<p style="padding-left:10px;">
						{{ $t('bllock') }} ： <span>{{ $t('unlock') }}</span>
						<span v-if="locale == 'zh'">
							<a href="https://web.vip.miui.com/page/info/mio/mio/testDetails?type=BL_BLOCK&id=-1">{{ $t('unlockurl') }}</a>
						</span>
						<span v-else>
							<a href="https://new.c.mi.com/global/embedded/app/bl/lock">{{ $t('unlockurl') }}</a>
						</span>
					</p>
				<p style="padding-left:10px;">{{ $t('miui') }} ： <span v-if="data.miui == 'yes'">{{ $t('yes') }} {{ $t('gotomiui') }}<a v-if="locale == 'zh'" :href="('https://roms.miuier.com/zh-cn/devices/' + data.device)">{{ data.name[locale] }}({{ data.device }}) {{ $t('miuier') }}</a><a v-else :href="('https://roms.miuier.com/en-us/devices/' + data.device)">{{ data.name[locale] }}({{ data.device }}) {{ $t('miuier') }}</a></span><span v-else>{{ $t('no') }}</span></p>
			</v-card-text>
		</v-card>

		<Space></Space>
		<v-expansion-panels variant="accordion" v-model="panel">
			<v-expansion-panel v-for="branche in data.branches" v-show="branche.show == '1'">
				<v-expansion-panel-title>
					{{ branche.name[locale] }}
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
						<tbody v-if="branche.idtag == 'ADPC' || branche.idtag == 'ADPG'">
							<tr v-for="{ os, android, release, recovery, fastboot, originrec, originfb } in branche.roms">
								<td>{{ os }}</td>
								<td>{{ android }}</td>
								<td>{{ release }}</td>
								<td v-if="recovery == ''">{{ $t('yet') }}</td>
								<td v-else><a :href=originrec><span v-if="$device.isDesktopOrTablet">{{ recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
								<td v-if="origin == ''">{{ $t('yet') }}</td>
								<td v-else><a :href=originfb><span v-if="$device.isDesktopOrTablet">{{ fastboot }}</span><span v-else>{{ $t('fastboot') }}</span></a></td>
							</tr>
						</tbody>
						<tbody v-else>
							<tr v-for="{ os, android, release, recovery, fastboot } in branche.roms">
								<td>{{ os }}</td>
								<td>{{ android }}</td>
								<td>{{ release }}</td>
								<td v-if="recovery == ''">{{ $t('yet') }}</td>
								<td v-else><a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + os + '/' + recovery)"><span v-if="$device.isDesktopOrTablet">{{ recovery }}</span><span v-else>{{ $t('recovery') }}</span></a></td>
								<td v-if="fastboot == ''">{{ $t('yet') }}</td>
								<td v-else><a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + os + '/' + fastboot)"><span v-if="$device.isDesktopOrTablet">{{ fastboot }}</span><span v-else>{{ $t('fastboot') }}</span></a></td>
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
const {locale} = useI18n();
const url =
	"https://data.hyperos.fans/devices/" + route.params.codename.toLowerCase() + ".json";
const { data } = await useFetch(url);
</script>