<template>
  <title>{{ $t('devlist') }} - HyperOS.fans</title>
		<v-app>
			<Nav></Nav>
			<v-expansion-panels variant="accordion" v-model="panel">
				<v-expansion-panel v-for="alldevices in data">
					<v-expansion-panel-title>{{
						alldevices[locale]
					}}</v-expansion-panel-title>
				<v-expansion-panel-text v-if="$device.isDesktopOrTablet" class="d-flex">
					<v-container fluid>
							<v-row dense>
								<v-col v-for="devices in alldevices['devices']">
									<v-card class="mx-auto" max-width="600" :href="('/'+locale+'/devices/'+devices['code'])">
										<v-img
											:src="'https://data.hyperos.fans/assets/images/' +devices['image']"
											class="align-end"
											height="200px"
											style="margin-top:10px;"
										>
										</v-img>
										<v-card-title>{{ devices['name'][locale] }}</v-card-title>
										<v-card-subtitle>{{ devices['code'] }}</v-card-subtitle>
										<v-btn class="text-HyperBlue" style="margin-bottom:10px" variant="text" prepend-icon="mdi-download">{{ $t('download') }}</v-btn>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-expansion-panel-text>
			<v-expansion-panel-text v-else>
					<v-container fluid>
						<a v-for="devices in alldevices['devices']" :href="('/'+locale+'/devices/'+devices['code'])">
							<v-chip style="margin-top:5px;margin-right:5px;">
								<span class="text-HyperBlue">{{devices['name'][locale]}}({{devices['code']}})</span>
							</v-chip>
						</a>
						</v-container>
					</v-expansion-panel-text>
					</v-expansion-panel>
			</v-expansion-panels>
			<Space></Space>
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
const { locale, locales } = useI18n();
const url = "https://data.hyperos.fans/devices.json";
const { data } = await useFetch(url);
</script>
