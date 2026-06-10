import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

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

	devServer: {
		proxy: {
			"/api/miui": {
				target: "https://update.miui.com",
				changeOrigin: true,
				pathRewrite: { "^/api/miui": "" },
			},
			"/api/miui-intl": {
				target: "https://update.intl.miui.com",
				changeOrigin: true,
				pathRewrite: { "^/api/miui-intl": "" },
			},
		},
	},

	runtimeConfig: {
		public: {
			miuiApiUrl: process.env.MIUI_API_URL || "https://update.miui.com",
			miuiIntlApiUrl: process.env.MIUI_INTL_API_URL || "https://update.intl.miui.com",
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
		build: {},
		vue: {
			template: {
				transformAssetUrls,
			},
		},
	},

	site: {
		url: "https://hyperos.fans",
	},

	compatibilityDate: "2025-05-08",
});
