<template>
	<title v-if="locale == 'en'">
		{{ $t("rompage") }} {{ data['name'][locale] }} - HyperOS.fans
	</title>
	<title v-else>
		{{ data['name'][locale] }} {{ $t("rompage") }} - HyperOS.fans
	</title>
	<v-app>
		<div id="top"></div>
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
					<span><b>{{ $t('merged') }}</b>{{ data['notice'][locale] }} , <a :href="('/' + locale + '/devices/' + data['merged'])">{{ $t('checkit') }} {{ data['merged_with'][locale] }}</a></span>
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
								<th class="text-left">{{ $t('detail') }}</th>
							</tr>

						</thead>
						<tbody>
							<tr v-for="(rom, ver) in branche['roms']">
								<td v-for="i in branche['table'].length">
									<span v-if="branche['table'][i - 1] == 'os' || branche['table'][i - 1] == 'android' || branche['table'][i - 1] == 'release'">
										{{ rom[branche['table'][i - 1]] }}
									</span>
									<span v-else-if="rom[branche['table'][i - 1]] == ''">{{ $t('yet') }}</span>
									<span v-else-if="branche['table'][i - 1] == 'originrec' || branche['table'][i - 1] == 'originfb'">
										<a :href="(rom[branche['table'][i - 1]])">
											<span v-if="$device.isDesktopOrTablet">{{ rom[branche['table'][i - 1]] }}</span>
											<span v-else>{{ $t('getitdown') }}</span>
										</a>
									</span>
									<span v-else>
										<a :href="('https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com/' + ver + '/' + rom[branche['table'][i - 1]])">
											<span v-if="$device.isDesktopOrTablet">{{ rom[branche['table'][i - 1]] }}</span>
											<span v-else>{{ $t('getitdown') }}</span>
										</a>
									</span>
								</td>
								<td>
									<v-btn variant="text" size="small" color="primary" @click="openOtaDialog(branche, rom, ver)">
										{{ $t('detail') }}
									</v-btn>
								</td>
							</tr>
						</tbody>
					</v-table>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>

		<!-- OTA 详情模态框 -->
		<v-dialog v-model="otaDialog" max-width="820px" scrollable transition="dialog-transition">
			<v-card class="rounded-xl overflow-hidden">
				<!-- 标题栏 -->
				<v-card-title class="d-flex align-center pa-4 border-b border-primary/20">
					<v-icon icon="mdi-information-outline" class="mr-2 text-primary"></v-icon>
					<span class="text-h6 font-weight-bold">{{ $t('ota_detail') }}</span>
					<v-spacer></v-spacer>
					<v-btn icon="mdi-close" variant="text" size="small" color="grey" @click="otaDialog = false"></v-btn>
				</v-card-title>

				<v-card-text class="pa-4">
					<!-- 加载状态 -->
					<div v-if="otaLoading" class="text-center py-12">
						<v-progress-circular indeterminate color="primary" size="48" width="4"></v-progress-circular>
						<p class="mt-4 text-medium-emphasis">{{ $t('loading_ota_info') }}</p>
					</div>

					<!-- 错误状态 -->
					<div v-else-if="otaError" class="py-4">
						<v-alert type="error" variant="tonal" :text="otaError" closable @click:close.prevent="otaError = null"></v-alert>
					</div>

					<!-- 无数据 -->
					<div v-else-if="!otaResult || (!otaResult.CurrentRom && !otaResult.LatestRom && !otaResult.IncrementRom)" class="text-center py-12">
						<v-icon icon="mdi-cloud-off-outline" size="64" class="text-disabled mb-4"></v-icon>
						<p class="text-medium-emphasis">{{ $t('no_ota_data_desc') }}</p>
					</div>

					<!-- 有数据 → Tabs 切换 -->
					<template v-else>
						<!-- Tab 导航栏 -->
						<v-tabs v-model="otaTab" color="primary" density="compact" grow class="mb-4">
							<v-tab v-if="otaResult.CurrentRom && !isSameRom" value="current" class="text-none px-2">
								<span class="text-caption font-weight-medium">{{ $t('current_rom') }}</span>
							</v-tab>
							<v-tab v-if="otaResult.LatestRom" value="latest" class="text-none px-2">
								<span class="text-caption font-weight-medium">{{ $t('latest_rom') }}</span>
							</v-tab>
							<v-tab v-if="otaResult.IncrementRom" value="increment" class="text-none px-2">
								<span class="text-caption font-weight-medium">{{ $t('increment_rom') }}</span>
							</v-tab>
						</v-tabs>

						<!-- Tab 内容面板 -->
						<v-window v-model="otaTab">
							<v-window-item value="current" v-show="otaResult.CurrentRom && !isSameRom">
								<template v-if="activeRom">
									<!-- 版本徽标 -->
									<div class="d-flex align-center mb-3">
										<v-chip :color="activeColor" variant="tonal" size="small" class="font-weight-bold">{{ activeRom.version }}</v-chip>
									</div>
									<!-- ROM 信息网格 -->
									<v-row density="comfortable" class="mb-2">
										<v-col cols="6" v-for="(item, i) in getRomDetails(activeRom)" :key="i">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ item.label }}:</span>
												<span class="font-weight-medium text-truncate">{{ item.value }}</span>
											</div>
										</v-col>
										<!-- 文件大小 -->
										<v-col cols="6" v-if="activeRom.filesize">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ $t('file_size') }}:</span>
												<span class="font-weight-medium text-truncate">{{ activeRom.filesize }}</span>
											</div>
										</v-col>
										<!-- MD5 -->
										<v-col cols="6" v-if="activeRom.md5">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">MD5:</span>
												<span class="font-mono text-caption text-truncate">{{ activeRom.md5 }}</span>
											</div>
										</v-col>
									</v-row>
									<!-- 下载按钮 -->
									<div class="d-flex flex-wrap gap-3 mt-2">
										<v-btn v-if="activeRom.recovery || activeRom.filename" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="recoveryDownloadUrl(activeRom)" target="_blank">{{ $t('recovery_package') }}</v-btn>
										<v-btn v-for="fb in getAvailableFastboots(activeRom)" :key="fb.key" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="fastbootDownloadUrl(activeRom, fb.key)" target="_blank">{{ $t(fb.i18nKey) }}</v-btn>
									</div>
									<!-- 更新日志 -->
									<template v-if="activeRom.changelog && Object.keys(activeRom.changelog).length > 0">
										<div class="mt-3 pt-3 border-t" :class="'border-' + activeColor + '/30'">
											<p class="font-weight-bold text-body-2 mb-2 d-flex align-center">
												<v-icon start size="18" class="mr-1" :color="activeColor">mdi-update</v-icon>
												{{ $t('changelog') }}
											</p>
											<div v-for="(category, categoryName) in activeRom.changelog" :key="categoryName" class="mb-2">
												<p class="font-weight-medium text-body-2 mb-1">{{ categoryName }}</p>
												<ul class="list-none pa-0 ml-4">
													<li v-for="(item, index) in category.txt" :key="index" class="text-body-2 py-0-5">
														{{ item }}
													</li>
												</ul>
											</div>
										</div>
									</template>
								</template>
							</v-window-item>

							<v-window-item value="latest" v-show="otaResult.LatestRom">
								<template v-if="activeRom">
									<!-- 版本徽标 -->
									<div class="d-flex align-center mb-3">
										<v-chip :color="activeColor" variant="tonal" size="small" class="font-weight-bold">{{ activeRom.version }}</v-chip>
									</div>
									<!-- ROM 信息网格 -->
									<v-row density="comfortable" class="mb-2">
										<v-col cols="6" v-for="(item, i) in getRomDetails(activeRom)" :key="i">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ item.label }}:</span>
												<span class="font-weight-medium text-truncate">{{ item.value }}</span>
											</div>
										</v-col>
										<!-- 文件大小 -->
										<v-col cols="6" v-if="activeRom.filesize">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ $t('file_size') }}:</span>
												<span class="font-weight-medium text-truncate">{{ activeRom.filesize }}</span>
											</div>
										</v-col>
										<!-- MD5 -->
										<v-col cols="6" v-if="activeRom.md5">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">MD5:</span>
												<span class="font-mono text-caption text-truncate">{{ activeRom.md5 }}</span>
											</div>
										</v-col>
									</v-row>
									<!-- 下载按钮 -->
									<div class="d-flex flex-wrap gap-3 mt-2">
										<v-btn v-if="activeRom.recovery || activeRom.filename" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="recoveryDownloadUrl(activeRom)" target="_blank">{{ $t('recovery_package') }}</v-btn>
										<v-btn v-for="fb in getAvailableFastboots(activeRom)" :key="fb.key" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="fastbootDownloadUrl(activeRom, fb.key)" target="_blank">{{ $t(fb.i18nKey) }}</v-btn>
									</div>
									<!-- 更新日志 -->
									<template v-if="activeRom.changelog && Object.keys(activeRom.changelog).length > 0">
										<div class="mt-3 pt-3 border-t" :class="'border-' + activeColor + '/30'">
											<p class="font-weight-bold text-body-2 mb-2 d-flex align-center">
												<v-icon start size="18" class="mr-1" :color="activeColor">mdi-update</v-icon>
												{{ $t('changelog') }}
											</p>
											<div v-for="(category, categoryName) in activeRom.changelog" :key="categoryName" class="mb-2">
												<p class="font-weight-medium text-body-2 mb-1">{{ categoryName }}</p>
												<ul class="list-none pa-0 ml-4">
													<li v-for="(item, index) in category.txt" :key="index" class="text-body-2 py-0-5">
														{{ item }}
													</li>
												</ul>
											</div>
										</div>
									</template>
								</template>
							</v-window-item>

							<v-window-item value="increment" v-show="otaResult.IncrementRom">
								<template v-if="activeRom">
									<!-- 版本徽标 -->
									<div class="d-flex align-center mb-3">
										<v-chip :color="activeColor" variant="tonal" size="small" class="font-weight-bold">{{ activeRom.version }}</v-chip>
									</div>
									<!-- ROM 信息网格 -->
									<v-row density="comfortable" class="mb-2">
										<v-col cols="6" v-for="(item, i) in getRomDetails(activeRom)" :key="i">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ item.label }}:</span>
												<span class="font-weight-medium text-truncate">{{ item.value }}</span>
											</div>
										</v-col>
										<!-- 文件大小 -->
										<v-col cols="6" v-if="activeRom.filesize">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">{{ $t('file_size') }}:</span>
												<span class="font-weight-medium text-truncate">{{ activeRom.filesize }}</span>
											</div>
										</v-col>
										<!-- MD5 -->
										<v-col cols="6" v-if="activeRom.md5">
											<div class="d-flex text-body-2 py-1 px-2 rounded-lg" :class="'bg-' + activeColor + '-darken-4'">
												<span class="text-medium-emphasis text-no-wrap mr-1">MD5:</span>
												<span class="font-mono text-caption text-truncate">{{ activeRom.md5 }}</span>
											</div>
										</v-col>
									</v-row>
									<!-- 下载按钮 -->
									<div class="d-flex flex-wrap gap-3 mt-2">
										<v-btn v-if="activeRom.recovery || activeRom.filename" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="recoveryDownloadUrl(activeRom)" target="_blank">{{ $t('recovery_package') }}</v-btn>
										<v-btn v-for="fb in getAvailableFastboots(activeRom)" :key="fb.key" :color="activeColor" variant="tonal" prepend-icon="mdi-download" :href="fastbootDownloadUrl(activeRom, fb.key)" target="_blank">{{ $t(fb.i18nKey) }}</v-btn>
									</div>
									<!-- 更新日志 -->
									<template v-if="activeRom.changelog && Object.keys(activeRom.changelog).length > 0">
										<div class="mt-3 pt-3 border-t" :class="'border-' + activeColor + '/30'">
											<p class="font-weight-bold text-body-2 mb-2 d-flex align-center">
												<v-icon start size="18" class="mr-1" :color="activeColor">mdi-update</v-icon>
												{{ $t('changelog') }}
											</p>
											<div v-for="(category, categoryName) in activeRom.changelog" :key="categoryName" class="mb-2">
												<p class="font-weight-medium text-body-2 mb-1">{{ categoryName }}</p>
												<ul class="list-none pa-0 ml-4">
													<li v-for="(item, index) in category.txt" :key="index" class="text-body-2 py-0-5">
														{{ item }}
													</li>
												</ul>
											</div>
										</div>
									</template>
								</template>
							</v-window-item>
						</v-window>
					</template>
				</v-card-text>
			</v-card>
		</v-dialog>

		<Footer></Footer>
	</v-app>
</template>

<script>
import CryptoJS from 'crypto-js';

const sdkMap = {
	"16.0": "36",
	"16": "36",
	"15": "35",
	"15.0": "35",
	"14": "34",
	"14.0": "34",
	"13.0": "33",
	"13": "33",
	"12": "31",
	"12.0": "31",
	"11": "30",
	"11.0": "30",
	"10": "29",
	"10.0": "29",
	"9": "28",
	"9.0": "28",
	"8.1": "27",
	"8": "26",
	"8.0": "26",
	"7.1": "25",
	"7": "24"
};

const miuiKey = CryptoJS.enc.Utf8.parse("miuiotavalided11");
const miuiIv = CryptoJS.enc.Utf8.parse('0102030405060708');

const ALIYUN_CDN = 'https://bkt-sgp-miui-ota-update-alisgp.oss-ap-southeast-1.aliyuncs.com';

const fastbootVariants = [
	{ key: 'fastboot', icon: 'mdi-harddisk', i18nKey: 'fastboot_package' },
	{ key: 'ctelecom', icon: 'mdi-phone-classic', i18nKey: 'ctelecom' },
	{ key: 'cnmobile', icon: 'mdi-phone-classic', i18nKey: 'cnmobile' },
	{ key: 'cnunicom', icon: 'mdi-phone-classic', i18nKey: 'cnunicom' },
];

export default {
	data() {
		return {
			panel: [],
			drawer: null,
			otaDialog: false,
			otaLoading: false,
			otaError: null,
			otaResult: null,
			currentDevice: '',
			otaTab: 'latest',
		};
	},
	computed: {
		isSameRom() {
			if (!this.otaResult || !this.otaResult.LatestRom || !this.otaResult.CurrentRom) {
				return false;
			}
			return this.otaResult.LatestRom.version === this.otaResult.CurrentRom.version;
		},
		activeRom() {
			if (!this.otaResult) return null;
			if (this.otaTab === 'current') return this.otaResult.CurrentRom;
			if (this.otaTab === 'latest') return this.otaResult.LatestRom;
			if (this.otaTab === 'increment') return this.otaResult.IncrementRom;
			return null;
		},
		activeColor() {
			if (this.otaTab === 'current') return 'primary';
			if (this.otaTab === 'latest') return 'success';
			if (this.otaTab === 'increment') return 'accent';
			return 'primary';
		}
	},
	methods: {
		formatSize(size) {
			if (!size) return 'N/A';
			const num = parseInt(size);
			if (num < 1024) return num + ' B';
			if (num < 1024 * 1024) return (num / 1024).toFixed(2) + ' KB';
			if (num < 1024 * 1024 * 1024) return (num / (1024 * 1024)).toFixed(2) + ' MB';
			return (num / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
		},
		getAvailableFastboots(rom) {
			if (!rom) return [];
			return fastbootVariants.filter(v => rom[v.key]);
		},
		recoveryDownloadUrl(rom) {
			if (!rom) return '';
			if (rom.recoveryUrl) return rom.recoveryUrl;
			if (rom.downloadUrl) return rom.downloadUrl;
			const file = rom.recovery || rom.filename;
			if (!file) return '';
			return 'https://ultimateota.d.miui.com/' + rom.version + '/' + file;
		},
		fastbootDownloadUrl(rom, key) {
			if (!rom || !rom[key]) return '';
			return ALIYUN_CDN + '/' + rom.version + '/' + rom[key];
		},
		getRomDetails(rom) {
			return [
				{ label: this.$t('device_codename'), value: rom.device || 'N/A', icon: 'mdi-devices' },
				{ label: this.$t('version'), value: rom.version || 'N/A', icon: 'mdi-tag' },
				{ label: this.$t('branch'), value: rom.branch || 'N/A', icon: 'mdi-source-branch' },
				{ label: this.$t('codebase'), value: rom.codebase || 'N/A', icon: 'mdi-android' },
				{ label: this.$t('os_big_version'), value: rom.osbigversion || 'N/A', icon: 'mdi-android' },
				{ label: this.$t('is_beta'), value: rom.isBeta === 1 ? this.$t('yes') : this.$t('no'), icon: 'mdi-beta' }
			];
		},
		stringToAsciiBytes(str) {
			const bytes = new Uint8Array(str.length);
			for (let i = 0; i < str.length; i++) {
				const charCode = str.charCodeAt(i);
				if (charCode > 127) {
					throw new Error(`Character '${str[i]}' (ASCII: ${charCode}) out of ASCII range`);
				}
				bytes[i] = charCode;
			}
			return bytes;
		},
		uint8ArrayToWordArray(bytes) {
			const length = bytes.length;
			const words = [];
			for (let i = 0; i < length; i += 4) {
				const b0 = bytes[i] ?? 0;
				const b1 = bytes[i + 1] ?? 0;
				const b2 = bytes[i + 2] ?? 0;
				const b3 = bytes[i + 3] ?? 0;
				words.push(
					(b0 << 24) |
					(b1 << 16) |
					(b2 << 8) |
					b3
				);
			}
			return CryptoJS.lib.WordArray.create(words, length);
		},
		buildHyperOSForm(code, device, version, region, android, b, zone = 1) {
			// pb 固定为 Redmi（匹配 Python HyperOSForm 模板）
			const pb = 'Redmi';

			// pn 逻辑（匹配 Python OTAFormer）
			const isCn = region.toLowerCase() === 'cn';
			let pn;
			if (isCn) {
				pn = code;
			} else {
				if (code === device + '_global') {
					pn = code;
				} else {
					pn = code.split('_global')[0];
				}
			}

			// v 字段：OS1 版本需转换为 V816（匹配 Python OTAFormer）
			let v;
			if (version.includes('OS1')) {
				v = 'MIUI-' + version.replace('OS1', 'V816');
			} else {
				v = version;
			}

			const form = {
				"obv": "OS1.0",
				"channel": "",
				"sys": "0",
				"bv": "816",
				"id": "",
				"sn": "0x0000043b716a25f1",
				"a": "0",
				"b": b,
				"c": android.replace('.0', ''),
				"unlock": "0",
				"d": code,
				"lockZoneChannel": "normal",
				"f": "1",
				"ov": "OS1.0.2.0.UMRCNXM",
				"g": "9b65722a06722e8d8dffa35a9fd58586",
				"i": "14db85f96df2efc324323fa7679f0d847ff53f3bff7179ea0c778ce5d980bc03",
				"i2": "2cd7c24f21e33b236fc63f26d044227b96d8b39a80400654f88182322688793b",
				"isR": "0",
				"l": "zh_CN",
				"n": "",
				"p": code,
				"pb": pb,
				"r": "CN",
				"v": v,
				"sdk": sdkMap[android] || "34",
				"pn": pn,
				"options": {
					"zone": zone === '1' ? '1' : '0',
					"hashId": "dae7d50f696d7403",
					"ab": "1",
					"previewPlan": "0",
					"sv": 3,
					"av": "8.8.8",
					"cv": version
				}
			};

			//console.log('Current Form:', JSON.stringify(form, null, 2));
			return form;
		},
		miEncrypt(reqdata) {
			const jsonString = JSON.stringify(reqdata);
			const asciiBytes = this.stringToAsciiBytes(jsonString);
			const blockSize = 16;
			const paddingLength = blockSize - (asciiBytes.length % blockSize);
			const paddedBytes = new Uint8Array(asciiBytes.length + paddingLength);
			paddedBytes.set(asciiBytes);
			for (let i = 0; i < paddingLength; i++) {
				paddedBytes[asciiBytes.length + i] = paddingLength;
			}
			const wordArray = this.uint8ArrayToWordArray(paddedBytes);
			const encrypted = CryptoJS.AES.encrypt(wordArray, miuiKey, {
				iv: miuiIv,
				mode: CryptoJS.mode.CBC,
				padding: CryptoJS.pad.NoPadding
			});
			const encryptedBase64 = encrypted.toString();
			const encryptedUrlEncoded = encodeURIComponent(encryptedBase64).replace(/\//g, '%2F');
			return encryptedUrlEncoded;
		},
		async getOTADownloadLink(code, device, version, region, android, b, zone = 1) {
			this.otaLoading = true;
			this.otaError = null;
			this.otaResult = null;

			try {
				console.log('【OTA 请求】开始获取 OTA 下载链接');
				console.log('【OTA 请求】参数:', { code, device, version, region, android, b, zone });

				const form = this.buildHyperOSForm(code, device, version, region, android, b, zone);
				console.log('【OTA 请求】构建的 form 数据:', JSON.stringify(form, null, 2));

				const encryptedData = this.miEncrypt(form);
				console.log('【OTA 请求】加密后的数据:', encryptedData);

				// 规范化 region 用于服务端 API URL 选择
				const apiRegion = region && region.toLowerCase() === 'cn' ? 'CN' : 'INTL';
				console.log('【OTA 请求】API 区域:', apiRegion);

				console.log('【OTA 请求】发送请求到 /api/ota...');
				const response = await fetch('/api/ota', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						data: encryptedData,
						region: apiRegion,
					}),
				});

				if (!response.ok) {
					console.error('【OTA 请求】API 响应失败，状态码:', response.status);
					const body = await response.text().catch(() => '');
					console.error('【OTA 请求】错误响应体:', body);
					this.otaError = `服务器错误 (${response.status})`;
					return;
				}

				const result = await response.json();
				console.log('【OTA 请求】API 响应结果:', JSON.stringify(result, null, 2));

				if (result.success) {
					console.log('【OTA 请求】成功！解密后的数据:', JSON.stringify(result.data, null, 2));
					this.otaResult = result.data;
				} else {
					console.warn('【OTA 请求】失败:', result.message);
					this.otaError = result.message || this.$t('ota_fetch_failed');
				}
			} catch (e) {
				console.error('【OTA 请求】异常错误:', e);
				console.error('【OTA 请求】错误堆栈:', e?.stack);
				this.otaError = e.message || this.$t('ota_fetch_failed_network');
			} finally {
				this.otaLoading = false;
			}
		},
		async fetchDeviceData(device) {
			try {
				const url = `https://www.hyperos.fans/data/devices/${device.toLowerCase()}.json`;
				const response = await fetch(url);
				if (response.ok) {
					const text = await response.text();
					if (!text || text.trim().length === 0) {
						console.warn('Device data response is empty:', device);
						return null;
					}
					return JSON.parse(text);
				}
				return null;
			} catch (e) {
				console.error('Failed to fetch device data:', e);
				return null;
			}
		},
		async fillCurrentRomFromDeviceData(device, currentVersion) {
			const deviceData = await this.fetchDeviceData(device);
			if (!deviceData || !deviceData.branches) {
				return;
			}

			for (const branch of deviceData.branches) {
				if (branch.roms && branch.roms[currentVersion]) {
					const romData = branch.roms[currentVersion];
					const recovery = romData.recovery || romData.filename || '';
					const recoveryUrl = recovery
						? `https://ultimateota.d.miui.com/${currentVersion}/${recovery}`
						: '';
					const currentRom = {
						device: device,
						version: currentVersion,
						name: romData.name || currentVersion,
						branch: romData.branch || branch.branchCode || 'F',
						codebase: romData.android || 'N/A',
						filename: romData.filename || recovery,
						recovery: recovery,
						recoveryUrl: recoveryUrl,
						fastboot: romData.fastboot || '',
						ctelecom: romData.ctelecom || '',
						cnmobile: romData.cnmobile || '',
						cnunicom: romData.cnunicom || '',
						filesize: romData.size || 'N/A',
						md5: romData.md5 || 'N/A',
						description: 'MIUI升级',
						descriptionUrl: 'http://update.miui.com/updates/updateinfo/default.html',
						isBeta: romData.isBeta === '1' ? 1 : 0,
						osbigversion: romData.os.split('.')[0] + '.0' || 'N/A',
					};
					this.otaResult.CurrentRom = currentRom;
					break;
				}
			}
		},
		async enrichRomDeviceData(rom, device) {
			if (!rom || !rom.version) return;
			const deviceData = await this.fetchDeviceData(device);
			if (!deviceData || !deviceData.branches) return;
			const version = rom.version;
			for (const branch of deviceData.branches) {
				if (branch.roms && branch.roms[version]) {
					const romData = branch.roms[version];
					if (romData.fastboot && !rom.fastboot) rom.fastboot = romData.fastboot;
					if (romData.ctelecom && !rom.ctelecom) rom.ctelecom = romData.ctelecom;
					if (romData.cnmobile && !rom.cnmobile) rom.cnmobile = romData.cnmobile;
					if (romData.cnunicom && !rom.cnunicom) rom.cnunicom = romData.cnunicom;
					if (!rom.filesize || rom.filesize === 'N/A') rom.filesize = romData.size || 'N/A';
					if (!rom.md5 || rom.md5 === 'N/A') rom.md5 = romData.md5 || 'N/A';
					break;
				}
			}
		},
		async openOtaDialog(branche, rom, ver) {
			this.otaDialog = true;
			this.otaTab = 'latest';
			const device = this.$route.params.codename;
			this.currentDevice = device;
			const code = branche.branchCode;
			const b = branche.branchtag;
			const version = ver;
			const region = branche.region;
			const android = rom.android;
			const zone = branche.zone || 1;

			await this.getOTADownloadLink(code, this.currentDevice, version, region, android, b, zone);

			if (!this.otaResult) {
				this.otaResult = {};
			}

			// 从设备 JSON 补充线刷包信息（API 返回的 ROM 只有 recovery 信息）
			if (this.otaResult.CurrentRom) {
				await this.enrichRomDeviceData(this.otaResult.CurrentRom, this.currentDevice);
			} else if (code && version) {
				await this.fillCurrentRomFromDeviceData(this.currentDevice, version);
			}
			if (this.otaResult.LatestRom) {
				await this.enrichRomDeviceData(this.otaResult.LatestRom, this.currentDevice);
			}
		}
	},
};
</script>
<script setup>
import { useTheme } from 'vuetify'
const route = useRoute();
const { locale } = useI18n();
const url =
	"https://data.hyperos.fans/devices/" + route.params.codename.toLowerCase() + ".json";
const { data } = await useFetch(url);
const theme = useTheme();
</script>