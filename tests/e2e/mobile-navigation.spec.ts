import { expect, test } from '@playwright/test'

test('mobile navigation fills the viewport and remains interactive', async ({ page }) => {
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'mobile navigation' })
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')

  await menuButton.click()
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true')

  const menu = page.locator('#VPNavScreen')
  await expect(menu).toBeVisible()
  await expect(menu).toHaveCSS('position', 'fixed')
  await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')

  const menuBox = await menu.boundingBox()
  expect(menuBox).not.toBeNull()
  expect(menuBox!.width).toBe(390)
  expect(menuBox!.height).toBeGreaterThan(760)

  const variants = menu.getByRole('button', { name: 'Variants' })
  await variants.click()
  await expect(variants).toHaveAttribute('aria-expanded', 'true')
  await expect(menu.getByRole('link', { name: 'All Variations' })).toBeVisible()

  await menuButton.click()
  await expect(menu).toHaveCount(0)
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')

  await menuButton.click()
  await page.locator('#VPNavScreen').getByRole('link', { name: 'Guide' }).click()

  await expect(page).toHaveURL(/\/guide\/getting-started$/)
  await expect(page.locator('#VPNavScreen')).toHaveCount(0)
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
})
