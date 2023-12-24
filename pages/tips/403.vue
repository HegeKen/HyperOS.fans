<template>
  <title v-if="lang == 'en'">{{ $t('fix403') }} - HyperOS.fans</title>
  <title v-else> {{ $t('fix403') }} - HyperOS.fans</title>
  <v-app>
    <Nav></Nav>
    <Space></Space>
    <v-card elevation="2">
    <v-card-title>{{ $t('method1') }}</v-card-title>
    <div>
      <ol style="padding-left:40px;">
        <li>{{ $t('1step1') }}</li>
        <span>Windows : <v-code>C:\Windows\System32\drivers\etc\hosts</v-code>
          Linux/MacOS : <v-code>/etc/hosts</v-code></span>
        <li>
          {{ $t('1step2') }}
          <p><v-code>183.136.207.132 bigota.d.miui.com<br />
                   183.136.207.132 hugeota.d.miui.com</v-code></p>
        </li>
        <li>{{ $t('1step3') }}</li>
      </ol>
    </div>
  </v-card>
  <Space></Space>
  <v-card  elevation="2">
    <v-card-title>{{ $t('method2') }}</v-card-title>
    <div>
      <ol style="padding-left:40px;">
        <li>点击以下链接进行下载，感谢: <a href="https://www.coolapk.com/u/13562649" target="_blank">忆雨_Micles@酷安</a> 提供脚本</li>
        <p><a href="/403FixBy忆雨_V2.0.3.zip" download="/403FixBy忆雨_V2.0.3.zip">403FixBy忆雨_V2.0.3.zip</a></p>
        <li>下载完成后，双击运行该脚本，并按步骤进行操作。</li>
      </ol>
    </div>
  </v-card>
  <Space></Space>
  <Footer></Footer>
  </v-app>
</template>

<script setup>
const locale = useI18n()
const lang = locale.locale.value
</script>