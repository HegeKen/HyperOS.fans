<template>
	<title>加密/解密测试 - HyperOS.fans</title>
	<v-app>
		<div id="top"></div>
		<Nav></Nav>

		<v-container>
			<v-row>
				<v-col cols="12">
					<v-card elevation="2">
						<v-card-title class="text-HyperBlue">🔐 加密/解密功能测试</v-card-title>
						<v-card-subtitle>测试 miEncrypt、buildHyperOSForm 和 decryptResponse 功能</v-card-subtitle>
					</v-card>
				</v-col>
			</v-row>

			<!-- Section 1: buildHyperOSForm -->
			<v-row class="mt-4">
				<v-col cols="12">
					<v-card elevation="2">
						<v-card-title class="text-HyperBlue">
							<v-icon icon="mdi-form-select" class="mr-2"></v-icon>
							1. buildHyperOSForm — 构建 OTA 请求表单
						</v-card-title>
						<v-card-text>
							<v-row>
								<v-col cols="6" md="2">
									<v-text-field v-model="formParams.code" label="code (设备代号)" variant="outlined" density="compact" placeholder="e.g. marble"></v-text-field>
								</v-col>
								<v-col cols="6" md="2">
									<v-text-field v-model="formParams.device" label="device" variant="outlined" density="compact" placeholder="e.g. marble"></v-text-field>
								</v-col>
								<v-col cols="6" md="2">
									<v-text-field v-model="formParams.version" label="version" variant="outlined" density="compact" placeholder="e.g. OS1.0.2.0.UMRCNXM"></v-text-field>
								</v-col>
								<v-col cols="6" md="2">
									<v-select v-model="formParams.region" :items="['cn', 'global']" label="region" variant="outlined" density="compact"></v-select>
								</v-col>
								<v-col cols="6" md="2">
									<v-text-field v-model="formParams.android" label="android" variant="outlined" density="compact" placeholder="e.g. 14"></v-text-field>
								</v-col>
								<v-col cols="6" md="1">
									<v-text-field v-model="formParams.b" label="b" variant="outlined" density="compact" placeholder="F"></v-text-field>
								</v-col>
								<v-col cols="6" md="1">
									<v-text-field v-model="formParams.zone" label="zone" variant="outlined" density="compact" placeholder="1"></v-text-field>
								</v-col>
							</v-row>
							<v-btn color="primary" @click="handleBuildForm" :disabled="!formParams.code || !formParams.version">
								<v-icon icon="mdi-hammer-wrench" class="mr-1"></v-icon>
								构建表单
							</v-btn>

							<v-expand-transition>
								<div v-if="builtForm !== null" class="mt-4">
									<v-divider class="mb-3"></v-divider>
									<v-label class="font-weight-bold mb-2">生成的表单 (JSON):</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-2">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap;">{{ JSON.stringify(builtForm, null, 2) }}</pre>
									</v-card>
									<v-btn color="success" size="small" class="mt-2" @click="handleEncryptFromForm">
										<v-icon icon="mdi-lock" class="mr-1"></v-icon>
										加密此表单
									</v-btn>
								</div>
							</v-expand-transition>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<!-- Section 2: miEncrypt -->
			<v-row class="mt-4">
				<v-col cols="12">
					<v-card elevation="2">
						<v-card-title class="text-HyperBlue">
							<v-icon icon="mdi-lock" class="mr-2"></v-icon>
							2. miEncrypt — 加密 JSON 数据
						</v-card-title>
						<v-card-text>
							<v-textarea v-model="encryptInput" label="输入 JSON 对象" variant="outlined" rows="6" placeholder='{"d": "marble", "b": "F", ...}' clearable></v-textarea>
							<v-btn color="primary" @click="handleEncrypt" :disabled="!encryptInput.trim()">
								<v-icon icon="mdi-lock" class="mr-1"></v-icon>
								加密
							</v-btn>

							<v-expand-transition>
								<div v-if="encryptResult !== null" class="mt-4">
									<v-divider class="mb-3"></v-divider>
									<v-label class="font-weight-bold mb-2">加密结果:</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-2">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap; word-break: break-all;">{{ encryptResult }}</pre>
									</v-card>
									<v-btn color="warning" size="small" class="mt-2" @click="handleDecryptFromEncrypt">
										<v-icon icon="mdi-lock-open-variant" class="mr-1"></v-icon>
										解密验证
									</v-btn>
								</div>
							</v-expand-transition>

							<v-alert v-if="encryptError" type="error" variant="tonal" class="mt-3" closable @click:close="encryptError = ''">
								{{ encryptError }}
							</v-alert>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<!-- Section 3: decryptResponse -->
			<v-row class="mt-4">
				<v-col cols="12">
					<v-card elevation="2">
						<v-card-title class="text-HyperBlue">
							<v-icon icon="mdi-lock-open-variant" class="mr-2"></v-icon>
							3. decryptResponse — 解密 & 请求 API
						</v-card-title>
						<v-card-text>
							<v-textarea v-model="decryptInput" label="输入加密后的文本" variant="outlined" rows="4" placeholder="输入 miEncrypt 加密后的结果..." clearable></v-textarea>
							<v-btn color="primary" @click="handleDecrypt" :disabled="!decryptInput.trim()" class="mr-2">
								<v-icon icon="mdi-lock-open-variant" class="mr-1"></v-icon>
								解密
							</v-btn>
							<v-btn color="orange-darken-2" @click="handleApiRequest" :disabled="!decryptInput.trim()" :loading="apiLoading">
								<v-icon icon="mdi-api" class="mr-1"></v-icon>
								请求 API
							</v-btn>

							<!-- 本地解密结果 -->
							<v-expand-transition>
								<div v-if="decryptResult !== null" class="mt-4">
									<v-divider class="mb-3"></v-divider>
									<v-label class="font-weight-bold mb-2">解密结果 (JSON):</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-2">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap;">{{ JSON.stringify(decryptResult, null, 2) }}</pre>
									</v-card>
								</div>
							</v-expand-transition>

							<v-alert v-if="decryptError" type="error" variant="tonal" class="mt-3" closable @click:close="decryptError = ''">
								{{ decryptError }}
							</v-alert>

							<!-- API 请求结果 -->
							<v-expand-transition>
								<div v-if="apiResult !== null" class="mt-4">
									<v-divider class="mb-3"></v-divider>
									<v-label class="font-weight-bold mb-2">API 响应结果:</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-2">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap;">{{ JSON.stringify(apiResult, null, 2) }}</pre>
									</v-card>
									<v-chip v-if="apiResult.success" color="success" class="mt-2">
										<v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
										API 请求成功
									</v-chip>
									<v-chip v-else color="error" class="mt-2">
										<v-icon icon="mdi-close-circle" class="mr-1"></v-icon>
										API 请求失败
									</v-chip>
								</div>
							</v-expand-transition>

							<v-alert v-if="apiError" type="error" variant="tonal" class="mt-3" closable @click:close="apiError = ''">
								{{ apiError }}
							</v-alert>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<!-- Section 4: Full OTA Test -->
			<v-row class="mt-4 mb-4">
				<v-col cols="12">
					<v-card elevation="2">
						<v-card-title class="text-HyperBlue">
							<v-icon icon="mdi-test-tube" class="mr-2"></v-icon>
							4. 完整流程测试 (构建 → 加密 → 解密)
						</v-card-title>
						<v-card-text>
							<v-btn color="success" @click="handleFullTest" :disabled="!formParams.code || !formParams.version">
								<v-icon icon="mdi-play" class="mr-1"></v-icon>
								执行完整流程
							</v-btn>

							<v-expand-transition>
								<div v-if="fullTestResult" class="mt-4">
									<v-divider class="mb-3"></v-divider>

									<v-label class="font-weight-bold mb-2">步骤 1 - 构建的表单:</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-1">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap;">{{ JSON.stringify(fullTestResult.form, null, 2) }}</pre>
									</v-card>

									<v-label class="font-weight-bold mt-3 mb-2">步骤 2 - 加密结果:</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-1">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap; word-break: break-all;">{{ fullTestResult.encrypted }}</pre>
									</v-card>

									<v-label class="font-weight-bold mt-3 mb-2">步骤 3 - 解密验证:</v-label>
									<v-card variant="outlined" class="bg-grey-darken-4 mt-1">
										<pre class="pa-3 text-caption" style="overflow-x: auto; white-space: pre-wrap;">{{ JSON.stringify(fullTestResult.decrypted, null, 2) }}</pre>
									</v-card>

									<v-chip v-if="fullTestResult.match" color="success" class="mt-2">
										<v-icon icon="mdi-check-circle" class="mr-1"></v-icon>
										加解密一致 ✅
									</v-chip>
									<v-chip v-else color="error" class="mt-2">
										<v-icon icon="mdi-close-circle" class="mr-1"></v-icon>
										加解密不一致 ❌
									</v-chip>
								</div>
							</v-expand-transition>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<Space></Space>
		<Footer></Footer>
	</v-app>
</template>

<script lang="ts">
export default {
	data() {
		return {
			// buildHyperOSForm params
			formParams: {
				code: 'marble',
				device: 'marble',
				version: 'OS1.0.2.0.UMRCNXM',
				region: 'cn',
				android: '14',
				b: 'F',
				zone: '1',
			},
			builtForm: null as Record<string, any> | null,

			// miEncrypt
			encryptInput: '',
			encryptResult: null as string | null,
			encryptError: '',

			// decryptResponse
			decryptInput: '',
			decryptResult: null as Record<string, any> | null,
			decryptError: '',

			// API request
			apiLoading: false,
			apiResult: null as Record<string, any> | null,
			apiError: '',

			// Full test
			fullTestResult: null as {
				form: Record<string, any>
				encrypted: string
				decrypted: Record<string, any>
				match: boolean
			} | null,
		}
	},
	methods: {
		handleBuildForm() {
			try {
				const p = this.formParams
				this.builtForm = buildHyperOSForm(p.code, p.device, p.version, p.region, p.android, p.b, p.zone)
			} catch (e: any) {
				this.builtForm = null
				alert('构建表单失败: ' + e.message)
			}
		},
		handleEncryptFromForm() {
			if (!this.builtForm) return
			try {
				this.encryptInput = JSON.stringify(this.builtForm, null, 2)
				this.handleEncrypt()
			} catch (e: any) {
				this.encryptError = '加密失败: ' + e.message
			}
		},
		handleEncrypt() {
			this.encryptError = ''
			this.encryptResult = null
			try {
				const parsed = JSON.parse(this.encryptInput.trim())
				this.encryptResult = miEncrypt(parsed)
			} catch (e: any) {
				this.encryptError = 'JSON 解析失败: ' + e.message
			}
		},
		handleDecryptFromEncrypt() {
			if (!this.encryptResult) return
			this.decryptInput = this.encryptResult
			this.handleDecrypt()
		},
		handleDecrypt() {
			this.decryptError = ''
			this.decryptResult = null
			try {
				const result = decryptResponse(this.decryptInput.trim())
				if (result === null) {
					this.decryptError = '解密失败，请检查输入是否正确'
				} else {
					this.decryptResult = result
				}
			} catch (e: any) {
				this.decryptError = '解密失败: ' + e.message
			}
		},
		async handleApiRequest() {
			this.apiError = ''
			this.apiResult = null
			this.apiLoading = true
			try {
				const response = await fetch('/api/ota', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						data: this.decryptInput.trim(),
						region: 'CN',
					}),
				})
				const result = await response.json()
				this.apiResult = result
			} catch (e: any) {
				this.apiError = 'API 请求失败: ' + e.message
			} finally {
				this.apiLoading = false
			}
		},
		handleFullTest() {
			try {
				const p = this.formParams
				const form = buildHyperOSForm(p.code, p.device, p.version, p.region, p.android, p.b, p.zone)
				const encrypted = miEncrypt(form)
				const decrypted = decryptResponse(encrypted)

				const match = JSON.stringify(form) === JSON.stringify(decrypted)

				this.fullTestResult = { form, encrypted, decrypted, match }
			} catch (e: any) {
				alert('完整流程测试失败: ' + e.message)
			}
		},
	},
}
</script>

<script setup lang="ts">
import { miEncrypt, decryptResponse, buildHyperOSForm } from '~/composables/useCrypto'
</script>
