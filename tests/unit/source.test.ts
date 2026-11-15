import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatCoverage, nextTab, sourceBlocks } from '../../.vitepress/theme/showcase/source.ts'
import type { Owner } from '../../.vitepress/theme/showcase/source.ts'

const code: Array<[string, Owner]> = [['<?php', null], ['return 1;', 'own'], ['return 2;', 'borrowed']]

test('folds the preamble without renumbering or relabeling source lines', () => {
  assert.deepEqual(sourceBlocks(code, 1), [
    { folded: true, lines: [{ number: 1, text: '<?php', owner: null }] },
    {
      folded: false,
      lines: [
        { number: 2, text: 'return 1;', owner: 'own' },
        { number: 3, text: 'return 2;', owner: 'borrowed' },
      ],
    },
  ])
  assert.deepEqual(sourceBlocks([code[1]]), [
    { folded: false, lines: [{ number: 1, text: 'return 1;', owner: 'own' }] },
  ])
})

test('wraps keyboard navigation at the first and last tabs', () => {
  assert.equal(nextTab('ArrowRight', 2, 3), 0)
  assert.equal(nextTab('ArrowLeft', 0, 3), 2)
  assert.equal(nextTab('ArrowRight', 0, 3), 1)
  assert.equal(nextTab('Tab', 0, 3), null)
})

test('formats both integral and fractional percentages', () => {
  assert.equal(formatCoverage(80), '80%')
  assert.equal(formatCoverage(42.857), '42.86%')
})
