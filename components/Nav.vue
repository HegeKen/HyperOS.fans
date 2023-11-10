<script setup>
import '~/assets/hyper.css'
import 'mdui/mdui.css';
import 'mdui';
const locale = useLocale()
const route = useRoute()
var lang = route.query.lang
if (lang == undefined || lang == "") {
  lang = locale
} else if (lang == locale) { }
else {
}
</script>
<template>
  <div v-if="lang == 'zh-CN'">
    <div class="example-alignment" style="position: relative">
    <mdui-navigation-rail alignment="start" contained>
      <mdui-navigation-rail-item icon="watch_later">最近</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="image">图片</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="library_music">乐库</mdui-navigation-rail-item>
    </mdui-navigation-rail>
    <div><slot></slot></div>
  </div>
  </div>
  <div v-if="lang == 'en-US'">
    <div class="example-alignment" style="position: relative">
    <mdui-navigation-rail alignment="start" contained>
      <mdui-navigation-rail-item icon="watch_later">Recent</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="image">Images</mdui-navigation-rail-item>
      <mdui-navigation-rail-item icon="library_music">Library</mdui-navigation-rail-item>
    </mdui-navigation-rail>
    <div><slot></slot></div>
  </div>
  </div>
  <div v-else>
  </div>
</template>