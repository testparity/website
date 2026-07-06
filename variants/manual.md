---
layout: page
title: Manual Landing
---

<main class="lpv lpv-manual">
  <section class="lpv-hero manual-hero">
    <p class="pest-note">Documentation-first release gate</p>
    <p class="lpv-kicker">Variation 03 / Manual</p>
    <h1>The operating manual for test parity.</h1>
    <p class="lpv-lede">A documentation-first release gate for teams that need every application file to have an obvious test, ownership declaration, and matched coverage threshold.</p>
  </section>

  <section class="pest-proof-strip" aria-label="Documentation map">
    <span>Read in order</span>
    <strong>Install</strong>
    <strong>Configure</strong>
    <strong>Measure</strong>
    <strong>Enforce</strong>
  </section>

  <section class="manual-board">
    <a href="/guide/getting-started"><span>Start</span><strong>Run the 5-minute setup</strong><em>Create <code>parity.yaml</code>, generate coverage, run the first check.</em></a>
    <a href="/guide/configuration"><span>Configure</span><strong>Model your repository</strong><em>Map folders, suffixes, namespaces, exceptions, and minimums.</em></a>
    <a href="/guide/coverage"><span>Understand</span><strong>Read matched coverage</strong><em>See when coverage came from the belonging test versus incidental execution.</em></a>
    <a href="/guide/ci-integration"><span>Enforce</span><strong>Wire the gate into CI</strong><em>Use exit codes and JSON output to block weak test architecture.</em></a>
  </section>

  <section class="lpv-callout">
    <h2>Built for handoff.</h2>
    <p>Every failure names the source file, expected test file, rule, actual value, and threshold. A DevOps engineer can wire it into CI without knowing the application domain.</p>
  </section>

  <section class="manual-chapters">
    <article>
      <span>Chapter 01</span>
      <h2>Installation paths</h2>
      <p>Composer for PHP projects, PHAR for portable CI, and local binary usage for sample applications.</p>
      <a href="/guide/installation">Open installation</a>
    </article>
    <article>
      <span>Chapter 02</span>
      <h2>Repository model</h2>
      <p>Structure blocks describe source folders, test folders, file suffixes, explicit maps, and namespace behavior.</p>
      <a href="/guide/configuration">Open configuration</a>
    </article>
    <article>
      <span>Chapter 03</span>
      <h2>Coverage semantics</h2>
      <p>Documentation distinguishes global coverage, minimum file coverage, and matched coverage from the belonging test.</p>
      <a href="/guide/coverage">Open coverage</a>
    </article>
  </section>

  <section class="manual-reference">
    <div>
      <p class="lpv-kicker">Handoff package</p>
      <h2>What a DevOps engineer needs before deployment.</h2>
    </div>
    <ul>
      <li><strong>Entry point</strong><span><code>php vendor/bin/parity check --format=json</code></span></li>
      <li><strong>Required artifact</strong><span>Parity JSON, PHPUnit XML, Clover XML, or Cobertura XML coverage report.</span></li>
      <li><strong>Config file</strong><span><code>parity.yaml</code> committed at the repository root.</span></li>
      <li><strong>Failure behavior</strong><span>Non-zero exit when required rules fail.</span></li>
    </ul>
  </section>
</main>
