export default defineAppConfig({
  title: 'HyperOS.fans',
  css: ['mdui.css', '~/assets/main.css'],
  ssr: true,
  target: "static",
  components: true,
  loading: {
    color: "#155ffe",
    height: "5px",
  },
  app: {
    head: {
      charset: 'utf-8',

      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://data.miuier.com/assets/logo/favicon.ico",
        },
        {
          rel: 'stylesheet',
          href: 'https://font.sec.miui.com/font/css?family=MiSans:300,450,500,650:Chinese_Simplify,Latin&display=swap'
        }
      ]
    }
  }
})