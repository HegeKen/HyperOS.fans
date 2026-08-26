import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const buildTime = new Date().toISOString();

export default defineNuxtConfig({
	build: {
		transpile: ["vuetify"],
	},

	css: [
		"assets/hyper.css",
		"vuetify/lib/styles/main.sass",
		"@mdi/font/css/materialdesignicons.min.css",
	],

	modules: [
		"@nuxtjs/sitemap",
		"@nuxtjs/i18n",
		"@nuxtjs/device",
		(options: any, nuxt: any) => {
			nuxt.hooks.hook("vite:extendConfig", (config: any) => {
				config.plugins.push(vuetify({ autoImport: true }));
			});
		},
	],

	runtimeConfig: {
		public: {
			miuiApiUrl: process.env.MIUI_API_URL || "https://update.miui.com",
			miuiIntlApiUrl:
				process.env.MIUI_INTL_API_URL || "https://update.intl.miui.com",
		},
	},

	i18n: {
		locales: [
			{
				code: "zh",
				name: "中文",
			},
			{
				code: "en",
				name: "English",
			},
		],
		strategy: "prefix_and_default",
		defaultLocale: "zh",
		vueI18n: "./i18n.config.ts", // if you are using custom path, default
	},

	vite: {
		/* options for vite */
		// ssr: true // enable unstable server-side rendering for development (false by default)
		// experimentWarning: false // hide experimental warning message (disabled by default for tests)
		define: {
			__BUILD_TIME__: JSON.stringify(buildTime),
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks: (id: string) => {
						if (id.includes("node_modules/.pnpm/vuetify")) return "vuetify";
						if (id.includes("node_modules/.pnpm/@mdi")) return "mdi-icons";
					},
				},
			},
			chunkSizeWarningLimit: 1000,
		},
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},

	site: {
		url: "https://hyperos.fans",
		name: "HyperOS.fans",
	},

	sitemap: {
		// 为自动扫描到的页面（如 /、/dev、/devices、/sitelog、/source、/tips/403）自动填充 lastmod
		autoLastmod: true,

		// 生产环境 SWR 缓存 1 小时（默认 10 分钟）。sitemap 数据来自本地 public/data，随部署更新，
		// 调高 TTL 可显著降低源站与序列化压力。
		cacheMaxAgeSeconds: 3600,

		// 流式序列化：按 ~64KB 分块输出 XML，避免完整 XML 字符串驻留内存。
		experimentalStreaming: true,

		// 客户端支持时流式 gzip/deflate 压缩（不支持 CompressionStream 的运行时自动降级）。
		experimentalCompression: true,

		// Nitro 启动后预热各 locale sitemap（源为本地文件，预热开销极小），首次请求不再慢。
		experimentalWarmUp: true,
	},

	compatibilityDate: "2025-05-08",
});
