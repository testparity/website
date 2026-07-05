---
layout: page
title: CI Landing
---

<main class="lpv lpv-ci">
  <section class="lpv-hero ci-hero">
    <div>
      <p class="pest-note">Beautiful failures for test ownership</p>
      <p class="lpv-kicker">Variation 05 / CI Room</p>
      <h1>Make weak test ownership fail before merge.</h1>
      <p class="lpv-lede">Parity gives CI a concrete release rule: every application file must have its belonging test, and that test must cover enough of the file to count.</p>
      <div class="lpv-actions">
        <a href="/guide/ci-integration">CI integration</a>
        <a href="/guide/rules">Rule reference</a>
      </div>
    </div>
    <div class="incident-card">
      <span class="status-pill">Blocked</span>
      <h2>CheckoutGateway.php</h2>
      <p><code>CheckoutGatewayTest.php</code> exists, but matched coverage is below policy.</p>
      <div class="incident-meter"><i style="width:18%"></i><strong>18% / 70%</strong></div>
      <small>Fix by testing the gateway behavior in the belonging test, not by raising unrelated global coverage.</small>
    </div>
  </section>

  <section class="pest-proof-strip" aria-label="CI outputs">
    <span>Designed for pull requests</span>
    <strong>Exit codes</strong>
    <strong>JSON</strong>
    <strong>Tables</strong>
    <strong>Exact file paths</strong>
  </section>

  <section class="ci-flow">
    <article><span>Push</span><p>Native tests produce coverage.</p></article>
    <article><span>Check</span><p>Parity links source files to tests.</p></article>
    <article><span>Block</span><p>CI fails on missing or weak matched coverage.</p></article>
    <article><span>Review</span><p>JSON names the exact rule and file.</p></article>
  </section>

  <section class="ci-room">
    <div class="ci-log">
      <div class="lpv-panel-head"><span>github actions</span><code>parity</code></div>
      <pre><code>Run php vendor/bin/parity check --format=json&#10;&#10;Services: 2 passed, 1 failed&#10;&#10;FAIL app/Services/CheckoutGateway.php&#10;  expected test: tests/Unit/Services/CheckoutGatewayTest.php&#10;  matched coverage: 18%&#10;  required: 70%&#10;&#10;Error: Process completed with exit code 1.</code></pre>
    </div>
    <div>
      <p class="lpv-kicker">Reviewer experience</p>
      <h2>CI should say what changed, where, and why it cannot ship.</h2>
      <p>Parity turns weak test ownership into a concrete release failure. The author can fix the belonging test directly instead of chasing an abstract quality score.</p>
    </div>
  </section>

  <section class="ci-policies">
    <article><span>Required</span><strong>test-exists</strong><p>Every application file maps to a belonging test file.</p></article>
    <article><span>Optional</span><strong>covers-class</strong><p>PHPUnit attributes or Pest covers declarations prove ownership intent.</p></article>
    <article><span>Required</span><strong>matched-coverage</strong><p>The belonging test covers enough executable lines in its file.</p></article>
  </section>

  <section class="lpv-callout">
    <h2>Best for teams already bought into release gates.</h2>
    <p>The CI room style is sharper and more operational. It works well for DevOps and platform audiences, but should be paired with a clearer product explanation for first-time visitors.</p>
  </section>
</main>
