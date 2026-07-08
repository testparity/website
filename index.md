---
layout: home

hero:
  name: Parity
  text: Know whether each file is tested by the test that owns it.
  tagline: "A documentation-first release gate for structural test parity: source files, belonging tests, coverage ownership, and matched coverage in one CI-friendly report."
  actions:
    - theme: brand
      text: Read the quickstart
      link: /guide/getting-started
    - theme: alt
      text: Configure matched coverage
      link: /guide/configuration
    - theme: alt
      text: Browse samples
      link: /guide/samples
---

<section class="parity-intro" aria-label="Parity overview">
  <div class="parity-intro-copy">
    <p class="eyebrow">Per-file test accountability</p>
    <h2>Global coverage tells you the room is lit. Parity tells you which switch belongs to which file.</h2>
    <p>
      Parity reads the coverage artifact you already create, maps every production file to its expected test,
      and reports how much of that file was covered by the test that should own it. The useful number is not
      just coverage. It is matched coverage.
    </p>
    <div class="intro-metrics">
      <div>
        <strong>One file, one owner</strong>
        <span>Every production path resolves to the test that should carry its behavior.</span>
      </div>
      <div>
        <strong>Coverage with attribution</strong>
        <span>Matched coverage separates real ownership from incidental execution.</span>
      </div>
      <div>
        <strong>Release gating without guesswork</strong>
        <span>CI output names the file, the expected test, the rule, and the missing proof.</span>
      </div>
    </div>
    <div class="doc-actions">
      <a href="/guide/getting-started">Start with parity.yaml</a>
      <a href="/guide/coverage">Understand matched coverage</a>
    </div>
  </div>

  <div class="coverage-ledger" aria-label="Matched coverage example">
    <div class="ledger-toolbar">
      <span>parity check</span>
      <code>--format=table</code>
    </div>
    <div class="ledger-row ledger-head">
      <span>Source file</span>
      <span>Belonging test</span>
      <span>Matched</span>
      <span>Status</span>
    </div>
    <div class="ledger-row">
      <span><code>InvoiceTotal.php</code></span>
      <span><code>InvoiceTotalTest.php</code></span>
      <span class="meter"><i style="width: 91%"></i>91%</span>
      <span class="ok">Pass</span>
    </div>
    <div class="ledger-row">
      <span><code>Slugger.php</code></span>
      <span><code>SluggerTest.php</code></span>
      <span class="meter"><i style="width: 100%"></i>100%</span>
      <span class="ok">Pass</span>
    </div>
    <div class="ledger-row flagged">
      <span><code>CheckoutGateway.php</code></span>
      <span><code>CheckoutGatewayTest.php</code></span>
      <span class="meter"><i style="width: 18%"></i>18%</span>
      <span class="warn">Review</span>
    </div>
    <p class="ledger-note">A high global percentage can still fail if a file’s belonging test does not meaningfully cover it.</p>
  </div>
</section>

<section class="adoption-path" aria-label="Documentation path">
  <div class="adoption-copy">
    <p class="eyebrow">Documentation path</p>
    <h2>Get from zero to a useful CI gate without learning a new test runner.</h2>
    <p>
      Parity fits around the runner and coverage file you already trust. The workflow is deliberately plain:
      install the CLI, describe ownership, feed coverage, and fail loudly when a file is not meaningfully tested
      by the test that belongs to it.
    </p>
    <a class="sample-link" href="/guide/getting-started">Open the guided setup</a>
  </div>
  <div class="path-rail">
    <article>
      <span>01</span>
      <div>
        <strong>Install the CLI</strong>
        <p>Composer, PHAR, and local binary workflows are all documented and CI-friendly.</p>
      </div>
    </article>
    <article>
      <span>02</span>
      <div>
        <strong>Map files to tests</strong>
        <p>Declare source/test folders, suffixes, file maps, and minimum matched coverage.</p>
      </div>
    </article>
    <article>
      <span>03</span>
      <div>
        <strong>Feed coverage reports</strong>
        <p>Use Parity JSON or PHPUnit XML attribution, with Clover and Cobertura as portable fallbacks.</p>
      </div>
    </article>
    <article>
      <span>04</span>
      <div>
        <strong>Fail releases clearly</strong>
        <p>Emit JSON for CI and table output for humans reviewing what failed and why.</p>
      </div>
    </article>
  </div>
</section>

<section class="implementation-stage" aria-label="Parity workflow">
  <div class="code-card">
    <div class="terminal-bar">
      <span></span><span></span><span></span>
      <code>quickstart</code>
    </div>
    <pre><code>composer require --dev testparity/parity&#10;php vendor/bin/parity init&#10;&#10;# Generate coverage with your existing test command.&#10;XDEBUG_MODE=coverage ./vendor/bin/pest --coverage-clover=clover.xml&#10;&#10;# Check whether each file has a real owning test.&#10;php vendor/bin/parity check --format=json</code></pre>
  </div>
  <div class="implementation-copy">
    <div class="config-card">
      <p class="eyebrow">The important setting</p>
      <h2>Set a minimum for the test that belongs to the file.</h2>
      <pre><code>min_matched_coverage: 70&#10;&#10;structure:&#10;  - name: Services&#10;    paths:&#10;      source: app/Services&#10;      test: tests/Unit/Services&#10;    rules:&#10;      - test-exists&#10;      - matched-coverage:&#10;          min: 70</code></pre>
    </div>
    <div class="implementation-note">
      <p class="eyebrow">What this changes</p>
      <h3>Parity makes "which test owns this file?" a first-class release question.</h3>
      <p>
        Teams can keep broad suite coverage while still failing a PR when a file's designated test covers only a
        fraction of the behavior it is supposed to protect.
      </p>
    </div>
  </div>
</section>

<section class="result-showcase" aria-label="Parity result showcase">
  <div class="terminal-card">
    <div class="terminal-bar">
      <span></span><span></span><span></span>
      <code>php parity check --format=json</code>
    </div>
    <pre><code>{&#10;  "passed": false,&#10;  "structures": [&#10;    {&#10;      "name": "Services",&#10;      "files": [&#10;        {&#10;          "source": "app/Services/CheckoutGateway.php",&#10;          "test": "tests/Unit/Services/CheckoutGatewayTest.php",&#10;          "passed": false,&#10;          "rules": {&#10;            "test-exists": { "value": "Y" },&#10;            "minimum-coverage": { "value": "88%" },&#10;            "matched-coverage": {&#10;              "value": "18%",&#10;              "error": "Matched coverage 18% is below minimum 70%"&#10;            }&#10;          }&#10;        }&#10;      ]&#10;    }&#10;  ]&#10;}</code></pre>
  </div>

  <div class="showcase-copy">
    <p class="eyebrow">What Parity is optimizing for</p>
    <h2>Coverage that is attributable, reviewable, and local to the file.</h2>
    <div class="signal-list">
      <article>
        <span>Belonging test exists</span>
        <p>Every source file resolves to the test file that should own its behavior.</p>
      </article>
      <article>
        <span>Ownership is declared</span>
        <p>Pest <code>->covers()</code> and PHPUnit <code>#[CoversClass]</code> links can be validated statically.</p>
      </article>
      <article>
        <span>Matched coverage is visible</span>
        <p>Parity JSON and PHPUnit XML attribution separate coverage from the matching test and coverage from everything else.</p>
      </article>
      <article>
        <span>Review output is concrete</span>
        <p>Failures name the source file, expected test file, rule, value, and threshold.</p>
      </article>
    </div>
  </div>
</section>

<section class="sample-lab" aria-label="Published samples">
  <div class="sample-lab-copy">
    <p class="eyebrow">Working examples</p>
    <h2>Study real sample apps before wiring Parity into your own repo.</h2>
    <p>
      The public sample repositories cover PHP, Pest, PHPUnit, Jest, Mocha, Vitest, Cargo, Laravel,
      TypeScript, AdonisJS, and Rust layouts. Each sample installs Parity from Packagist in CI and includes coverage output plus a <code>parity.yaml</code> you can copy from.
    </p>
    <div class="sample-tracks">
      <span>PHPUnit</span>
      <span>Pest</span>
      <span>Jest</span>
      <span>Mocha</span>
      <span>Vitest</span>
      <span>Laravel</span>
      <span>Rust</span>
      <span>TypeScript</span>
    </div>
    <a class="sample-link" href="/guide/samples">Browse sample repositories</a>
  </div>
  <div class="sample-grid">
    <article><span>PHP</span><strong>phpunit</strong><small>Per-file attribution with explicit ownership rules</small></article>
    <article><span>PHP</span><strong>pest</strong><small><code>->covers()</code> links and matched coverage thresholds</small></article>
    <article><span>JS</span><strong>jest</strong><small>Parity JSON output wired through CI for file-level proof</small></article>
    <article><span>JS</span><strong>mocha</strong><small>NYC coverage plus ownership mapping in a classic Node layout</small></article>
    <article><span>TS</span><strong>vitest</strong><small>TypeScript repo structure with practical coverage artifacts</small></article>
    <article><span>Rust</span><strong>cargo</strong><small>Portable coverage flow with a sample that still feels realistic</small></article>
  </div>
</section>

<section class="proof-strip" aria-label="Release proof">
  <article>
    <span class="proof-status">CLI CI</span>
    <h3>Parity checks Parity</h3>
    <p>The CLI repository runs Pest, Pint, PHAR verification, and <code>php parity check --format=json</code>.</p>
  </article>
  <article>
    <span class="proof-status">Samples CI</span>
    <h3>Examples cannot silently rot</h3>
    <p>Each sample repository installs <code>testparity/parity</code> from Packagist and runs <code>parity check</code>.</p>
  </article>
  <article>
    <span class="proof-status">Docs</span>
    <h3>Specs and implementation details ship together</h3>
    <p>The website links guides, rules, coverage readers, plugins, CI setup, and traceable specs.</p>
  </article>
</section>
