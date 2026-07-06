---
layout: page
title: Ledger Landing
---

<main class="lpv lpv-ledger">
  <section class="lpv-hero two-col">
    <div>
      <p class="pest-note">New: matched coverage for the test that owns the file</p>
      <p class="lpv-kicker">Variation 01 / Ledger</p>
      <h1>Coverage, reconciled file by file.</h1>
      <p class="lpv-lede">Parity turns every source file and its belonging test into a reviewable ledger. Global coverage can pass while ownership is weak; matched coverage shows whether the right test covered the right file.</p>
      <div class="lpv-actions">
        <a href="/guide/getting-started">Read the quickstart</a>
        <a href="/guide/coverage">Matched coverage guide</a>
      </div>
    </div>
    <div class="lpv-panel ledger-panel">
      <div class="lpv-panel-head"><span>parity check</span><code>Services</code></div>
      <div class="ledger-line head"><span>Source</span><span>Belonging test</span><span>Matched</span></div>
      <div class="ledger-line"><code>InvoiceTotal.php</code><code>InvoiceTotalTest.php</code><strong>91%</strong></div>
      <div class="ledger-line"><code>Slugger.php</code><code>SluggerTest.php</code><strong>100%</strong></div>
      <div class="ledger-line risk"><code>CheckoutGateway.php</code><code>CheckoutGatewayTest.php</code><strong>18%</strong></div>
      <p>Fails because the file’s own test only covers 18%, even though project coverage is 88%.</p>
    </div>
  </section>

  <section class="pest-proof-strip" aria-label="Supported coverage workflow">
    <span>Works after your tests run</span>
    <strong>PHPUnit XML</strong>
    <strong>Parity JSON</strong>
    <strong>Clover XML</strong>
    <strong>Cobertura XML</strong>
    <strong>JSON output</strong>
  </section>

  <section class="lpv-strip">
    <article><span>01</span><strong>Map</strong><p>Declare source and test folders in <code>parity.yaml</code>.</p></article>
    <article><span>02</span><strong>Attribute</strong><p>Read coverage from Parity JSON, PHPUnit XML, Clover, or Cobertura.</p></article>
    <article><span>03</span><strong>Enforce</strong><p>Fail CI on missing tests, weak ownership, or low matched coverage.</p></article>
  </section>

  <section class="ledger-audit">
    <div>
      <p class="lpv-kicker">Audit trail</p>
      <h2>Every row explains what a reviewer should do next.</h2>
      <p>Instead of sending a contributor to a global coverage dashboard, Parity keeps the conversation local: the source file, the test that should own it, the policy it failed, and the measured matched coverage.</p>
    </div>
    <div class="audit-steps">
      <article><span>Source</span><strong>app/Services/CheckoutGateway.php</strong><em>The application file under review.</em></article>
      <article><span>Owner</span><strong>tests/Unit/Services/CheckoutGatewayTest.php</strong><em>The expected belonging test path.</em></article>
      <article><span>Rule</span><strong>matched-coverage min 70</strong><em>The policy that decides release readiness.</em></article>
      <article><span>Action</span><strong>Add focused gateway scenarios</strong><em>Fix local coverage, not unrelated project coverage.</em></article>
    </div>
  </section>

  <section class="coverage-compare">
    <div>
      <span>Global coverage</span>
      <strong>88%</strong>
      <p>Looks safe when all tests are blended together.</p>
    </div>
    <div class="selected">
      <span>Matched coverage</span>
      <strong>18%</strong>
      <p>Shows the belonging test barely exercised its file.</p>
    </div>
    <div>
      <span>Release decision</span>
      <strong>Blocked</strong>
      <p>Prevents accidental coverage from hiding weak ownership.</p>
    </div>
  </section>

  <section class="lpv-callout">
    <h2>Best when the homepage needs to explain the category in one screen.</h2>
    <p>The ledger style makes Parity feel like infrastructure: precise, auditable, and easy to hand to engineering leadership or DevOps. It should be the base direction if the homepage needs to be credible before it is playful.</p>
  </section>
</main>
