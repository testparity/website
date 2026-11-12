import { expect, test } from '@playwright/test'

const samples = [
  {
    language: 'PHP',
    ownTest: 'CalculatorTest.php',
    scores: ['80%', '40%'],
    methods: ['add()', 'subtract()', 'multiply()', 'divide()', 'maximum()'],
    borrowed: 'multiply()',
    excerptLines: ['21', '26'],
    source: 'php-sample/blob/HEAD/src/Calculator.php',
  },
  {
    language: 'JavaScript',
    ownTest: 'sum.test.js',
    scores: ['85.71%', '42.86%'],
    methods: ['sum()', 'difference()', 'product()', 'quotient()', 'maximum()', 'minimum()', 'module.exports'],
    borrowed: 'product()',
    excerptLines: ['10', '14'],
    source: 'jest-sample/blob/HEAD/code/src/sum.js',
  },
  {
    language: 'Rust',
    ownTest: 'lib_test.rs',
    scores: ['80%', '40%'],
    methods: ['double()', 'increment()', 'square()', 'absolute()', 'triple()'],
    borrowed: 'square()',
    excerptLines: ['12', '16'],
    source: 'rust-sample/blob/HEAD/src/lib.rs',
  },
]

for (const sample of samples) {
  test(`${sample.language} compares coverage by source item`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: sample.language }).click()

    const panel = page.getByRole('tabpanel', { name: sample.language })
    const matrix = panel.getByRole('table', { name: 'Coverage by source item' })
    await expect(matrix.getByRole('rowheader')).toHaveText(sample.methods)

    const all = matrix.getByRole('button', { name: `All tests ${sample.scores[0]}` })
    const own = matrix.getByRole('button', { name: `Own test: ${sample.ownTest}, ${sample.scores[1]}` })
    await expect(all).toHaveAttribute('aria-pressed', 'true')
    const borrowedRow = matrix.getByRole('row').filter({
      has: page.getByRole('rowheader', { name: sample.borrowed, exact: true }),
    })
    await expect(borrowedRow.getByRole('cell')).toHaveText(['Other tests', 'Uncovered'])
    await expect(panel.locator('.ln')).toHaveText(sample.excerptLines)

    await own.click()
    await expect(own).toHaveAttribute('aria-pressed', 'true')
    await expect(borrowedRow.locator('.active-column')).toHaveText('Uncovered')
    await expect(page.locator('.trace')).toHaveClass(/own-only/)
    await all.click()
    await expect(borrowedRow.locator('.active-column')).toHaveText('Other tests')
    await expect(page.getByRole('link', { name: 'View full source on GitHub' }))
      .toHaveAttribute('href', `https://github.com/testparity/${sample.source}`)
  })
}

test('the desktop matrix fits in a compact hero panel', async ({ browser, baseURL }) => {
  const page = await browser.newPage({ baseURL, viewport: { width: 1440, height: 900 } })
  try {
    await page.goto('/')
    const copyHeight = await page.locator('.hero-copy').evaluate(element => element.offsetHeight)
    for (const sample of samples) {
      await page.getByRole('tab', { name: sample.language }).click()
      await expect(page.getByRole('tabpanel', { name: sample.language })).toBeVisible()
      const matrixHeight = await page.locator('.trace').evaluate(element => element.offsetHeight)
      expect(matrixHeight).toBeLessThan(copyHeight)
    }
  } finally {
    await page.close()
  }
})
