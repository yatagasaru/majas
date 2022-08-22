import type {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
  // globalSetup: './tests/setup/global.setup.ts',
  webServer: [
    {
      command:
        process.env.SKIP_BUILD === '1'
          ? 'npm start'
          : 'npm run build && npm start',
      timeout: 60 * 1000,
      port: 3000,
      reuseExistingServer: !process.env.CI
    }
  ],
  reporter: 'html'
}

export default config
