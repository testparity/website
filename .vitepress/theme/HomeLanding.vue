<script setup lang="ts">
import { computed, ref } from 'vue'

type Owner = 'own' | 'borrowed' | 'none'

interface SourceRow {
  label: string
  owner: Owner
  excerpt?: { number: number; code: string }
}

interface Sample {
  id: string
  label: string
  repo: string
  file: string
  ownTest: string
  otherTest: string
  all: number
  own: number
  rows: SourceRow[]
}

// Line ownership mirrors what `parity test` reports in each public sample repository.
const samples: Sample[] = [
  {
    id: 'php',
    label: 'PHP',
    repo: 'https://github.com/testparity/php-sample',
    file: 'src/Calculator.php',
    ownTest: 'CalculatorTest.php',
    otherTest: 'DiscountPolicyTest.php',
    all: 80,
    own: 40,
    rows: [
      { label: 'add()', owner: 'own' },
      { label: 'subtract()', owner: 'own' },
      { label: 'multiply()', owner: 'borrowed', excerpt: { number: 21, code: 'return $left * $right;' } },
      { label: 'divide()', owner: 'borrowed', excerpt: { number: 26, code: 'return intdiv($left, $right);' } },
      { label: 'maximum()', owner: 'none' },
    ],
  },
  {
    id: 'js',
    label: 'JavaScript',
    repo: 'https://github.com/testparity/jest-sample',
    file: 'code/src/sum.js',
    ownTest: 'sum.test.js',
    otherTest: 'discount.test.js',
    all: 85.71,
    own: 42.86,
    rows: [
      { label: 'sum()', owner: 'own' },
      { label: 'difference()', owner: 'own' },
      { label: 'product()', owner: 'borrowed', excerpt: { number: 10, code: 'return left * right' } },
      { label: 'quotient()', owner: 'borrowed', excerpt: { number: 14, code: 'return left / right' } },
      { label: 'maximum()', owner: 'borrowed' },
      { label: 'minimum()', owner: 'none' },
      { label: 'module.exports', owner: 'own' },
    ],
  },
  {
    id: 'rust',
    label: 'Rust',
    repo: 'https://github.com/testparity/rust-sample',
    file: 'src/lib.rs',
    ownTest: 'lib_test.rs',
    otherTest: 'discount_test.rs',
    all: 80,
    own: 40,
    rows: [
      { label: 'double()', owner: 'own' },
      { label: 'increment()', owner: 'own' },
      { label: 'square()', owner: 'borrowed', excerpt: { number: 12, code: 'value * value' } },
      { label: 'absolute()', owner: 'borrowed', excerpt: { number: 16, code: 'value.abs()' } },
      { label: 'triple()', owner: 'none' },
    ],
  },
]

// Every public sample, as reported by its own CI run.
const ledger = [
  { name: 'PHP', runner: 'PHPUnit', file: 'src/Calculator.php', all: 80, own: 40, repo: 'php-sample' },
  { name: 'Laravel', runner: 'PHPUnit', file: 'app/Services/InvoiceTotal.php', all: 80, own: 40, repo: 'laravel-sample' },
  { name: 'PHPUnit', runner: 'PHPUnit', file: 'src/InvoiceCalculator.php', all: 80, own: 40, repo: 'phpunit-sample' },
  { name: 'Pest', runner: 'Pest', file: 'src/Slugger.php', all: 80, own: 40, repo: 'pest-sample' },
  { name: 'Jest', runner: 'Jest', file: 'src/sum.js', all: 85.71, own: 42.86, repo: 'jest-sample' },
  { name: 'Mocha', runner: 'Mocha + NYC', file: 'src/greeting.js', all: 85.71, own: 42.86, repo: 'mocha-sample' },
  { name: 'Vitest', runner: 'Vitest', file: 'src/formatCurrency.ts', all: 100, own: 50, repo: 'vitest-sample' },
  { name: 'TypeScript', runner: 'node:test + c8', file: 'src/formatCurrency.ts', all: 80, own: 44, repo: 'typescript-sample' },
  { name: 'AdonisJS', runner: 'Japa + c8', file: 'app/services/user_presenter.ts', all: 84, own: 44, repo: 'adonisjs-sample' },
  { name: 'Rust', runner: 'cargo llvm-cov', file: 'src/lib.rs', all: 80, own: 40, repo: 'rust-sample' },
  { name: 'Cargo', runner: 'cargo llvm-cov', file: 'src/lib.rs', all: 80, own: 40, repo: 'cargo-sample' },
]

const active = ref(0)
const ownOnly = ref(false)
const sample = computed(() => samples[active.value])
const excerpts = computed(() => sample.value.rows.flatMap(row => row.excerpt ? [row.excerpt] : []))
const coverageLabels = { own: 'Own test', borrowed: 'Other tests', none: 'Uncovered' }
const tabs = ref<HTMLButtonElement[]>([])

function selectTab(index: number) {
  active.value = (index + samples.length) % samples.length
  tabs.value[active.value]?.focus()
}

function onTabKey(event: KeyboardEvent, index: number) {
  if (event.key === 'ArrowRight') selectTab(index + 1)
  else if (event.key === 'ArrowLeft') selectTab(index - 1)
  else return
  event.preventDefault()
}

function format(value: number) {
  return `${Number.isInteger(value) ? value : value.toFixed(2)}%`
}

const command = 'composer global require testparity/parity'
const copied = ref(false)

async function copyCommand() {
  try {
    await navigator.clipboard.writeText(command)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1800)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <div class="landing">
    <section class="hero">
      <div class="hero-copy">
        <h1>Find the files your tests only cover by accident.</h1>
        <p class="lede">
          Global coverage counts every line any test touched. Parity checks that each source file is exercised by
          its own test, and fails CI when a different test is doing the work.
        </p>
        <div class="actions">
          <a class="button primary" href="/guide/getting-started">Get started</a>
          <a class="button" href="/guide/samples">Browse the samples</a>
        </div>
        <p class="stack-note">Reads PHPUnit, Clover, Cobertura, and Parity JSON coverage from PHP, JavaScript, TypeScript, and Rust projects.</p>
      </div>

      <figure class="trace" :class="{ 'own-only': ownOnly }">
        <div class="trace-top">
          <div class="tabs" role="tablist" aria-label="Sample language">
            <button
              v-for="(item, index) in samples"
              :key="item.id"
              ref="tabs"
              role="tab"
              type="button"
              :id="`tab-${item.id}`"
              :aria-selected="index === active"
              :aria-controls="`panel-${item.id}`"
              :tabindex="index === active ? 0 : -1"
              @click="active = index"
              @keydown="onTabKey($event, index)"
            >{{ item.label }}</button>
          </div>
          <span class="file">{{ sample.file }}</span>
        </div>

        <div
          :id="`panel-${sample.id}`"
          :key="sample.id"
          class="matrix-panel"
          role="tabpanel"
          :aria-labelledby="`tab-${sample.id}`"
          tabindex="0"
        >
          <table class="coverage-matrix" aria-label="Coverage by source item">
            <thead>
              <tr>
                <th scope="col">Source</th>
                <th scope="col" :class="{ 'active-column': !ownOnly }">
                  <button type="button" :aria-pressed="!ownOnly" @click="ownOnly = false">
                    <span>All tests</span>
                    <strong>{{ format(sample.all) }}</strong>
                  </button>
                </th>
                <th scope="col" :class="{ 'active-column': ownOnly }">
                  <button
                    type="button"
                    :aria-label="`Own test: ${sample.ownTest}, ${format(sample.own)}`"
                    :aria-pressed="ownOnly"
                    @click="ownOnly = true"
                  >
                    <span>Own test</span>
                    <strong>{{ format(sample.own) }}</strong>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in sample.rows" :key="row.label">
                <th scope="row"><code>{{ row.label }}</code></th>
                <td :class="{ 'active-column': !ownOnly }">
                  <i class="key" :class="row.owner" aria-hidden="true" />
                  {{ coverageLabels[row.owner] }}
                </td>
                <td :class="{ 'active-column': ownOnly }">
                  <i class="key" :class="row.owner === 'own' ? 'own' : 'none'" aria-hidden="true" />
                  {{ row.owner === 'own' ? coverageLabels.own : coverageLabels.none }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="code" role="group" aria-label="Lines covered only by other tests" tabindex="0">
            <div v-for="line in excerpts" :key="line.number" class="line is-borrowed">
              <span class="ln">{{ line.number }}</span>
              <span class="gutter" />
              <code>{{ line.code }}</code>
            </div>
          </div>
        </div>

        <figcaption class="legend">
          <span><i class="key own" />Covered by {{ sample.ownTest }}</span>
          <span><i class="key borrowed" />Covered only by {{ sample.otherTest }}</span>
          <span><i class="key none" />Not covered</span>
          <a :href="`${sample.repo}/blob/HEAD/${sample.file}`">View full source on GitHub</a>
        </figcaption>
      </figure>
    </section>

    <section class="ledger" aria-labelledby="ledger-title">
      <div class="section-head">
        <h2 id="ledger-title">The same gap in eleven real projects</h2>
        <p>
          Each sample passes an 80% global coverage gate. In each one, a single file gets most of its coverage from
          a test that belongs to something else. These numbers come from each repository's CI run of
          <code>parity test</code>.
        </p>
      </div>

      <div class="ledger-key" aria-hidden="true">
        <span><i class="key own" />Its own test</span>
        <span><i class="key borrowed" />Other tests</span>
      </div>

      <ol class="ledger-rows">
        <li v-for="row in ledger" :key="row.repo">
          <a :href="`https://github.com/testparity/${row.repo}`">
            <span class="ledger-name">{{ row.name }}<small>{{ row.runner }}</small></span>
            <code class="ledger-file">{{ row.file }}</code>
            <span class="ledger-bar" aria-hidden="true">
              <span class="seg own" :style="{ width: `${row.own}%` }" />
              <span class="seg borrowed" :style="{ width: `${row.all - row.own}%` }" />
            </span>
            <span class="ledger-num">
              {{ format(row.all) }} <span class="sr-only">overall, but only</span><span aria-hidden="true">/</span> <b>{{ format(row.own) }}</b>
              <span class="sr-only">from its own test</span>
            </span>
          </a>
        </li>
      </ol>
    </section>

    <section class="steps" aria-labelledby="steps-title">
      <div class="section-head">
        <h2 id="steps-title">Add it to CI in three steps</h2>
        <p>Keep your test runner and your coverage tool. Parity reads what they already produce.</p>
      </div>

      <ol class="step-list">
        <li>
          <h3>Map source folders to test folders</h3>
          <p><code>parity init</code> writes a <code>parity.yaml</code>. Each structure says where a file's own test lives and how much of the file it must cover.</p>
          <pre><code>structure:
  - name: "Currency"
    paths:
      source: "code/src"
      test: "code/tests"
    rules:
      - minimum-coverage:
          min: 70
      - matched-coverage:
          min: 70</code></pre>
        </li>
        <li>
          <h3>Run each test on its own</h3>
          <p>If your coverage tool already records which test hit which line, skip this. Otherwise <code>parity test</code> runs every test file in isolation and keeps one report per test.</p>
          <pre><code>$ parity test --format=json</code></pre>
        </li>
        <li>
          <h3>Fail the build with a reason</h3>
          <p>The suite reaches 100%, but <code>formatCurrency.test.ts</code> covers only half of its own file, so the check fails and says which file to fix.</p>
          <pre class="fail"><code>formatCurrency.ts
  Cov    100%
  Match   50%   N

Global                 100.00%  OK
Per-file min
  (matching test only)  50.00%  FAIL</code></pre>
        </li>
      </ol>
    </section>

    <section class="install" aria-labelledby="install-title">
      <h2 id="install-title">Install</h2>
      <div class="install-row">
        <div class="command">
          <code><span aria-hidden="true">$ </span>{{ command }}</code>
          <button type="button" @click="copyCommand">{{ copied ? 'Copied' : 'Copy' }}</button>
        </div>
        <p>
          Requires PHP 8.4 or newer, even for JavaScript and Rust projects. A standalone PHAR is attached to every
          <a href="https://github.com/testparity/cli/releases">GitHub release</a>. Parity is MIT licensed.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  --gap: clamp(20px, 4vw, 48px);
  width: min(1200px, 100% - 32px);
  margin: 0 auto;
  padding: clamp(32px, 6vw, 72px) 0 96px;
  color: var(--p-ink);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

/* Hero */

.hero {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: var(--gap);
  align-items: start;
}

.hero h1 {
  margin: 8px 0 0;
  font-size: clamp(2.6rem, 5.4vw, 4.6rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.lede {
  max-width: 34em;
  margin: 28px 0 0;
  color: var(--p-muted);
  font-size: 1.16rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.button {
  display: inline-flex;
  align-items: center;
  min-height: 46px;
  padding: 0 20px;
  border: 1.5px solid var(--p-ink);
  border-radius: 6px;
  color: var(--p-ink);
  font-weight: 700;
  text-decoration: none;
  transition: background-color 140ms ease, color 140ms ease;
}

.button:hover {
  background: var(--p-ink);
  color: var(--p-paper);
}

.button.primary {
  background: var(--p-ink);
  color: var(--p-paper);
}

.button.primary:hover {
  background: var(--p-own-strong);
  border-color: var(--p-own-strong);
}

.stack-note {
  max-width: 30em;
  margin: 28px 0 0;
  color: var(--p-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

/* Trace panel */

.trace {
  margin: 0;
  border: 1.5px solid var(--p-ink);
  border-radius: 10px;
  background: var(--p-surface);
  overflow: hidden;
}

.trace-top {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px 10px 10px;
  border-bottom: 1px solid var(--p-line);
}

.tabs {
  display: flex;
  gap: 4px;
}

.tabs button {
  min-height: 34px;
  padding: 0 12px;
  border-radius: 5px;
  color: var(--p-muted);
  font-size: 0.88rem;
  font-weight: 650;
}

.tabs button[aria-selected='true'] {
  background: var(--p-ink);
  color: var(--p-paper);
}

.tabs button:not([aria-selected='true']):hover {
  color: var(--p-ink);
}

.file {
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  color: var(--p-muted);
}

.matrix-panel:focus-visible {
  outline: 2px solid var(--p-own-strong);
  outline-offset: -2px;
}

.coverage-matrix {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  line-height: 1.4;
}

.coverage-matrix :is(th, td) {
  padding: 6px 10px;
  border-bottom: 1px solid var(--p-line);
  text-align: center;
}

.coverage-matrix th:first-child {
  padding-left: 16px;
  text-align: left;
}

.coverage-matrix button {
  display: grid;
  gap: 2px;
  width: 100%;
  border-radius: 5px;
  color: var(--p-muted);
}

.coverage-matrix button[aria-pressed='true'],
.coverage-matrix button:hover {
  color: var(--p-ink);
}

.coverage-matrix strong {
  font-size: 1.35rem;
  font-variant-numeric: tabular-nums;
}

.coverage-matrix .active-column {
  background: var(--p-empty);
}

.coverage-matrix .key {
  width: 10px;
  height: 10px;
  vertical-align: baseline;
}

.coverage-matrix code {
  font-size: inherit;
  overflow-wrap: anywhere;
}

.ledger-bar {
  display: flex;
  height: 12px;
  border-radius: 3px;
  background: var(--p-empty);
  overflow: hidden;
}

.seg {
  height: 100%;
  transition: width 420ms cubic-bezier(0.2, 0.7, 0.2, 1);
}

.seg.own,
.key.own {
  background: var(--p-own);
}

.seg.borrowed,
.key.borrowed {
  background: var(--p-hatch);
}

.code {
  padding: 12px 0 14px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 0.84rem;
  line-height: 1.6;
}

.code:focus-visible {
  outline: 2px solid var(--p-own-strong);
  outline-offset: -2px;
}

.line {
  display: grid;
  grid-template-columns: 2.6em 6px 1fr;
  gap: 14px;
  align-items: stretch;
  min-width: max-content;
  padding-right: 16px;
}

.ln {
  color: var(--p-faint);
  text-align: right;
  user-select: none;
}

.gutter {
  border-radius: 1px;
}

.line code {
  padding: 0;
  background: none;
  color: var(--p-ink);
  font-size: inherit;
  white-space: pre;
}

.line.is-borrowed .gutter {
  background: var(--p-hatch);
}

.line.is-borrowed {
  background: var(--p-borrowed-wash);
}

.own-only .line.is-borrowed {
  background: var(--p-miss-wash);
}

.own-only .line.is-borrowed .gutter {
  background: none;
  box-shadow: inset 0 0 0 1.5px var(--p-miss);
}

.own-only .line.is-borrowed code {
  color: var(--p-muted);
}

.line .gutter,
.line {
  transition: background-color 260ms ease, box-shadow 260ms ease;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  align-items: center;
  padding: 12px 16px 14px;
  border-top: 1px solid var(--p-line);
  color: var(--p-muted);
  font-size: 0.84rem;
}

.legend span,
.ledger-key span {
  display: inline-flex;
  gap: 8px;
  align-items: center;
}

.legend a {
  margin-left: auto;
  color: var(--p-ink);
  font-weight: 650;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.key {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 2px;
}

.key.none {
  box-shadow: inset 0 0 0 1.5px var(--p-faint);
}

/* Sections */

.ledger,
.steps,
.install {
  margin-top: clamp(80px, 11vw, 140px);
}

.section-head {
  max-width: 44em;
}

.section-head h2,
.install h2 {
  margin: 0;
  font-size: clamp(1.9rem, 3.4vw, 2.75rem);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.section-head p {
  margin: 16px 0 0;
  color: var(--p-muted);
  font-size: 1.06rem;
  line-height: 1.6;
}

.section-head code,
.step-list p code {
  font-size: 0.9em;
}

/* Ledger */

.ledger-key {
  display: flex;
  gap: 20px;
  margin: 36px 0 10px;
  color: var(--p-muted);
  font-size: 0.86rem;
}

.ledger-rows {
  margin: 0;
  padding: 0;
  list-style: none;
  border-top: 1.5px solid var(--p-ink);
}

.ledger-rows a {
  display: grid;
  grid-template-columns: 11rem minmax(0, 15rem) minmax(0, 1fr) 9rem;
  gap: 20px;
  align-items: center;
  padding: 13px 4px;
  border-bottom: 1px solid var(--p-line);
  color: inherit;
  text-decoration: none;
}

.ledger-rows a:hover {
  background: var(--p-surface);
}

.ledger-rows a:hover .ledger-name {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.ledger-name {
  display: flex;
  flex-direction: column;
  font-weight: 700;
}

.ledger-name small {
  color: var(--p-muted);
  font-size: 0.8rem;
  font-weight: 500;
}

.ledger-file {
  overflow: hidden;
  padding: 0;
  background: none;
  color: var(--p-muted);
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ledger-num {
  color: var(--p-muted);
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
}

.ledger-num b {
  color: var(--p-ink);
  font-weight: 800;
}

/* Steps */

.step-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--gap);
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}

.step-list li {
  display: flex;
  flex-direction: column;
  padding-top: 18px;
  border-top: 1.5px solid var(--p-ink);
  counter-increment: step;
}

.step-list h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 750;
  letter-spacing: -0.01em;
}

.step-list h3::before {
  content: counter(step);
  display: inline-grid;
  place-items: center;
  width: 1.6em;
  height: 1.6em;
  margin-right: 10px;
  border-radius: 50%;
  background: var(--p-ink);
  color: var(--p-paper);
  font-size: 0.8em;
  vertical-align: 0.1em;
}

.step-list p {
  margin: 12px 0 18px;
  color: var(--p-muted);
  line-height: 1.6;
}

.step-list pre {
  margin: auto 0 0;
  padding: 16px;
  border-radius: 8px;
  background: var(--p-code-bg);
  overflow-x: auto;
  font-size: 0.8rem;
  line-height: 1.6;
}

.step-list pre code {
  padding: 0;
  background: none;
  color: var(--p-code-ink);
  font-size: inherit;
}

.step-list pre.fail {
  box-shadow: inset 4px 0 0 var(--p-miss);
}

/* Install */

.install {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: var(--gap);
  align-items: start;
  padding-top: 28px;
  border-top: 1.5px solid var(--p-ink);
}

.install-row p {
  max-width: 40em;
  margin: 16px 0 0;
  color: var(--p-muted);
  line-height: 1.6;
}

.install-row a {
  color: var(--p-ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.command {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px 10px 18px;
  border-radius: 8px;
  background: var(--p-code-bg);
}

.command code {
  overflow-x: auto;
  padding: 0;
  background: none;
  color: var(--p-code-ink);
  font-size: 0.92rem;
  white-space: nowrap;
}

.command code span {
  color: var(--p-own);
}

.command button {
  flex: none;
  min-width: 72px;
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 5px;
  color: var(--p-code-ink);
  font-size: 0.86rem;
  font-weight: 650;
}

.command button:hover {
  background: rgba(255, 255, 255, 0.08);
}

button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--p-own-strong);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .seg,
  .line,
  .line .gutter,
  .button {
    transition: none;
  }
}

@media (max-width: 1000px) {
  .hero,
  .install {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-copy {
    max-width: 40em;
  }

  .step-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .ledger-rows a {
    grid-template-columns: 8.5rem minmax(0, 1fr) 8.5rem;
  }

  .ledger-file {
    display: none;
  }
}

@media (max-width: 560px) {
  .coverage-matrix :is(th, td) {
    padding-inline: 5px;
  }

  .ledger-rows a {
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 8px 16px;
  }

  .ledger-bar {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  .legend a {
    margin-left: 0;
  }

  .command {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
