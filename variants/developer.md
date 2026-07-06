---
layout: page
title: Developer Landing
---

<main class="lpv lpv-dev">
  <section class="lpv-hero split-console">
    <div>
      <p class="pest-note">Drop-in CLI for coverage ownership checks</p>
      <p class="lpv-kicker">Variation 02 / Developer</p>
      <h1>Add a file-owned coverage gate in one config file.</h1>
      <p class="lpv-lede">Install Parity, point it at your existing coverage artifact, and ask the only local question that matters: did the belonging test meaningfully cover this file?</p>
      <div class="lpv-actions">
        <a href="/guide/installation">Install Parity</a>
        <a href="/guide/samples">Open samples</a>
      </div>
    </div>
    <div class="lpv-terminal">
      <div class="lpv-panel-head"><span>terminal</span><code>quickstart</code></div>
      <pre><code>composer require --dev testparity/parity&#10;php vendor/bin/parity init&#10;&#10;XDEBUG_MODE=coverage ./vendor/bin/pest \&#10;  --coverage-xml=coverage-xml \&#10;  --coverage-clover=clover.xml&#10;&#10;php vendor/bin/parity check --format=json</code></pre>
    </div>
  </section>

  <section class="pest-proof-strip" aria-label="Developer workflow">
    <span>Runs with your stack</span>
    <strong>Pest</strong>
    <strong>PHPUnit</strong>
    <strong>Jest</strong>
    <strong>Mocha</strong>
    <strong>Vitest</strong>
  </section>

  <section class="lpv-codegrid">
    <div class="lpv-terminal">
      <div class="lpv-panel-head"><span>parity.yaml</span><code>minimum</code></div>
      <pre><code>structure:&#10;  - name: Services&#10;    paths:&#10;      source: app/Services&#10;      test: tests/Unit/Services&#10;    rules:&#10;      - test-exists&#10;      - matched-coverage:&#10;          min: 70</code></pre>
    </div>
    <div class="lpv-panel">
      <h2>Designed not to replace your runner.</h2>
      <p>Parity runs after Pest, PHPUnit, Jest, Mocha, Vitest, Cargo, or another runner has produced coverage. It reads Parity JSON, PHPUnit XML, Clover XML, or Cobertura XML and checks structure, ownership, and matched coverage when attribution is available.</p>
      <ul>
        <li>Deterministic exit codes for CI</li>
        <li>JSON for automation</li>
        <li>Table output for local review</li>
      </ul>
    </div>
  </section>

  <section class="developer-flow">
    <article>
      <span>1</span>
      <strong>Keep your test runner</strong>
      <p>Use Pest, PHPUnit, Jest, Mocha, Vitest, Cargo, or your existing runner exactly as before. Parity only needs a supported coverage file or an attribution converter.</p>
    </article>
    <article>
      <span>2</span>
      <strong>Model ownership</strong>
      <p>Declare where application files live, where belonging tests live, and which rule minimums should block a merge.</p>
    </article>
    <article>
      <span>3</span>
      <strong>Read the failure</strong>
      <p>The output points to the exact source/test pair instead of asking the author to interpret a global percentage.</p>
    </article>
  </section>

  <section class="lpv-codegrid reverse">
    <div class="lpv-panel">
      <h2>Output designed for scripts and humans.</h2>
      <p>Local runs can use table output. CI can ingest JSON and annotate the pull request with file-level accountability.</p>
      <ul>
        <li><code>passed</code> for release state</li>
        <li><code>source</code> and <code>test</code> for the exact pair</li>
        <li><code>rules</code> for policy-specific values</li>
      </ul>
    </div>
    <div class="lpv-terminal">
      <div class="lpv-panel-head"><span>json</span><code>failure</code></div>
      <pre><code>{&#10;  "source": "app/Services/CheckoutGateway.php",&#10;  "test": "tests/Unit/Services/CheckoutGatewayTest.php",&#10;  "rules": {&#10;    "matched-coverage": {&#10;      "value": "18%",&#10;      "min": "70%",&#10;      "passed": false&#10;    }&#10;  }&#10;}</code></pre>
    </div>
  </section>

  <section class="developer-commands">
    <article><code>php vendor/bin/parity list</code><span>Preview source/test pairs before enforcing.</span></article>
    <article><code>php vendor/bin/parity check</code><span>Run the release gate locally or in CI.</span></article>
    <article><code>php vendor/bin/parity check --format=json</code><span>Emit machine-readable failures.</span></article>
  </section>
</main>
