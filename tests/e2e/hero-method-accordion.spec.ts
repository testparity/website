import { expect, test } from '@playwright/test'

const samples = [
  { language: 'PHP', borrowed: 'multiply', own: 'add', ownTest: 'CalculatorTest.php', total: '80%', ownTotal: '40%', borrowedLine: 'return $left * $right;', ownLine: 'return $left + $right;', sections: 5 },
  { language: 'JavaScript', borrowed: 'product', own: 'sum', ownTest: 'sum.test.js', total: '85.71%', ownTotal: '42.86%', borrowedLine: 'return left * right', ownLine: 'return left + right', sections: 7 },
  { language: 'Rust', borrowed: 'square', own: 'double', ownTest: 'lib_test.rs', total: '80%', ownTotal: '40%', borrowedLine: 'value * value', ownLine: 'value * 2', sections: 5 },
]

for (const sample of samples) {
  test(`${sample.language} reveals one coverage section at a time`, async ({ page }) => {
    await page.goto('/')
    await page.getByRole('tab', { name: sample.language }).click()

    const panel = page.getByRole('tabpanel', { name: sample.language })
    const borrowed = panel.getByRole('button', { name: `${sample.borrowed} Other test`, exact: true })
    const borrowedSource = panel.getByRole('region', { name: `${sample.borrowed} source` })
    const own = panel.getByRole('button', { name: `${sample.own} Own test`, exact: true })
    const ownSource = panel.getByRole('region', { name: `${sample.own} source` })

    await expect(panel.getByRole('button')).toHaveCount(sample.sections)
    await expect(borrowed).toHaveAttribute('aria-expanded', 'true')
    await expect(borrowedSource).toContainText(sample.borrowedLine)
    await expect(ownSource).toBeHidden()

    await own.click()
    await expect(borrowed).toHaveAttribute('aria-expanded', 'false')
    await expect(borrowedSource).toBeHidden()
    await expect(ownSource).toContainText(sample.ownLine)
    await own.press('Enter')
    await expect(ownSource).toBeHidden()

    await expect(page.locator('.meter-reading strong')).toHaveText(sample.total)
    await page.getByRole('button', { name: `Only ${sample.ownTest}` }).click()
    await expect(page.locator('.meter-reading strong')).toHaveText(sample.ownTotal)
    await expect(panel.getByRole('button', { name: `${sample.borrowed} Not covered`, exact: true })).toBeVisible()
  })
}
