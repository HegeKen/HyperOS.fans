<template>
  <title v-if="lang == 'en'">{{ $t('fix403') }} - HyperOS.fans</title>
  <title v-else> {{ $t('fix403') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;">
      <h3>{{ $t('method1') }}</h3>
      <ol>
        <li>{{ $t('1step1') }}</li>
        <ul>
          <li>Windows : <code>C:\Windows\System32\drivers\etc\hosts</code></li>
          <li>Linux/MacOS : <code>/etc/hosts</code></li>
        </ul>
        <br />
        <li>
          {{ $t('1step2') }}
          <p><code>123.6.13.6 bigota.d.miui.com<br />
                   123.6.13.6 hugeota.d.miui.com</code></p>
        </li>
        <li>{{ $t('1step3') }}</li>
      </ol>
    </div>
  </mdui-card>
  <mdui-card style="width: 99vw;align-items: center;margin-top:1vw;margin-right:1vw;display:none;">
    <div style="padding-left:10px;">
      <h3>{{ $t('method2') }}</h3>
      <ol>
        <li>{{ $t('2step1') }}</li>
        <ul>
          <li>Windows : <code>C:\Windows\System32\drivers\etc\hosts</code></li>
          <li>Linux/MacOS : <code>/etc/hosts</code></li>
        </ul>
        <br />
        <li>
          {{ $t('2step2') }}
          <p><code>123.6.13.6 bigota.d.miui.com<br />
                   123.6.13.6 hugeota.d.miui.com</code></p>
        </li>
        <li>{{ $t('2step3') }}</li>
      </ol>
    </div>
  </mdui-card>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
</template>

<script setup>
const locale = useI18n()
const lang = locale.locale.value
</script>