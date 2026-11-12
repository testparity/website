import { expect, test } from '@playwright/test'

test('the source picker shows a single section for each language', async ({ page }) => {
  await page.goto('/')

  const source = page.locator('#method-source')
  const methods = page.getByRole('group', { name: 'Source sections' })
  await expect(source).toHaveAccessibleName('multiply source')
  await expect(source.locator('.ln')).toHaveText(['19', '20', '21', '22'])
  await expect(page.locator('.meter-reading strong')).toHaveText(['80%', '40%'])

  const divide = methods.getByRole('button', { name: /^divide / })
  await divide.click()
  await expect(divide).toHaveAttribute('aria-pressed', 'true')
  await expect(source).toContainText('intdiv($left, $right)')
  await expect(source).not.toContainText('function multiply')
  await page.getByRole('button', { name: 'Only CalculatorTest.php' }).click()
  await expect(divide).toHaveAccessibleName('divide Not covered')

  await page.getByRole('tab', { name: 'JavaScript' }).click()
  await expect(source).toHaveAccessibleName('product source')
  await methods.getByRole('button', { name: /^exports / }).click()
  await expect(source).toContainText('module.exports')
  await expect(page.locator('.meter-reading strong')).toHaveText(['85.71%', '42.86%'])

  await page.getByRole('tab', { name: 'JavaScript' }).press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'Rust' })).toBeFocused()
  await expect(source).toHaveAccessibleName('square source')
  await methods.getByRole('button', { name: /^triple / }).click()
  await expect(source).toContainText('value * 3')
  await expect(page.getByRole('link', { name: 'Open this sample on GitHub' }))
    .toHaveAttribute('href', 'https://github.com/testparity/rust-sample')
})
