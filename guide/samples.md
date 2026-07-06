# Samples

Each public sample demonstrates the same Parity proof in a different ecosystem:

| Sample | Focus | Repository |
| --- | --- | --- |
| PHP | Plain PHP source and tests | [php-sample](https://github.com/testparity/php-sample) |
| Laravel | Laravel-style service tests | [laravel-sample](https://github.com/testparity/laravel-sample) |
| TypeScript | Vite-style TypeScript utility | [typescript-sample](https://github.com/testparity/typescript-sample) |
| AdonisJS | AdonisJS-style TypeScript service | [adonisjs-sample](https://github.com/testparity/adonisjs-sample) |
| Rust | Plain Rust source and tests | [rust-sample](https://github.com/testparity/rust-sample) |
| Cargo | Runnable Cargo project | [cargo-sample](https://github.com/testparity/cargo-sample) |
| PHPUnit | Runnable PHPUnit project | [phpunit-sample](https://github.com/testparity/phpunit-sample) |
| Pest | Runnable Pest project | [pest-sample](https://github.com/testparity/pest-sample) |
| Jest | Runnable Jest project | [jest-sample](https://github.com/testparity/jest-sample) |
| Mocha | Runnable Mocha project | [mocha-sample](https://github.com/testparity/mocha-sample) |
| Vitest | Runnable Vitest project | [vitest-sample](https://github.com/testparity/vitest-sample) |

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
