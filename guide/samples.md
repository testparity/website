# Samples

Each public sample demonstrates the same Parity proof in a different ecosystem. The samples are split into individual repositories so each one can install the public Packagist package during CI and prove the release path without private tokens.

| Sample | Language/framework | Test runner | Coverage input | Repository |
| --- | --- | --- | --- | --- |
| PHP | Plain PHP | Fixture coverage | Parity JSON | [php-sample](https://github.com/testparity/php-sample) |
| Laravel | Laravel-style PHP | Fixture coverage | Parity JSON | [laravel-sample](https://github.com/testparity/laravel-sample) |
| TypeScript | TypeScript utility | Fixture coverage | Parity JSON | [typescript-sample](https://github.com/testparity/typescript-sample) |
| AdonisJS | AdonisJS-style TypeScript | Fixture coverage | Parity JSON | [adonisjs-sample](https://github.com/testparity/adonisjs-sample) |
| Rust | Plain Rust | Fixture coverage | Parity JSON | [rust-sample](https://github.com/testparity/rust-sample) |
| Cargo | Cargo project | Cargo | Parity JSON | [cargo-sample](https://github.com/testparity/cargo-sample) |
| PHPUnit | PHP | PHPUnit | Parity JSON | [phpunit-sample](https://github.com/testparity/phpunit-sample) |
| Pest | PHP | Pest | Parity JSON | [pest-sample](https://github.com/testparity/pest-sample) |
| Jest | JavaScript | Jest | Parity JSON | [jest-sample](https://github.com/testparity/jest-sample) |
| Mocha | JavaScript | Mocha + NYC | Parity JSON | [mocha-sample](https://github.com/testparity/mocha-sample) |
| Vitest | TypeScript | Vitest | Parity JSON | [vitest-sample](https://github.com/testparity/vitest-sample) |

## The Proof

Every sample is built around the same coverage shape:

| Scope | Coverage |
| --- | ---: |
| Project/global coverage | 80% |
| Weaker file, all tests | 70% |
| Weaker file, matching test only | 40% |
| Stronger file, all tests | 90% |
| Stronger file, matching test only | 90% |

This proves that healthy global coverage can hide thin direct tests. Parity exposes that gap with `matched-coverage` and `coverage-attribution`.

## Attribution Format

The samples use `parity-coverage.json`, a language-neutral attribution file:

```json
{
  "version": 1,
  "globalPercent": 80,
  "files": [
    {
      "path": "src/formatCurrency.ts",
      "coveragePercent": 70,
      "totalExecutableLines": 10,
      "lines": [
        {
          "line": 1,
          "coveredBy": ["formatCurrency.test::coversPrimaryBehavior"]
        }
      ]
    }
  ]
}
```

## CI Contract

Each sample runs the public package:

```bash
composer global require testparity/parity --prefer-dist --no-progress --no-interaction
parity check --format=json
```

That makes the samples useful as release proof, not just documentation examples.
