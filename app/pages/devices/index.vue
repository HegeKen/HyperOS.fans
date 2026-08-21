<template>
	<Title>{{ $t('devlist') }} - HyperOS.fans</Title>
	<v-app>
		<div id="top" tabindex="-1"></div>
		<Nav></Nav>
		<main id="main-content" tabindex="-1">
			<v-expansion-panels variant="accordion" v-model="panel">
				<v-expansion-panel v-for="(alldevices, i) in data" :key="i">
					<v-expansion-panel-title>{{
						alldevices[locale]
					}}</v-expansion-panel-title>
					<v-expansion-panel-text v-if="$device.isDesktopOrTablet" class="d-flex">
						<v-container fluid>
							<v-row dense>
								<v-col v-for="devices in alldevices['devices']" :key="devices['code']">
									<v-card class="mx-auto" max-width="600">
										<NuxtLink :to="('/' + locale + '/devices/' + devices['code'])" class="device-card-link">
											<v-img :src="'https://data.hyperos.fans/assets/images/' + devices['image']" :alt="devices['name'][locale]" class="align-end" height="200px" style="margin-top:10px;">
											</v-img>
											<v-card-title class="text-v-card-title">{{ devices['name'][locale] }}</v-card-title>
											<v-card-subtitle class="text-v-card-subtitle">{{ devices['code'] }}</v-card-subtitle>
										</NuxtLink>
										<v-btn :href="('/' + locale + '/devices/' + devices['code'])" class="text-HyperBlue" style="margin-bottom:10px" variant="text" prepend-icon="mdi-download">{{ $t('download') }}</v-btn>
									</v-card>
								</v-col>
							</v-row>
						</v-container>
					</v-expansion-panel-text>
					<v-expansion-panel-text v-else>
						<v-container fluid>
							<a v-for="devices in alldevices['devices']" :key="devices['code']" :href="('/' + locale + '/devices/' + devices['code'])">
								<v-chip style="margin-top:5px;margin-right:5px;">
									<span class="text-HyperBlue">{{ devices['name'][locale] }}({{ devices['code'] }})</span>
								</v-chip>
							</a>
						</v-container>
					</v-expansion-panel-text>
				</v-expansion-panel>
			</v-expansion-panels>
		</main>
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
import { useTheme } from 'vuetify'
const { locale, locales } = useI18n();
const url = "https://data.hyperos.fans/devices.json";
const { data } = await useFetch(url);
const theme = useTheme();
function toggleTheme() {
	theme.change(theme.current.dark ? 'light' : 'dark')
}
</script>
