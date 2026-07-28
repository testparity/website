<script setup lang="ts">
withDefaults(defineProps<{
  mobile?: boolean
}>(), {
  mobile: false,
})
</script>

<template>
  <div class="parity-header-install" :class="{ 'is-mobile': mobile }">
    <span v-if="mobile" class="parity-header-install-label">Start with the CLI</span>
    <a href="/guide/installation" aria-label="Install the Parity CLI">
      <span class="parity-header-prompt" aria-hidden="true">$</span>
      <span>Install CLI</span>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M3.5 8h8M8.5 4.5 12 8l-3.5 3.5" />
      </svg>
    </a>
  </div>
</template>
