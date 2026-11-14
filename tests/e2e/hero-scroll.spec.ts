import { expect, test } from '@playwright/test'

const samples = [
  { language: 'PHP', ownTest: 'CalculatorTest.php', all: '80%', own: '40%', lines: 33, foldedLines: 25, maxHeight: 248, repo: 'php-sample' },
  { language: 'JavaScript', ownTest: 'sum.test.js', all: '85.71%', own: '42.86%', lines: 25, repo: 'jest-sample' },
  { language: 'Rust', ownTest: 'lib_test.rs', all: '80%', own: '40%', lines: 21, foldedLines: 2, repo: 'rust-sample' },
]

for (const sample of samples) {
  test(`${sample.language} source scrolls independently of the hero coverage controls`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: sample.language }).click()

    const panel = page.getByRole('tabpanel', { name: sample.language })
    await expect(panel).toHaveAccessibleDescription(
      sample.foldedLines ? 'Scroll through the source or expand the hidden lines' : 'Scroll through the source',
    )
    await expect(panel.locator('.line:visible')).toHaveCount(sample.lines - (sample.foldedLines ?? 0))
    await expect(panel.locator('.line')).toHaveCount(sample.lines)
    await expect(panel).toHaveCSS('overflow-y', 'auto')
    expect(await panel.evaluate(element => element.clientHeight)).toBeLessThanOrEqual(sample.maxHeight ?? 208)
    await expect(page.locator('.meter-reading strong')).toHaveText(sample.all)
    const footerLink = page.getByRole('link', { name: 'Open this sample on GitHub' })
    await expect(footerLink).toHaveAttribute('href', `https://github.com/testparity/${sample.repo}`)

    if (sample.language === 'PHP') {
      await panel.scrollIntoViewIfNeeded()
      await expect(panel.locator('.is-own').filter({ hasText: 'return $left + $right' })).toBeInViewport()
      await expect(panel.locator('.is-borrowed').filter({ hasText: 'return $left * $right' })).toBeInViewport()
      await panel.locator('summary').filter({ hasText: 'lines 23–33' }).click()
    }

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

test('PHP boilerplate expands with the keyboard and collapses without renumbering the source', async ({ page }) => {
  await page.goto('/')
  const panel = page.getByRole('tabpanel', { name: 'PHP' })
  const disclosure = panel.locator('summary').first()
  const openingTag = panel.getByText('<?php', { exact: true })
  const namespace = panel.getByText('namespace App;', { exact: true })

  await expect(disclosure).toHaveText('Show lines 1–8', { useInnerText: true })
  await expect(openingTag).toBeHidden()
  await expect(namespace).toBeHidden()
  await expect(panel.locator('.line:visible .ln').first()).toHaveText('9')

  await disclosure.focus()
  await page.keyboard.press('Enter')
  await expect(openingTag).toBeVisible()
  await expect(namespace).toBeVisible()
  await expect(panel.locator('.line:visible .ln').first()).toHaveText('1')

  await disclosure.click()
  await expect(namespace).toBeHidden()
  await expect(panel.locator('.line:visible .ln').first()).toHaveText('9')
})
