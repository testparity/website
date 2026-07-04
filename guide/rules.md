# Rules

Parity evaluates configured rules for every source file in each structure block.

| Rule | Purpose |
|------|---------|
| `test-exists` | Confirms the expected test file exists. |
| `enforce-coverage-link` | Confirms tests declare the source they cover. |
| `minimum-coverage` | Confirms all-test per-file coverage meets a threshold. |
| `matched-coverage` | Confirms the matching test covers enough executable lines. |
| `coverage-attribution` | Reports matching and incidental coverage attribution. |

Rules that accept `min` values require a number from `0` through `100`.
