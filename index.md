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
