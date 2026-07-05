---
layout: page
title: Ledger Landing
---

<main class="lpv lpv-ledger">
  <section class="lpv-hero two-col">
    <div>
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

  <section class="lpv-strip">
    <article><span>01</span><strong>Map</strong><p>Declare source and test folders in <code>parity.yaml</code>.</p></article>
    <article><span>02</span><strong>Attribute</strong><p>Read coverage from PHPUnit XML, Clover, or Cobertura.</p></article>
    <article><span>03</span><strong>Enforce</strong><p>Fail CI on missing tests, weak ownership, or low matched coverage.</p></article>
  </section>
</main>
