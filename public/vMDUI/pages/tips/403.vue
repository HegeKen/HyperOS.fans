<template>
  <title v-if="locale == 'en'">{{ $t('fix403') }} - HyperOS.fans</title>
  <title v-else> {{ $t('fix403') }} - HyperOS.fans</title>
  <mdui-card style="width: 99vw;align-items: center;margin-top:1vw;margin-right:1vw">
    <div style="padding-left:10px;">
      <h3>{{ $t('method1') }}</h3>
      <ol>
        <li>{{ $t('1step1') }}</li>
        <p>Windows : <code>C:\Windows\System32\drivers\etc\hosts</code><br />Linux/MacOS : <code>/etc/hosts</code></p>
        <li>
          {{ $t('1step2') }}
          <p><code>183.136.207.132 bigota.d.miui.com<br />
                   183.136.207.132 hugeota.d.miui.com</code></p>
        </li>
        <li>{{ $t('1step3') }}</li>
      </ol>
    </div>
  </mdui-card>
  <mdui-card style="width: 99vw;align-items: center;margin-top:1vw;margin-right:1vw;" v-show="locale=='zh'">
    <div style="padding-left:10px;">
      <h3>{{ $t('method2') }}</h3>
      <ol>
        <li>点击以下链接进行下载，感谢: <a href="https://www.coolapk.com/u/13562649" target="_blank">忆雨_Micles@酷安</a> 提供脚本</li>
        <p><a href="/403FixBy忆雨_V2.0.2.bat" download="/403FixBy忆雨_V2.0.2.bat">403FixBy忆雨_V2.0.2.bat</a></p>
        <li>下载完成后，双击运行该脚本，并按步骤进行操作。</li>
      </ol>
    </div>
  </mdui-card>
  <Disclamier></Disclamier>
  <Nav></Nav>
  <Analystics></Analystics>
</template>

<script setup>
const {locale} = useI18n();
</script>