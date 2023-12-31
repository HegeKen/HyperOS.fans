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
          {{ $t('1step2-1') }}   
          <p><v-code>47.74.196.250 bigota.d.miui.com<br />
                     47.74.196.250 hugeota.d.miui.com</v-code></p>
          {{ $t('1step2-1') }}   
          <p><v-code>110.43.121.13 bigota.d.miui.com<br />
                     110.43.121.13 hugeota.d.miui.com</v-code></p>
          {{ $t('1step2-1') }}   
          <p><v-code>110.43.121.249 bigota.d.miui.com<br />
                     110.43.121.249 hugeota.d.miui.com</v-code></p>
          {{ $t('1step2-1') }}   
          <p><v-code>123.6.13.6 bigota.d.miui.com<br />
                     123.6.13.6 hugeota.d.miui.com</v-code></p>
          {{ $t('1step2-1') }}   
          <p><v-code>183.36.23.4 bigota.d.miui.com<br />
                     183.36.23.4 hugeota.d.miui.com</v-code></p>
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
        <li>{{ $t('2step1-1') }} <a href="https://www.coolapk.com/u/13562649" target="_blank">忆雨_Micles@酷安</a>{{ $t('2step1-2') }}</li>
        <p><a href="/403FixBy忆雨_V2.3.0.zip" download="/403FixBy忆雨_V2.3.0.zip">403FixBy忆雨_V2.3.0.zip</a></p>
        <li>{{ $t('2step2-1') }}<v-code>403FixBy忆雨_V2.3.0.bat</v-code>{{ $t('2step2-2') }}</li>
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