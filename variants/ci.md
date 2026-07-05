---
layout: page
title: CI Landing
---

<main class="lpv lpv-ci">
  <section class="lpv-hero ci-hero">
    <div>
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

  <section class="ci-flow">
    <article><span>Push</span><p>Native tests produce coverage.</p></article>
    <article><span>Check</span><p>Parity links source files to tests.</p></article>
    <article><span>Block</span><p>CI fails on missing or weak matched coverage.</p></article>
    <article><span>Review</span><p>JSON names the exact rule and file.</p></article>
  </section>
</main>
