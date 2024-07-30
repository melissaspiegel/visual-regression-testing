# Playwright Visual Regression Testing

A project to perform visual regression testing on multiple URLs across various devices using Playwright.

## Table of Contents

- [Playwright Visual Regression Testing](#playwright-visual-regression-testing)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Demo

Demo video coming soon. View the test results and screenshots in the Playwright report generated after running the tests.

## Features

- Visual regression testing for multiple URLs.
- Testing across different devices (desktop and mobile).
- Automatic screenshot comparison and reporting.
- Easy setup and configuration.

## Installation

To set up and install this project, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/playwright-visual-regression.git

cd playwright-visual-regression

npm install
```

## Usage

To run the visual regression tests, use the following command:
```bash
npx playwright test

npx playwright test --update-snapshots
```

## Configuration

To configure the project, you can modify the playwright.config.ts file and the test files located in the tests directory.

Example Configuration in playwright.config.ts:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    use: {
        baseURL: 'https://zerotier.local:54530',
        ignoreHTTPSErrors: true, // Ignore SSL errors
        trace: 'on', // Record trace for each test
        screenshot: 'only-on-failure', // Take screenshots only on test failures
    },
    retries: 1,
    reporter: [['list'], ['html', { open: 'always' }]], // Generate and always open the HTML report
});

```


## Acknowledgments

	•	[Playwright](https://playwright.dev) - For their amazing browser automation tools.




