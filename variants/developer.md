---
layout: page
title: Developer Landing
---

<main class="lpv lpv-dev">
  <section class="lpv-hero split-console">
    <div>
      <p class="lpv-kicker">Variation 02 / Developer</p>
      <h1>Add a file-owned coverage gate in one config file.</h1>
      <p class="lpv-lede">Install Parity, point it at your existing coverage artifact, and ask the only local question that matters: did the belonging test meaningfully cover this file?</p>
      <div class="lpv-actions">
        <a href="/guide/installation">Install Parity</a>
        <a href="https://github.com/testparity/samples">Open samples</a>
      </div>
    </div>
    <div class="lpv-terminal">
      <div class="lpv-panel-head"><span>terminal</span><code>quickstart</code></div>
      <pre><code>composer require --dev testparity/parity&#10;php vendor/bin/parity init&#10;&#10;XDEBUG_MODE=coverage ./vendor/bin/pest \&#10;  --coverage-phpunit=coverage.xml&#10;&#10;php vendor/bin/parity check --format=json</code></pre>
    </div>
  </section>

  <section class="lpv-codegrid">
    <div class="lpv-terminal">
      <div class="lpv-panel-head"><span>parity.yaml</span><code>minimum</code></div>
      <pre><code>structure:&#10;  - name: Services&#10;    paths:&#10;      source: app/Services&#10;      test: tests/Unit/Services&#10;    rules:&#10;      - test-exists&#10;      - matched-coverage:&#10;          min: 70</code></pre>
    </div>
    <div class="lpv-panel">
      <h2>Designed not to replace your runner.</h2>
      <p>Parity runs after Pest, PHPUnit, Jest, Mocha, Vitest, or Cargo has produced coverage. It reads the artifact and checks structure, ownership, and matched coverage.</p>
      <ul>
        <li>Deterministic exit codes for CI</li>
        <li>JSON for automation</li>
        <li>Table output for local review</li>
      </ul>
    </div>
  </section>
</main>
