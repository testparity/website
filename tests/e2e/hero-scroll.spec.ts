import { expect, test } from '@playwright/test'

const samples = [
  { language: 'PHP', ownTest: 'CalculatorTest.php', all: '80%', own: '40%', lines: 33, repo: 'php-sample' },
  { language: 'JavaScript', ownTest: 'sum.test.js', all: '85.71%', own: '42.86%', lines: 25, repo: 'jest-sample' },
  { language: 'Rust', ownTest: 'lib_test.rs', all: '80%', own: '40%', lines: 21, repo: 'rust-sample' },
]

for (const sample of samples) {
  test(`${sample.language} source scrolls independently of the hero coverage controls`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: sample.language }).click()

    const panel = page.getByRole('tabpanel', { name: sample.language })
    await expect(panel).toHaveAccessibleDescription(`Scroll to view all ${sample.lines} lines`)
    await expect(panel.locator('.line')).toHaveCount(sample.lines)
    await expect(panel).toHaveCSS('overflow-y', 'auto')
    expect(await panel.evaluate(element => element.clientHeight)).toBeLessThanOrEqual(208)
    await expect(page.locator('.meter-reading strong')).toHaveText(sample.all)
    const footerLink = page.getByRole('link', { name: 'Open this sample on GitHub' })
    await expect(footerLink).toHaveAttribute('href', `https://github.com/testparity/${sample.repo}`)

    await panel.focus()
    await page.keyboard.press('End')
    await expect.poll(() => panel.evaluate(element => element.scrollTop + element.clientHeight))
      .toBe(await panel.evaluate(element => element.scrollHeight))
    await expect(panel.locator('.line').last()).toBeInViewport()

    await page.getByRole('button', { name: `Only ${sample.ownTest}` }).click()
    await expect(page.locator('.meter-reading strong')).toHaveText(sample.own)
    await expect(page.locator('.trace')).toHaveClass(/own-only/)
    expect(await panel.evaluate(element => element.scrollTop)).toBeGreaterThan(0)
  })
}
