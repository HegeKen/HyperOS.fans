<template>
  <div v-if="$device.isDesktopOrTablet">

  </div>
  <div v-else>
    <div class="mdui-toolbar">
      <div><a href="javascript:;" class="mdui-btn mdui-btn-icon" mdui-drawer="{target:'#main-drawer', swipe: true}" mdui-drawer-open>
          <i class="mdui-icon material-icons">menu</i>
        </a>
      <span class="mdui-typo-title">Hyper<span class="HyperBlue">OS</span>.fans</span></div>
    </div>
    <div class="mdui-drawer mdui-drawer-close mdui-drawer-left mdui-text-color-black-text" id="main-drawer">
      Hello there
    </div>
  </div>
</template>
<script setup>
</script>