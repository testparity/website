---
layout: home

hero:
  name: Parity
  text: Prove every production file has a worthy test.
  tagline: A release gate that compares source structure, declared coverage intent, and real coverage output before weak test architecture reaches CI.
  actions:
    - theme: brand
      text: Start in 5 minutes
      link: /guide/getting-started
    - theme: alt
      text: Read the rules
      link: /guide/rules
    - theme: alt
      text: Browse samples
      link: https://github.com/testparity/samples
    - theme: alt
      text: View specs
      link: /specs/
---

<section class="parity-stage" aria-label="Parity product overview">
  <div class="stage-copy">
    <p class="eyebrow">Static test architecture checks for teams that ship PHP</p>
    <h2>Coverage is not enough when it comes from the wrong test.</h2>
    <p>
      Parity reads the coverage reports you already generate and answers the hand-off question
      reviewers actually care about: does this source file have the right test, does that test
      claim ownership, and did it cover meaningful executable lines?
    </p>
    <div class="stage-metrics">
      <span><strong>0</strong> test execution</span>
      <span><strong>11</strong> sample projects</span>
      <span><strong>3</strong> coverage formats</span>
      <span><strong>5</strong> built-in rules</span>
    </div>
  </div>

  <div class="parity-orbit" aria-hidden="true">
    <div class="orbit-ring ring-one"></div>
    <div class="orbit-ring ring-two"></div>
    <div class="parity-cube">
      <div class="cube-face cube-front">source</div>
      <div class="cube-face cube-back">tests</div>
      <div class="cube-face cube-right">rules</div>
      <div class="cube-face cube-left">links</div>
      <div class="cube-face cube-top">CI</div>
      <div class="cube-face cube-bottom">JSON</div>
    </div>
  </div>
</section>

<section class="install-ribbon" aria-label="Install Parity">
  <div>
    <p class="eyebrow">Install and gate CI</p>
    <h2>One binary. One config. A structural receipt for every release.</h2>
  </div>
  <div class="install-commands">
    <pre><code>composer require --dev testparity/parity
php vendor/bin/parity init
php vendor/bin/parity check --format=json</code></pre>
    <a href="/guide/installation">Installation guide</a>
  </div>
</section>

<section class="result-showcase" aria-label="Parity result showcase">
  <div class="terminal-card">
    <div class="terminal-bar">
      <span></span><span></span><span></span>
      <code>php parity check --format=json</code>
    </div>
    <pre><code>{
  "passed": true,
  "global_coverage": 71.88,
  "min_coverage_global": 60,
  "structures": [
    {
      "name": "Services",
      "files": [
        {
          "source": "app/Services/ParityChecker.php",
          "test": "tests/Unit/Services/ParityCheckerTest.php",
          "passed": true,
          "rules": {
            "test-exists": { "value": "Y" },
            "minimum-coverage": { "value": "68.33%" },
            "matched-coverage": { "value": "68.33%" }
          }
        }
      ]
    }
  ]
}</code></pre>
  </div>

  <div class="showcase-copy">
    <p class="eyebrow">What the gate catches</p>
    <h2>Not just “is coverage high?” but “is coverage accountable?”</h2>
    <div class="signal-grid">
      <article>
        <span>01</span>
        <h3>Missing test files</h3>
        <p>Every source path resolves to an expected test path, with explicit file maps for real-world exceptions.</p>
      </article>
      <article>
        <span>02</span>
        <h3>Weak ownership</h3>
        <p>Pest <code>->covers()</code> and PHPUnit <code>#[CoversClass]</code> declarations are validated statically.</p>
      </article>
      <article>
        <span>03</span>
        <h3>Incidental coverage</h3>
        <p>PHPUnit XML attribution lets Parity distinguish matching-test coverage from accidental coverage.</p>
      </article>
      <article>
        <span>04</span>
        <h3>CI regressions</h3>
        <p>Machine-readable JSON and deterministic exit codes make Parity a straightforward release gate.</p>
      </article>
    </div>
  </div>
</section>

<section class="sample-lab" aria-label="Published samples">
  <div class="sample-lab-copy">
    <p class="eyebrow">Published sample lab</p>
    <h2>Parity is tested against real project shapes, not a single happy-path fixture.</h2>
    <p>
      The samples repository ships runnable PHP, Pest, PHPUnit, Jest, Mocha, Vitest, Cargo, Laravel,
      Vite, AdonisJS, and Rust layouts. Each sample includes the native test app, coverage artifact,
      Parity config, and expected result.
    </p>
    <a class="sample-link" href="https://github.com/testparity/samples">Open testparity/samples</a>
  </div>
  <div class="sample-grid">
    <article><span>PHP</span><strong>phpunit</strong><small>Clover XML</small></article>
    <article><span>PHP</span><strong>pest</strong><small>covers() links</small></article>
    <article><span>JS</span><strong>jest</strong><small>Clover XML</small></article>
    <article><span>JS</span><strong>mocha</strong><small>NYC coverage</small></article>
    <article><span>TS</span><strong>vitest</strong><small>Vite layout</small></article>
    <article><span>Rust</span><strong>cargo</strong><small>Cobertura XML</small></article>
    <article><span>PHP</span><strong>laravel</strong><small>app/Services</small></article>
    <article><span>TS</span><strong>adonisjs</strong><small>service tests</small></article>
  </div>
</section>

<section class="workflow-lane" aria-label="Parity workflow">
  <div>
    <p class="eyebrow">Release workflow</p>
    <h2>Generate coverage. Run Parity. Ship with a structural receipt.</h2>
  </div>
  <ol>
    <li><strong>Configure</strong><span>Map source folders to test folders in <code>parity.yaml</code>.</span></li>
    <li><strong>Measure</strong><span>Emit PHPUnit XML, Clover XML, or Cobertura XML from your native test tool.</span></li>
    <li><strong>Enforce</strong><span>Fail CI when tests disappear, ownership declarations drift, or coverage drops.</span></li>
  </ol>
</section>

<section class="proof-board" aria-label="Release proof">
  <article>
    <span class="proof-status">CI green</span>
    <h3>Parity checks itself</h3>
    <p>The CLI repository runs Pest, Pint, PHAR verification, and <code>php parity check --format=json</code> on every deploy.</p>
  </article>
  <article>
    <span class="proof-status">Samples green</span>
    <h3>Every sample runs Parity</h3>
    <p>The samples repository validates all 11 fixtures through a bundled PHAR so examples cannot silently rot.</p>
  </article>
  <article>
    <span class="proof-status">Vercel live</span>
    <h3>Docs ship automatically</h3>
    <p>The website deploys from GitHub Actions to Vercel and serves <code>testparity.com</code> with production HTTPS.</p>
  </article>
</section>

<section class="capability-wall" aria-label="Parity capabilities">
  <article>
    <h3>Dogfoods itself</h3>
    <p>The Parity repository now runs <code>php parity check --format=json</code> against its own production code in CI.</p>
  </article>
  <article>
    <h3>Works across report formats</h3>
    <p>Use rich PHPUnit XML attribution when available, or portable Clover and Cobertura reports when integrating other stacks.</p>
  </article>
  <article>
    <h3>Extensible by design</h3>
    <p>Add project-local, user-global, or Composer-distributed rules without forking the core checker.</p>
  </article>
</section>
