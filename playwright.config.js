const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  timeout: 60000,
  use: {
    viewport: { width: 1280, height: 720 },
    actionTimeout: 60000
  }
});
