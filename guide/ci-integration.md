# CI Integration

Use the shortest workflow supported by the coverage tool. If it already emits per-test attribution, generate the report and run `parity check`:

```yaml
- name: Run tests with coverage
  run: vendor/bin/phpunit --coverage-xml coverage-xml

- name: Run Parity
  run: parity check --format=json
```

Parity exits with `0` when all enforced checks pass and `1` when required inputs or enforced rules fail.

If the tool only emits aggregate Clover or Cobertura coverage, configure the `test` block and let Parity isolate each belonging test:

```yaml
- name: Generate per-test coverage and run Parity
  run: parity test --format=json
```

`parity test` writes the report directory configured by `test.reports` and runs `parity check` by default. Use `--no-check` only when generation and validation must be separate CI steps.
