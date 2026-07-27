---
layout: home

hero:
  name: Parity
  text: Know the test that owns the file.
  tagline: "A release gate for matched coverage: connect each production file to its belonging test, then prove the relationship in CI."
  image:
    src: /brand/parity-trace-panel.svg
    alt: "A Parity trace view connecting production files to their belonging tests and matched coverage results"
    width: 640
    height: 500
  actions:
    - theme: brand
      text: Read the quickstart
      link: /guide/getting-started
    - theme: alt
      text: See the coverage model
      link: /guide/coverage
---

<section class="trace-proof" aria-label="Matched coverage proof">
  <div class="trace-proof-copy">
    <p class="eyebrow">The missing relationship</p>
    <h2>Coverage is not ownership.</h2>
    <p>
      A global percentage can look healthy while the test that belongs to one file barely exercises it.
      Parity keeps the useful context together: source file, owning test, matched lines, and the rule that decides
      whether the proof is enough.
    </p>
    <div class="proof-inline">
      <span><b>01</b> Declare the owner</span>
      <span><b>02</b> Match the coverage</span>
      <span><b>03</b> Gate the release</span>
    </div>
    <div class="doc-actions">
      <a href="/guide/configuration">Start with parity.yaml</a>
      <a href="/guide/why-global-coverage-lies">Why global coverage lies</a>
    </div>
  </div>

  <div class="trace-map" aria-label="Example matched coverage report">
    <div class="trace-map-head">
      <div>
        <span class="trace-kicker">parity check</span>
        <strong>services / ownership</strong>
      </div>
      <code>3 files / 3 owners</code>
    </div>
    <div class="trace-table-head" aria-hidden="true">
      <span>Source</span>
      <span>Belonging test</span>
      <span>Matched</span>
      <span>Gate</span>
    </div>
    <div class="trace-row">
      <code>InvoiceTotal.php</code>
      <span class="trace-link"></span>
      <code>InvoiceTotalTest.php</code>
      <strong class="trace-coverage good">91%</strong>
      <span class="trace-state good">pass</span>
    </div>
    <div class="trace-row">
      <code>Slugger.php</code>
      <span class="trace-link"></span>
      <code>SluggerTest.php</code>
      <strong class="trace-coverage good">100%</strong>
      <span class="trace-state good">pass</span>
    </div>
    <div class="trace-row trace-row-risk">
      <code>CheckoutGateway.php</code>
      <span class="trace-link"></span>
      <code>CheckoutGatewayTest.php</code>
      <strong class="trace-coverage risk">18%</strong>
      <span class="trace-state risk">review</span>
    </div>
    <p class="trace-map-note"><span>!</span> The suite may pass. The owning test still needs more proof.</p>
  </div>
</section>

<section class="release-path" aria-label="The Parity workflow">
  <div class="release-path-heading">
    <p class="eyebrow">A small addition to your existing workflow</p>
    <h2>Keep the runner. Add the relationship.</h2>
    <p>
      Parity reads the report your test tool already produces. When that report cannot identify tests individually,
      <code>parity test</code> can run them one at a time and build the per-test evidence that <code>parity check</code>
      evaluates.
    </p>
  </div>
  <ol class="path-sequence">
    <li>
      <span class="path-number">01</span>
      <strong>Describe ownership</strong>
      <p>Map source folders to tests, or use static ownership links from Pest and PHPUnit.</p>
    </li>
    <li>
      <span class="path-number">02</span>
      <strong>Feed coverage</strong>
      <p>Use Parity JSON, PHPUnit XML, Clover, or Cobertura when the tool already records attribution.</p>
    </li>
    <li>
      <span class="path-number">03</span>
      <strong>Generate when needed</strong>
      <p>Run each test through <code>parity test</code> to create one report per test in a stable directory.</p>
    </li>
    <li>
      <span class="path-number">04</span>
      <strong>Gate with context</strong>
      <p>Fail with the file, its belonging test, matched percentage, and the threshold that was missed.</p>
    </li>
  </ol>
</section>

<section class="command-deck" aria-label="Install and configure Parity">
  <div class="terminal-shell">
    <div class="terminal-head">
      <span class="terminal-lights"><i></i><i></i><i></i></span>
      <code>quickstart / existing test command</code>
      <span class="terminal-state">ready</span>
    </div>
    <pre><code>$ composer require --dev testparity/parity&#10;$ php vendor/bin/parity init&#10;&#10;# Let Parity generate per-test reports when the coverage tool cannot.&#10;$ php vendor/bin/parity test&#10;&#10;# Check every source/test relationship in CI.&#10;$ php vendor/bin/parity check --format=json&#10;&#10;PASS 18 files mapped  /  16 owners proven  /  2 review items</code></pre>
  </div>

  <div class="config-sheet">
    <p class="eyebrow">The contract</p>
    <h2>Make the belonging test explicit.</h2>
    <p>
      A rule is only useful when a reviewer can see what it protects. Keep the threshold next to the source/test map.
    </p>
    <pre><code>min_matched_coverage: 70&#10;&#10;structure:&#10;  - name: Services&#10;    paths:&#10;      source: app/Services&#10;      test: tests/Unit/Services&#10;    rules:&#10;      - test-exists&#10;      - matched-coverage:&#10;          min: 70</code></pre>
    <a class="text-link" href="/guide/configuration">Read the configuration reference <span>-></span></a>
  </div>
</section>

<section class="report-proof" aria-label="Parity report output">
  <div class="report-copy">
    <p class="eyebrow">The result a reviewer needs</p>
    <h2>Not “coverage is low.”<br />“This test missed this file.”</h2>
    <p>
      JSON is made for CI. Table output is made for a human scanning a failed merge. Both carry the same local proof,
      so a release failure is actionable instead of another number to investigate.
    </p>
    <a class="text-link" href="/guide/reference">Explore output and rules <span>-></span></a>
  </div>
  <div class="report-terminal">
    <div class="terminal-head">
      <span class="terminal-lights"><i></i><i></i><i></i></span>
      <code>parity check --format=json</code>
      <span class="terminal-state terminal-state-warn">1 failure</span>
    </div>
    <pre><code>{
  <span class="json-key">"source"</span>: <span class="json-string">"app/Services/CheckoutGateway.php"</span>,
  <span class="json-key">"test"</span>: <span class="json-string">"tests/Unit/Services/CheckoutGatewayTest.php"</span>,
  <span class="json-key">"matched_coverage"</span>: <span class="json-number">18</span>,
  <span class="json-key">"minimum"</span>: <span class="json-number">70</span>,
  <span class="json-key">"error"</span>: <span class="json-string">"matched coverage is below minimum"</span>
}</code></pre>
  </div>
</section>

<section class="sample-atlas" aria-label="Supported sample repositories">
  <div class="sample-atlas-copy">
    <p class="eyebrow">Proof across real stacks</p>
    <h2>See the file/test relationship in the language you already ship.</h2>
    <p>
      The public samples are small on purpose. Each repository installs Parity in CI, produces coverage, runs the
      check, and documents the difference between global coverage and the coverage attributable to one test.
    </p>
    <a class="text-link" href="/guide/samples">Browse the sample repositories <span>-></span></a>
  </div>
  <div class="sample-table" role="table" aria-label="Sample repository matrix">
    <div class="sample-table-row sample-table-head" role="row">
      <span>Stack</span><span>Runner</span><span>Evidence</span><span>Sample</span>
    </div>
    <div class="sample-table-row" role="row">
      <span class="stack-tag php">PHP</span><strong>PHPUnit</strong><span>PHPUnit XML</span><a href="/guide/samples">phpunit-sample</a>
    </div>
    <div class="sample-table-row" role="row">
      <span class="stack-tag php">PHP</span><strong>Pest</strong><span><code>covers()</code> + XML</span><a href="/guide/samples">pest-sample</a>
    </div>
    <div class="sample-table-row" role="row">
      <span class="stack-tag js">JS / TS</span><strong>Jest + Vitest</strong><span>Per-test JSON</span><a href="/guide/samples">typescript-sample</a>
    </div>
    <div class="sample-table-row" role="row">
      <span class="stack-tag rust">Rust</span><strong>Cargo</strong><span>Portable coverage</span><a href="/guide/samples">rust-sample</a>
    </div>
  </div>
</section>

<section class="release-signal" aria-label="Release proof">
  <div>
    <span class="signal-dot"></span>
    <strong>Built in public, checked in CI.</strong>
  </div>
  <p>Parity checks its own ownership rules, publishes a PHAR, and keeps the docs and implementation specs together.</p>
  <a class="text-link" href="https://github.com/testparity/cli">Read the source <span>-></span></a>
</section>
