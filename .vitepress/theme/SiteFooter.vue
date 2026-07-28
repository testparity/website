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
    <div class="parity-footer-trace" aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
    </div>

    <div class="parity-footer-inner">
      <div class="parity-footer-lead">
        <a class="parity-footer-brand" href="/" aria-label="TestParity home">
          <img src="/brand/testparity-logo-dark.png" alt="TestParity">
        </a>
        <p class="parity-footer-kicker">Test coverage with ownership</p>
        <h2>Coverage tells you what ran. Parity tells you whether the right test ran it.</h2>
        <p class="parity-footer-summary">
          Map each source file to its belonging test, measure matched coverage, and make the result reviewable in CI.
        </p>

        <div class="parity-footer-command">
          <span aria-hidden="true">$</span>
          <code>composer require --dev testparity/parity</code>
          <a href="/guide/installation">Install guide</a>
        </div>
      </div>

      <nav class="parity-footer-nav" aria-label="Footer navigation">
        <div>
          <p>Learn</p>
          <a href="/guide/getting-started">Getting started</a>
          <a href="/guide/configuration">Configuration</a>
          <a href="/guide/coverage">Coverage model</a>
          <a href="/guide/samples">Sample projects</a>
        </div>
        <div>
          <p>Reference</p>
          <a href="/guide/reference">CLI reference</a>
          <a href="/specs/">Formal specs</a>
          <a href="/guide/plugins">Plugins</a>
          <a href="/guide/ci-integration">CI integration</a>
        </div>
        <div>
          <p>Project</p>
          <a href="https://github.com/testparity/cli" target="_blank" rel="noopener">GitHub</a>
          <a href="https://packagist.org/packages/testparity/parity" target="_blank" rel="noopener">Packagist</a>
          <a href="https://github.com/testparity/cli/security/policy" target="_blank" rel="noopener">Security</a>
          <a href="https://github.com/testparity" target="_blank" rel="noopener">Sample repositories</a>
        </div>
      </nav>

      <div class="parity-footer-meta">
        <span class="parity-footer-status"><i aria-hidden="true" /> Public CLI</span>
        <span>PHP 8.4+ · Composer / PHAR</span>
        <span>© {{ year }} TestParity</span>
      </div>
    </div>
  </footer>
</template>
