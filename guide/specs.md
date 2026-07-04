# Specs

Parity tracks public behavior with spec IDs. The canonical spec set lives in the CLI repository under `specs/`, and this website mirrors that full tree under `/specs/` so every requirement, acceptance scenario, edge case, and success criterion renders in the published docs.

Start with:

- [Full Specs Index](/specs/)
- [Traceability Matrix](/specs/TRACEABILITY)
- [Implementation Reference](/guide/reference)

| Spec | Area |
|------|------|
| [S001](/specs/001-cli-commands/) | CLI commands and interface |
| [S002](/specs/002-rules-system/) | Rules system |
| [S003](/specs/003-coverage-readers/) | Coverage readers |
| [S004](/specs/004-coverage-linkers/) | Coverage linkers |
| [S005](/specs/005-plugin-system/) | Plugin system |
| [S006](/specs/006-configuration/) | Configuration |
| [S007](/specs/007-path-namespace-mapping/) | Path and namespace mapping |
| [S008](/specs/008-output-formats/) | Output formats |
| [S009](/specs/009-documentation/) | Documentation system |
| [S010](/specs/010-testing-ci-binary/) | Testing, CI, and binary distribution |

New tests should reference the related spec IDs near the behavior they cover. This keeps implementation, docs, samples, and release checks traceable.
