<template>
	<title v-if="locale == 'en'">
		{{ $t("rompage") }} {{ data['name'][locale] }} - HyperOS.fans
	</title>
	<title v-else>
		{{ data['name'][locale] }} {{ $t("rompage") }} - HyperOS.fans
	</title>
	<v-app>
		<Nav></Nav>
		<Space></Space>
		<v-card>
			<v-card-title class="devinfo">{{ $t('devinfo') }}</v-card-title>
			<v-card-text>
				<p style="padding-left:10px;"><b>{{ $t('name') }}</b><span>{{ data['name'][locale] }}</span></p>
				<p style="padding-left:10px;"><b>{{ $t('codename') }}</b><span>{{ data['device'] }}</span></p>
					<p style="padding-left:10px;">
						<b>{{ $t('bllock') }}</b><span>{{ $t('unlock') }} , </span>
						<span v-if="locale == 'zh'">
							<a href="https://web.vip.miui.com/page/info/mio/mio/testDetails?type=BL_BLOCK&id=-1">{{ $t('unlockurl') }}</a>
						</span>
						<span v-else>
							<a href="https://new.c.mi.com/global/embedded/app/bl/lock">{{ $t('unlockurl') }}</a>
						</span>
					</p>
					<p v-if="data['merged'] == 'no'" style="padding-left:10px;">
					</p>
					<p v-else style="padding-left:10px;">
						<span><b>{{ $t('merged') }}</b>{{ data['notice'][locale] }} , <a :href="('/'+locale+'/devices/'+data['merged'])">{{ $t('checkit') }} {{ data['merged_with'][locale] }}</a></span>
					</p>
				<p style="padding-left:10px;"><b>{{ $t('miui') }}</b><span v-if="data['miui'] == 'yes'">{{ $t('yes') }} {{ $t('gotomiui') }}<a v-if="locale == 'zh'" :href="('https://roms.miuier.com/zh-cn/devices/' + data['device'])">{{ data['name'][locale] }}({{ data['device'] }}) {{ $t('miuier') }}</a><a v-else :href="('https://roms.miuier.com/en-us/devices/' + data['device'])">{{ data['name'][locale] }}({{ data['device'] }}) {{ $t('miuier') }}</a></span><span v-else>{{ $t('no') }}</span></p>
			</v-card-text>
		</v-card>

		<Space></Space>
		<v-expansion-panels variant="accordion" v-model="panel">
			<v-expansion-panel v-for="branche in data['branches']" v-show="branche['show'] == '1'">
				<v-expansion-panel-title>
					{{ branche['name'][locale] }}
				</v-expansion-panel-title>
				<v-expansion-panel-text>
						<p>{{ $t('brand') }}{{ branche['brand'] }}</p>
						<p>{{ $t('codename') }}{{ branche['branchCode'] }}</p>
						<p>{{ $t('devicename') }}{{ branche['device'][locale] }}</p>
						<p>{{ $t('region') }}{{ $t(branche['region']) }}</p>
				</v-expansion-panel-text>
				<v-expansion-panel-text>
					<v-table>
						<thead>
							<tr>
								<th class="text-left" v-for="menu in branche['table']">{{ $t(menu) }}</th>
							</tr>
							
						</thead>
						<tbody>
							<tr v-for="(rom, ver) in branche['roms']">
								<td v-for="i in branche['table'].length">
									<span v-if="branche['table'][i-1] == 'os' || branche['table'][i-1] == 'android' || branche['table'][i-1] == 'release'">
										{{ rom[branche['table'][i-1]] }}
									</span>
									<span v-else-if="rom[branche['table'][i-1]] ==''">{{ $t('yet') }}</span>
									<span v-else-if="branche['table'][i-1] == 'originrec' || branche['table'][i-1] == 'originfb'">
										<a :href="(rom[branche['table'][i-1]])">
											<span v-if="$device.isDesktopOrTablet">{{ rom[branche['table'][i-1]] }}</span>
											<span v-else>{{ $t('getitdown') }}</span>
										</a>
									</span>
									<span v-else>
										<a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + ver + '/' + rom[branche['table'][i-1]])">
											<span v-if="$device.isDesktopOrTablet">{{ rom[branche['table'][i-1]] }}</span>
											<span v-else>{{ $t('getitdown') }}</span>
										</a>
									</span>
								</td>
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