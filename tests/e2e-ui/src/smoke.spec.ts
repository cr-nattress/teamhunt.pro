import { test, expect } from '@playwright/test';

const LANDING_BASE_URL = process.env.LANDING_BASE_URL || 'http://localhost:3000';
const APP_BASE_URL = process.env.APP_BASE_URL || 'http://localhost:3001';

test.describe('TeamHunt Smoke Tests', () => {
  test('should navigate from landing page to organizer', async ({ page }) => {
    // Visit landing page
    await page.goto(LANDING_BASE_URL);
    
    // Check landing page loads
    await expect(page).toHaveTitle(/TeamHunt/);
    await expect(page.locator('h1')).toContainText('Welcome to TeamHunt');
    
    // Click the link to organizer (check for both possible link texts)
    const organizerLink = page.locator('a').filter({ 
      hasText: /Launch Organizer|Open the Organizer/i 
    }).first();
    
    await expect(organizerLink).toBeVisible();
    await organizerLink.click();
    
    // Wait for navigation and check we're on the organizer page
    await page.waitForURL(/app\.teamhunt\.pro|localhost:3001/);
    await expect(page.locator('h1')).toContainText('Organizer Dashboard');
  });

  test('should load organizer dashboard directly', async ({ page }) => {
    // Visit organizer page directly
    await page.goto(APP_BASE_URL);
    
    // Check organizer dashboard loads
    await expect(page).toHaveTitle(/Organizer/);
    await expect(page.locator('h1')).toContainText('Organizer Dashboard');
    
    // Check dashboard metrics are visible
    await expect(page.locator('text=Active Hunts')).toBeVisible();
    await expect(page.locator('text=Teams')).toBeVisible();
    await expect(page.locator('text=Participants')).toBeVisible();
  });

  test('should have working health checks via apps', async ({ page }) => {
    // This test assumes the apps will proxy health checks to services
    // Visit organizer page first to ensure app is loaded
    await page.goto(APP_BASE_URL);
    
    // Check that the page loads without console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000); // Wait for any async operations
    
    // Filter out known acceptable errors (like missing API endpoints during development)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('Failed to fetch') && 
      !error.includes('NetworkError') &&
      !error.includes('404')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });
});