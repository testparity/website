import { expect, test } from '@playwright/test'

const samples = [
  { language: 'PHP', test: 'CalculatorTest.php', all: '80%', own: '40%', lines: [11, 16, 21, 26, 31], total: 33, repo: 'php-sample' },
  { language: 'JavaScript', test: 'sum.test.js', all: '85.71%', own: '42.86%', lines: [2, 6, 10, 14, 18, 22, 25], total: 25, repo: 'jest-sample' },
  { language: 'Rust', test: 'lib_test.rs', all: '80%', own: '40%', lines: [4, 8, 12, 16, 20], total: 21, repo: 'rust-sample' },
]

for (const sample of samples) {
  test(`${sample.language} shows a folded source preview and can reveal the full file`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: sample.language }).click()

    const panel = page.getByRole('tabpanel', { name: sample.language })
    const lineNumbers = panel.locator('.ln')
    await expect(lineNumbers).toHaveText(sample.lines.map(String))
    await expect(panel.locator('.is-own').first()).toBeVisible()
    await expect(panel.locator('.is-borrowed').first()).toBeVisible()
    await expect(panel.locator('.is-none').first()).toBeVisible()
    await expect(page.locator('.meter-reading strong')).toHaveText([sample.all, sample.own])

    const ownTest = page.getByRole('button', { name: `Only ${sample.test}` })
    await ownTest.click()
    await expect(ownTest).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('.meter-reading .is-active strong')).toHaveText(sample.own)
    await expect(page.locator('.meter-bar .borrowed')).toHaveCSS('width', '0px')

    const expand = page.getByRole('button', { name: `Full source (${sample.total} lines)` })
    await expect(expand).toHaveAttribute('aria-expanded', 'false')
    await expand.click()
    await expect(lineNumbers).toHaveText(Array.from({ length: sample.total }, (_, i) => String(i + 1)))
    const collapse = page.getByRole('button', { name: 'Collapse source' })
    await expect(collapse).toHaveAttribute('aria-expanded', 'true')
    await collapse.click()
    await expect(lineNumbers).toHaveText(sample.lines.map(String))
    await expect(page.getByRole('link', { name: 'Open this sample on GitHub' }))
      .toHaveAttribute('href', `https://github.com/testparity/${sample.repo}`)
  })
}

test('folding the source shortens the desktop hero', async ({ browser, baseURL }) => {
  const page = await browser.newPage({ baseURL, viewport: { width: 1440, height: 900 } })
  try {
    await page.goto('/')

    const demo = page.locator('.trace')
    const collapsedHeight = await demo.evaluate(element => element.offsetHeight)
    await page.getByRole('button', { name: 'Full source (33 lines)' }).click()
    const expandedHeight = await demo.evaluate(element => element.offsetHeight)
    expect(collapsedHeight).toBeLessThan(expandedHeight / 2)
  } finally {
    await page.close()
  }
})
