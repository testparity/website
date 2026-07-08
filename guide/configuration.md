# Configuration

Parity reads `parity.yaml` from the current project root, or from `--config`.

```yaml
settings:
  namespace_roots:
    app: App
    tests: Tests
  source_extension: ".php"
  test_suffix: "Test"
  test_extension: ".php"
  namespace_separator: "\\"

coverage_xml: [.parity/per-test, parity-coverage.json, coverage-xml, clover.xml, cobertura.xml]
min_coverage: 80
min_coverage_global: 80

structure:
  - name: "Unit Services"
    paths:
      source: "app/Services"
      test: "tests/Unit/Services"
    rules:
      - enforce-coverage-link
      - minimum-coverage:
          min: 80
```

## Multi-Language Layouts

Set `source_extension`, `test_suffix`, `test_extension`, and `namespace_separator` for the target ecosystem. The public samples cover PHP, Laravel-style PHP, TypeScript, AdonisJS-style TypeScript, Rust, PHPUnit, Pest, Jest, Mocha, Vitest, and Cargo.

Use language-specific coverage tooling to produce a supported report, then point `coverage_xml` at the report or an ordered fallback list.

| Ecosystem | Typical artifact | Notes |
| --- | --- | --- |
| PHP + PHPUnit | `coverage-xml/`, `clover.xml` | Use PHPUnit XML for attribution; Clover for fallback. |
| PHP + Pest | `coverage-xml/`, `clover.xml` | Pest can also validate `->covers()` ownership links. |
| JavaScript + Jest | `clover.xml`, `parity-coverage.json` | Use Parity JSON when a converter can provide attribution. |
| JavaScript + Mocha/NYC | `clover.xml`, `parity-coverage.json` | Clover supports per-file thresholds only. |
| TypeScript + Vitest | `clover.xml`, `cobertura.xml`, `parity-coverage.json` | Change extensions and suffixes for Vite layouts. |
| Rust + Cargo | `cobertura.xml`, `parity-coverage.json` | Cobertura is a common aggregate coverage exchange format. |
