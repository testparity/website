<script setup lang="ts">
const files = [
  { name: 'PaymentController.php', associated: 30, suite: 80, delta: 12 },
  { name: 'InvoiceService.php', associated: 72, suite: 90, delta: -6 },
  { name: 'CheckoutRequest.php', associated: 84, suite: 84, delta: 0 },
]
</script>

<template>
  <div class="hosted-page">
    <section class="hosted-hero" aria-labelledby="hosted-title">
      <div>
        <p class="eyebrow">TestParity Hosted</p>
        <h1 id="hosted-title">See how your test coverage changes over time.</h1>
        <p class="hero-description">
          Send TestParity reports from CI to a hosted dashboard. Browse runs by branch, compare commits,
          and find the files that rely on coverage from other tests.
        </p>
        <div class="hosted-actions">
          <a class="hosted-button primary" href="https://app.testparity.com/signup">Create a hosted account</a>
          <a class="hosted-button" href="#plans">Compare plans</a>
        </div>
      </div>
      <figure class="report-preview" aria-label="Example coverage report">
        <div class="report-heading">
          <span>Checkout service</span>
          <span class="report-caption">Example report</span>
        </div>
        <div class="report-content">
          <p class="report-context"><code>main</code><code>e8a302d</code><span> compared with </span><code>b6419c2</code></p>
          <ul class="report-files">
            <li v-for="file in files" :key="file.name">
              <div class="file-heading">
                <strong>{{ file.name }}</strong>
                <span class="gap-change" :class="{ widened: file.delta > 0, narrowed: file.delta < 0 }">
                  {{ file.delta > 0 ? '+' : '' }}{{ file.delta }} pp
                </span>
              </div>
              <div class="coverage-meter" aria-hidden="true">
                <span class="associated" :style="{ width: file.associated + '%' }"></span>
                <span class="coverage-gap" :style="{ width: (file.suite - file.associated) + '%' }"></span>
              </div>
              <p>{{ file.associated }}% from associated test · {{ file.suite }}% from full suite</p>
            </li>
          </ul>
          <p class="report-key"><span aria-hidden="true"></span>
            The hatched area is coverage from other tests. Gap changes are shown in percentage points (pp).
          </p>
        </div>
      </figure>
    </section>

    <section class="hosted-section" aria-labelledby="workflow">
      <h2 id="workflow">From CI to coverage history</h2>
      <div class="capability-grid">
        <article>
          <h3>Track runs by branch</h3>
          <p>Upload reports with a project-scoped CI token. Find earlier runs by branch and commit.</p>
        </article>
        <article>
          <h3>Compare coverage gaps</h3>
          <p>See which gaps widened or narrowed between runs and drill into the files that changed.</p>
        </article>
        <article>
          <h3>Share and integrate</h3>
          <p>Public reports, README badges, and read access through REST and MCP are planned for the hosted rollout.</p>
        </article>
      </div>
    </section>

    <section id="plans" class="hosted-section" aria-labelledby="plans-title">
      <h2 id="plans-title">Plans</h2>
      <div class="plan-grid">
        <article class="plan">
          <p class="eyebrow">Free · Open source</p>
          <h3>TestParity CLI</h3>
          <p>For running coverage checks locally and in your own CI.</p>
          <ul>
            <li>Associated-test and full-suite coverage comparison</li>
            <li>Configurable coverage rules and CI gates</li>
            <li>GitHub pull request summaries</li>
          </ul>
          <a class="hosted-button" href="/guide/getting-started">Get started with the CLI</a>
        </article>
        <article class="plan hosted-plan">
          <p class="eyebrow">Early access</p>
          <h3>TestParity Hosted</h3>
          <p>For keeping report history and reviewing coverage changes between runs.</p>
          <ul>
            <li>Dashboard for multiple projects</li>
            <li>CI uploads and per-commit run history</li>
            <li>File-level gap changes between runs</li>
          </ul>
          <p class="plan-note">Paid plan pricing and limits will be announced before launch.</p>
          <a class="hosted-button primary" href="https://app.testparity.com/signup">Create a hosted account</a>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hosted-page {
  width: min(100% - 3rem, 75rem);
  margin-inline: auto;
  color: var(--p-ink);
}
.hosted-hero {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  padding-block: clamp(3.75rem, 8vw, 7rem);
}
.eyebrow {
  color: var(--p-own-strong);
  font: 650 .78rem/1.4 var(--vp-font-family-mono);
  letter-spacing: .04em;
  text-transform: uppercase;
}
h1, h2, h3 { font-weight: 750; }
h1 {
  margin: .65rem 0 1.1rem;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.03;
  letter-spacing: -.06em;
}
.hero-description { max-width: 34rem; font-size: clamp(1rem, 2vw, 1.2rem); line-height: 1.65; }
.hero-description, article p, .report-content p { color: var(--p-muted); }
.hosted-actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.65rem; }
.hosted-button {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: .55rem 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: .5rem;
  font-size: .95rem;
  font-weight: 700;
  line-height: 1.45;
}
.hosted-button:hover { border-color: var(--p-own-strong); color: var(--p-own-strong); }
.hosted-button.primary { background: var(--p-ink); border-color: var(--p-ink); color: var(--p-paper); }
.hosted-button.primary:hover { background: var(--p-own-strong); border-color: var(--p-own-strong); color: var(--p-paper); }
.report-preview {
  min-width: 0;
  border: 1px solid var(--p-line);
  border-radius: .9rem;
  background: var(--p-surface);
  box-shadow: 0 1.15rem 3rem rgba(4, 15, 33, .12);
  overflow: hidden;
}
.report-heading {
  display: flex;
  justify-content: space-between;
  gap: .5rem;
  align-items: center;
  padding: .85rem clamp(.9rem, 2vw, 1.4rem);
  border-bottom: 1px solid var(--p-line);
  font-weight: 700;
}
.report-caption, .report-files p, .report-key { font-size: .8rem; font-weight: 500; line-height: 1.45; }
.report-caption { color: var(--p-muted); }
.report-content { padding: 1rem clamp(.9rem, 2vw, 1.4rem); }
.report-context { display: flex; flex-wrap: wrap; align-items: center; gap: .45rem; font-size: .8rem; }
.report-context code {
  padding: .15rem .4rem;
  border-radius: .25rem;
  background: var(--vp-c-bg-alt);
  color: var(--p-ink);
}
.report-files { display: grid; gap: 1rem; margin: 1.15rem 0; }
.file-heading { display: flex; align-items: baseline; justify-content: space-between; gap: .4rem; }
.file-heading strong { font: 600 clamp(.65rem, 1.3vw, .86rem)/1.4 var(--vp-font-family-mono); overflow-wrap: anywhere; }
.gap-change { font-size: .82rem; font-weight: 750; white-space: nowrap; }
.gap-change.widened { color: var(--p-miss); }
.gap-change.narrowed { color: var(--p-own-strong); }
.coverage-meter { display: flex; height: .5rem; border-radius: .2rem; background: var(--p-empty); overflow: hidden; margin: .35rem 0; }
.associated { background: var(--p-own); }
.coverage-gap, .report-key span { background: var(--p-hatch); }
.report-key { display: flex; align-items: baseline; gap: .45rem; border-top: 1px solid var(--p-line); padding-top: .8rem; }
.report-key span { flex: 0 0 .8rem; height: .6rem; }
.hosted-section { padding-block: clamp(2rem, 5vw, 4rem); border-top: 1px solid var(--p-line); scroll-margin-top: var(--vp-nav-height); }
.hosted-section h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.2; letter-spacing: -.035em; margin-bottom: 1.5rem; }
.capability-grid, .plan-grid { display: grid; gap: 1rem; }
.capability-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.capability-grid article, .plan {
  background: var(--p-surface);
  border: 1px solid var(--p-line);
  border-radius: .75rem;
  padding: clamp(1rem, 3vw, 1.75rem);
}
article h3 { font-size: 1.2rem; line-height: 1.2; margin-bottom: .5rem; }
article p { line-height: 1.55; }
.plan-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.plan { display: flex; flex-direction: column; align-items: flex-start; }
.plan .eyebrow { color: var(--p-own-strong); margin-bottom: .6rem; }
.plan h3 { font-size: clamp(1.35rem, 2.5vw, 1.8rem); }
.plan ul { list-style: disc; padding-left: 1.15rem; margin: 1rem 0; }
.plan li + li { margin-top: .4rem; }
.plan .hosted-button { margin-top: auto; }
.plan .plan-note { margin-bottom: 1rem; font-size: .88rem; }
.hosted-plan { border-color: var(--p-own-strong); }
@media (max-width: 760px) {
  .hosted-hero, .capability-grid, .plan-grid { grid-template-columns: 1fr; }
  .hosted-hero { padding-block: 3rem; }
}
@media (max-width: 420px) {
  .hosted-page { width: calc(100% - 2rem); }
}
</style>
