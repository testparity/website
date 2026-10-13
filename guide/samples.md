# Samples

Each public sample runs a real test suite in a different ecosystem and proves that Parity catches what global coverage hides. The samples are split into individual repositories so each one installs the public Packagist package during CI and proves the release path without private tokens.

No sample commits coverage results. In CI, every sample runs its native suite, then `parity test` runs each belonging test file in isolation, normalizes the per-test coverage into `.parity/per-test`, and checks it.

| Sample | Language/framework | Test runner | Per-test coverage | Repository |
| --- | --- | --- | --- | --- |
| PHP | Plain PHP | PHPUnit | Clover (Xdebug) | [php-sample](https://github.com/testparity/php-sample) |
| Laravel | Laravel-style PHP | PHPUnit | Clover (Xdebug) | [laravel-sample](https://github.com/testparity/laravel-sample) |
| TypeScript | TypeScript utility | `node:test` via `tsx` | Clover (c8) | [typescript-sample](https://github.com/testparity/typescript-sample) |
| AdonisJS | AdonisJS 7 | Japa (`node ace test`) | Clover (c8) | [adonisjs-sample](https://github.com/testparity/adonisjs-sample) |
| Rust | Plain Rust | Cargo integration tests | Cobertura (`cargo llvm-cov`) | [rust-sample](https://github.com/testparity/rust-sample) |
| Cargo | Cargo project | Cargo integration tests | Cobertura (`cargo llvm-cov`) | [cargo-sample](https://github.com/testparity/cargo-sample) |
| PHPUnit | PHP | PHPUnit | Clover (Xdebug) | [phpunit-sample](https://github.com/testparity/phpunit-sample) |
| Pest | PHP | Pest | Clover (Xdebug) | [pest-sample](https://github.com/testparity/pest-sample) |
| Jest | JavaScript | Jest | Clover | [jest-sample](https://github.com/testparity/jest-sample) |
| Mocha | JavaScript | Mocha + NYC | Clover | [mocha-sample](https://github.com/testparity/mocha-sample) |
| Vitest | TypeScript | Vitest | Clover | [vitest-sample](https://github.com/testparity/vitest-sample) |

## The Proof

Every sample has one weakly owned file and one strongly owned file. In the weak file, the belonging test covers only part of the code, and another test file covers the rest incidentally. Global coverage passes. Parity's `matched-coverage` rule shows how much the belonging test covers by itself, and `coverage-attribution` reports `2|1`: two tests cover the file, and one of them does not belong to it.

| Sample | Weakly owned file | All tests | Belonging test only | Project total |
| --- | --- | ---: | ---: | ---: |
| PHP | `src/Calculator.php` | 80% | 40% | 85.71% |
| Laravel | `app/Services/InvoiceTotal.php` | 80% | 40% | 85.71% |
| TypeScript | `src/formatCurrency.ts` | 80% | 44% | 81.48% |
| AdonisJS | `app/services/user_presenter.ts` | 84% | 44% | 85.19% |
| Rust | `src/lib.rs` | 80% | 40% | 84.21% |
| Cargo | `src/lib.rs` | 80% | 40% | 84.21% |
| PHPUnit | `code/src/InvoiceCalculator.php` | 80% | 40% | 85.71% |
| Pest | `code/src/Slugger.php` | 80% | 40% | 85.71% |
| Jest | `code/src/sum.js` | 85.71% | 42.86% | 88.89% |
| Mocha | `code/src/greeting.js` | 85.71% | 42.86% | 88.89% |
| Vitest | `code/src/formatCurrency.ts` | 100% | 50% | 100% |

The Vitest sample is the sharpest case: the project has 100% global coverage, but the belonging test still covers only half of `formatCurrency.ts`.

Each sample README documents its exact source files, tests, and thresholds.

## CI Contract

Every sample CI installs Parity from Packagist, removes any stale evidence, and generates fresh per-test coverage:

```bash
composer global require "testparity/parity:^1.2" --prefer-dist --no-progress --no-interaction
rm -rf -- .parity
parity test --config=parity.yaml --format=json --show-tests
```

That makes the samples useful as release proof, not just documentation examples.

## Bring Your Own Attribution

When a runner cannot emit per-test coverage, `parity test` produces it by running each belonging test file separately. Custom converters can instead write [`parity-coverage.json`](/guide/parity-coverage-json), a language-neutral format that records which tests covered each line.
