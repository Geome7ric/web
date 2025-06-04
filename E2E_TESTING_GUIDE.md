# E2E Testing Guide - Geome7ric Landing

This guide provides information about running and maintaining the E2E tests for the Geome7ric Landing website.

## Overview

The E2E tests use [Playwright](https://playwright.dev/) to simulate user behavior and test critical user flows in the application. These tests run in real browsers and validate that the application works correctly from the user's perspective.

## Test Files

| Test File | Description | Priority |
|-----------|-------------|----------|
| `calendly-integration.spec.ts` | Tests the Calendly scheduling functionality | High |
| `contact-form.spec.ts` | Tests the contact form submission | High |
| `main-functionality.spec.ts` | Tests core site functionality | Medium |

## Running E2E Tests

### Prerequisites

- Node.js installed
- At least 500MB of free disk space
- Project dependencies installed (`npm install`)
- Playwright browsers installed (`npx playwright install` or `npm run playwright:install`)

### Commands

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (helpful for debugging)
npm run test:e2e:ui

# Run in headed mode (shows the browser)
npm run test:e2e:headed

# Run a specific test file
npx playwright test tests/e2e/contact-form.spec.ts
```

## Maintenance Guidelines

### When to Update Tests

- When adding new UI components
- When changing existing UI components
- When modifying user flows
- When adding new features

### Keeping Tests Resilient

1. **Use data attributes for selection**: Prefer `data-testid` attributes over CSS selectors
2. **Graceful handling**: Use conditional checks for elements that might not exist
3. **Test isolation**: Each test should be independent and not rely on other tests

### Handling Flakiness

If tests are flaky (sometimes pass, sometimes fail):

1. Increase timeouts or add wait conditions
2. Make selectors more specific
3. Add retries for specific tests
4. Consider using test.describe.configure({ retries: 2 })

## Visual Testing

Currently, the E2E tests verify functionality but not visual appearance. For visual regression testing, consider adding:

1. Playwright's `screenshot` functionality
2. Visual comparison tools

## Test Reports

After running tests, reports are available at:
- HTML report: `playwright-report/index.html`
- Test results: `test-results/`

## Common Issues

### Disk Space Problems

If you encounter disk space errors:
- Run `npx playwright install --with-deps chromium` to install only Chromium
- Use `PLAYWRIGHT_BROWSERS_PATH` environment variable to specify an alternate location

### Slow Tests

If tests are slow:
- Reduce the number of browser configurations in `playwright.config.ts`
- Run tests in parallel with more workers
- Use `test.slow()` for tests that are legitimately slow

## Recommended Workflow

1. Write/update E2E tests locally
2. Run them in UI mode to debug
3. Ensure they pass consistently
4. Commit changes
5. CI will validate tests on PR
