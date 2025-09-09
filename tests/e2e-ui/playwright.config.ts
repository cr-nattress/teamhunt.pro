import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

export default defineConfig({
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html']],
  
  use: {
    baseURL: process.env.APP_BASE_URL || 'http://localhost:3001',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Desktop Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  webServer: process.env.CI ? undefined : [
    {
      command: 'pnpm --filter @teamhunt/landing dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --filter @teamhunt/organizer dev',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    }
  ],
});