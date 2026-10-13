<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const hasSidebar = computed(() => (
  route.path.startsWith('/guide/')
  || route.path.startsWith('/specs/')
))
const year = new Date().getUTCFullYear()
</script>

<template>
  <footer class="parity-site-footer" :class="{ 'has-sidebar': hasSidebar }">
    <div class="parity-footer-inner">
      <div class="parity-footer-lead">
        <a class="parity-footer-brand" href="/" aria-label="TestParity home">
          <img src="/brand/testparity-logo-dark.png" alt="TestParity">
        </a>
        <p>Coverage tells you what ran. Parity tells you whether the right test ran it.</p>
      </div>

      <nav class="parity-footer-nav" aria-label="Footer">
        <div>
          <h2>Learn</h2>
          <a href="/guide/getting-started">Getting started</a>
          <a href="/guide/configuration">Configuration</a>
          <a href="/guide/why-global-coverage-lies">Why global coverage lies</a>
          <a href="/guide/samples">Sample projects</a>
        </div>
        <div>
          <h2>Reference</h2>
          <a href="/guide/reference">CLI reference</a>
          <a href="/guide/ci-integration">CI integration</a>
          <a href="/guide/plugins">Plugins</a>
          <a href="/specs/">Specifications</a>
        </div>
        <div>
          <h2>Project</h2>
          <a href="https://github.com/testparity/cli">GitHub</a>
          <a href="https://packagist.org/packages/testparity/parity">Packagist</a>
          <a href="https://github.com/testparity/cli/releases">Releases</a>
          <a href="https://github.com/testparity/cli/security/policy">Security policy</a>
        </div>
      </nav>

      <p class="parity-footer-meta">© {{ year }} TestParity. Released under the MIT license.</p>
    </div>
  </footer>
</template>
