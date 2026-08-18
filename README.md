[![Playwright Tests](https://github.com/VishalThapaliya/qa-automation-playwrite/actions/workflows/playwright.yml/badge.svg)](https://github.com/VishalThapaliya/qa-automation-playwrite/actions/workflows/playwright.yml)

# Saucedemo E2E Test Suite - Playwright + TypeScript

Automated end-to-end tests for saucedemo.com and API testings for jsonplaceholder.typicode.com, built to practice production-style test-design: Page Object Model, web-first assertions, cross-browser runs, and data-correctness checks (not just navigation checks).

## Stack
- Playwright Test Runner + TypeScript
- Page Object Model Architecture
- GitHub Actions CI (runs on every push)

## What's covered
- Login (valid credentials, POM-based)
- Full checkout flow (cart -> checkout -> confimration)
- Common assertion patterns (visibility, count, attributes, text)
- API mocking: real endpoint shapes + error states (500, 404, 401, malformed JSON, slow response, empty state)
- Sort correctness (verifies actual data order, not just that sorting ran)

## Running locally
\`\`\`bash
npm install
npx playwright install
npx playwright test
\`\`\`

## Viewing the report
\`\`\`bash
npx playwright show-report
\`\`\`