import { defineConfig } from '@playwright/test';
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
    baseURL: process.env.API_BASE_URL || 'http://localhost:8888',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  },

  // No browser needed for API tests
  projects: [
    {
      name: 'API Tests',
      use: {},
    },
  ],
});