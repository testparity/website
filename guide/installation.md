# Installation

Parity is distributed as a Composer package and can also be built as a PHAR for manual deployment.

## Requirements

- PHP 8.2 or newer
- Composer
- A coverage report produced by your project's test framework

## Composer

```bash
composer global require testparity/parity
parity --version
```

Make sure Composer's global bin directory is on your `PATH`.

## Manual PHAR Build

From the `parity/` package:

```bash
composer install
./vendor/bin/box compile --no-interaction
php parity.phar --version
```

Use the release checklist in `docs/RELEASE.md` before publishing a binary.
