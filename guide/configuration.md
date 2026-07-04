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

coverage_xml: [coverage-xml, clover.xml, cobertura.xml]
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

Set `source_extension`, `test_suffix`, `test_extension`, and `namespace_separator` for the target ecosystem. The repository includes samples for PHP, Laravel-style PHP, Vite/TypeScript, AdonisJS-style TypeScript, and Rust.
