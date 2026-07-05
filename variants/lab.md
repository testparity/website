---
layout: page
title: Sample Lab Landing
---

<main class="lpv lpv-lab">
  <section class="lpv-hero lab-hero">
    <div>
      <p class="pest-note">Runnable examples, not screenshots</p>
      <p class="lpv-kicker">Variation 04 / Sample Lab</p>
      <h1>Copy a working sample before you write your own config.</h1>
      <p class="lpv-lede">Parity ships with runnable examples across PHP, JavaScript, TypeScript, Rust, Laravel, Vite, and AdonisJS-style layouts. Each sample includes code, tests, coverage output, config, and expected result.</p>
      <div class="lpv-actions">
        <a href="https://github.com/testparity/samples">Browse sample repository</a>
        <a href="/guide/configuration">Configuration reference</a>
      </div>
    </div>
    <div class="sample-stack">
      <article><span>PHP</span><strong>phpunit</strong><em>attributed XML</em></article>
      <article><span>PHP</span><strong>pest</strong><em>covers() ownership</em></article>
      <article><span>JS</span><strong>jest</strong><em>Clover report</em></article>
      <article><span>JS</span><strong>mocha</strong><em>NYC output</em></article>
      <article><span>TS</span><strong>vitest</strong><em>Vite project</em></article>
      <article><span>Rust</span><strong>cargo</strong><em>Cobertura XML</em></article>
    </div>
  </section>

  <section class="pest-proof-strip" aria-label="Sample coverage">
    <span>Sample folders include</span>
    <strong>code/</strong>
    <strong>tests/</strong>
    <strong>coverage</strong>
    <strong>parity.yaml</strong>
    <strong>result.md</strong>
  </section>

  <section class="lpv-strip">
    <article><span>Included</span><strong>code/</strong><p>A minimal real application layout.</p></article>
    <article><span>Included</span><strong>parity.yaml</strong><p>The exact configuration for that stack.</p></article>
    <article><span>Included</span><strong>result.md</strong><p>The expected Parity output to compare against.</p></article>
  </section>

  <section class="lab-matrix">
    <div class="matrix-row head"><span>Sample</span><span>Runner</span><span>Coverage</span><span>What it proves</span></div>
    <div class="matrix-row"><strong>phpunit</strong><span>PHPUnit</span><span>PHPUnit XML</span><span>Attributed per-test coverage.</span></div>
    <div class="matrix-row"><strong>pest</strong><span>Pest</span><span>PHPUnit XML</span><span><code>covers()</code> ownership links.</span></div>
    <div class="matrix-row"><strong>jest</strong><span>Jest</span><span>Clover</span><span>JavaScript project structure.</span></div>
    <div class="matrix-row"><strong>mocha</strong><span>Mocha + NYC</span><span>Clover</span><span>Node coverage artifact compatibility.</span></div>
    <div class="matrix-row"><strong>vitest</strong><span>Vitest</span><span>Clover</span><span>TypeScript/Vite layout mapping.</span></div>
    <div class="matrix-row"><strong>cargo</strong><span>Rust</span><span>Cobertura</span><span>Portable non-PHP coverage reports.</span></div>
  </section>

  <section class="lab-showcase">
    <div>
      <p class="lpv-kicker">Sample anatomy</p>
      <h2>Every sample is a reproducible contract.</h2>
      <p>A sample is not a screenshot or fixture blob. It is a small application with tests, generated coverage, Parity config, and a checked-in result so regressions are obvious.</p>
    </div>
    <div class="folder-card">
      <code>samples/jest/</code>
      <span>code/</span>
      <span>coverage/clover.xml</span>
      <span>parity.yaml</span>
      <span>result.md</span>
    </div>
  </section>

  <section class="lpv-callout">
    <h2>Best when adoption depends on seeing your stack represented.</h2>
    <p>The lab style makes Parity feel practical and low-risk. It should be a strong secondary section even if another variant becomes the homepage.</p>
  </section>
</main>
