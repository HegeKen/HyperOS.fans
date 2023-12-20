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
      meta: [
        { name: "baidu-site-verification", content: "codeva-AXUJixvVZA" },
        { name: 'msvalidate.01', content: 'D0A12F85D732BE57318CA28F52500432' }
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://data.miuier.com/assets/logo/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://at.alicdn.com/t/c/font_2478867_iq2uuq05ql.css",
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,500,600:Chinese_Simplify,Latin&display=swap'
        }
      ]
    }
  }
})