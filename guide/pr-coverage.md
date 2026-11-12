# Changed-line coverage in pull requests

The `parity pr` command and the coding-agent skill require a CLI build that includes them. Until a tagged release ships them, use a checkout of the CLI's default branch, run `composer install` there, and substitute `php /path/to/cli/parity` for `parity` below.

Run from the project directory containing `parity.yaml`:

```sh
parity test --no-check
parity pr --base=origin/main
parity pr --base=origin/main --format=json
```

Set `--base` to the actual PR target. The command compares the merge base with the current working tree, including staged and unstaged tracked edits. Stage new source files to include them. The report uses the same structure paths, test naming, and `file_map` entries as `parity test`. It reads the directory configured under `test.reports`, which defaults to `.parity/per-test`. Use `--reports` if you generated reports at a different location. Use `--config` when the config is outside your current directory.

The report counts the changed executable lines covered by the associated test, covered only by unrelated tests, and uncovered in the collected reports. `parity test` collects one report for each test mapped to configured source, so tests outside those mappings cannot contribute attribution to this report. Matched coverage is the first count divided by the total number of changed executable lines in that file. The threshold comes from the structure's `matched-coverage` rule or the legacy matched-coverage settings. Deleted files and changes with no executable lines do not have a percentage. Renames use the destination path for matching. Coverage must be regenerated after source or test edits.

| Exit | Meaning |
| --- | --- |
| 0 | No gate failed. Files may still have gaps when no threshold is set. |
| 1 | A file failed its matched-coverage threshold or has changed executable lines with a missing associated test. |
| 2 | The input was invalid or attribution could not be established. |

The JSON report has `version`, `base`, `merge_base`, `status`, and `files`. Each file includes `path`, `previous_path`, `git_status`, `structure`, `associated_test`, `test_exists`, `changed_lines`, `associated_lines`, `unrelated_lines`, `uncovered_lines`, `matched_percent`, `threshold`, `passed`, and `status`. When attribution is unavailable, the percentage and gate result are null. Regenerate reports using a build that records executable line numbers. JSON input errors include `status: error` and an `error` message.

## GitHub Actions

Use a full-history checkout, fetch the PR's target ref, and generate fresh coverage before running the report. Keep the existing full-suite and coverage checks alongside the PR gate.

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
- name: Check changed-line coverage
  env:
    BASE_REF: ${{ github.base_ref }}
  run: |
    git fetch origin "$BASE_REF"
    parity test --no-check
    parity pr --base=FETCH_HEAD --format=json
```

## Coding-agent skill

Copy the entire `skills/testparity` directory from the CLI checkout into the agent's skills directory. For Codex project-local installation, place it at `.agents/skills/testparity`. Invoke it by asking “Use the testparity skill to review changed-line coverage against origin/main.”

In the plain PHP sample, a change to the multiplication return line was covered only by `DiscountPolicyTest`. The PR report returned 0% against the 40% threshold. After adding a zero-multiplication assertion to `CalculatorTest`, the same line moved into `associated_lines`, the report returned 100%, and the regular coverage check passed.
