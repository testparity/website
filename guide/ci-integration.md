# CI Integration

Run your normal test coverage command first, then run Parity.

```yaml
- name: Run tests with coverage
  run: vendor/bin/phpunit --coverage-xml coverage-xml

- name: Run Parity
  run: parity check --format=json
```

Parity exits with `0` when all enforced checks pass and `1` when required inputs or enforced rules fail.
