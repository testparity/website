# Why Global Coverage Lies

Global coverage answers: "Did tests execute enough of the project?"

Parity asks the stricter question: "Does each file's matching test cover the file it is supposed to protect?"

## The Hidden Failure

| Metric | Result |
| --- | ---: |
| Project/global coverage | 80% |
| File coverage from all tests | 70% |
| Coverage from the matching test file | 40% |
| Incidental covering tests | 2 |

The 70% file coverage can look acceptable because integration, smoke, or workflow tests touched the same lines. That does not prove the matching test owns the behavior.

## The Parity Signal

`minimum-coverage` reads all-test file coverage:

```yaml
- minimum-coverage:
    min: 70
```

`matched-coverage` reads only lines covered by the expected matching test file:

```yaml
- matched-coverage:
    min: 40
```

`coverage-attribution` reports how many tests covered the file and how many were non-matching.

```json
{
  "minimum-coverage": { "value": "70%" },
  "matched-coverage": { "value": "40%" },
  "coverage-attribution": { "value": "3|2" }
}
```

`3|2` means three tests covered at least one line in the file, and two of them were incidental non-matching tests.
