<script setup lang="ts">
withDefaults(defineProps<{
  mobile?: boolean
}>(), {
  mobile: false,
})
</script>

<template>
  <div class="parity-header-install" :class="{ 'is-mobile': mobile }">
    <a href="/guide/installation">Install Parity</a>
  </div>
</template>
