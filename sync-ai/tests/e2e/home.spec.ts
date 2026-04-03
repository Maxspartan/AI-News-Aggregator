import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/SyncAI/)
  })

  test('should display header with logo', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('SyncAI')).toBeVisible()
    await expect(page.getByRole('button', { name: /search/i })).toBeVisible()
  })

  test('should display bottom navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /saved/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /settings/i })).toBeVisible()
  })

  test('should navigate to saved page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /saved/i }).click()
    await expect(page).toHaveURL(/\/saved/)
    await expect(page.getByText('Saved Articles')).toBeVisible()
  })

  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /settings/i }).click()
    await expect(page).toHaveURL(/\/settings/)
    await expect(page.getByText('Settings')).toBeVisible()
  })

  test('visual regression - home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('home-page.png', {
      fullPage: true,
    })
  })

  test('visual regression - mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveScreenshot('home-mobile.png', {
      fullPage: true,
    })
  })
})
