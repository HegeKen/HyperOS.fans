<template>
  <div v-if="$device.isDesktopOrTablet">
    <v-footer class="text-center">
      <v-col class="text-center">
        2023 - {{ new Date().getFullYear() }} | Hyper<span class="text-HyperBlue">OS</span>.fans
        | {{ $t('disclaimerlong') }}
        |
        <a
          href="https://www.helilab.cn/"
          target="_blank"
          rel="noopener"
          class="helilab-link"
          :aria-label="$t('helilab')"
        >
          <v-icon size="0.9em" class="helilab-icon">mdi-flask-outline</v-icon>{{ $t('helilab') }}
        </a>
      </v-col>
    </v-footer>
    <!-- PC Disclaimer -->
  </div>
  <div v-else>
    <v-footer class="text-center">
      <v-col class="text-center">
        2023 - {{ new Date().getFullYear() }} | Hyper<span class="text-HyperBlue">OS</span>.fans
        | {{ $t('disclaimer') }}
        |
        <a
          href="https://www.helilab.cn/"
          target="_blank"
          rel="noopener"
          class="helilab-link"
          :aria-label="$t('helilab')"
        >
          <v-icon size="0.9em" class="helilab-icon">mdi-flask-outline</v-icon>{{ $t('helilab') }}
        </a>
      </v-col>
    </v-footer>
    <!-- Mobile Disclaimer -->
  </div>
  <Analystics></Analystics>
</template>

<script>
export default {
  data() {
    return {
      drawer: null,
    }
  },
}
</script>
<script setup>

const { locale, locales } = useI18n()
</script>

<style scoped>
.helilab-link {
  white-space: nowrap;
}
.helilab-icon {
  vertical-align: -0.12em;
  margin-inline-end: 2px;
}
.helilab-link:hover .helilab-icon {
  transform: translateY(-1px);
  transition: transform 0.15s ease;
}
</style>
