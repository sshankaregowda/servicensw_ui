# Service NSW Playwright Automation Framework

## Framework Overview

This is a Service NSW end to end tests playwright automation framework. It is written in typescript language. It supports page object model pattern.It can capture logs, takes screenshot on failure and generate allure test execution report. It is data driven framework as well.It can run in different environements like SIT, UAT using dotenv feature. Currectly it runs for chrome only

## Framework Structure

```text
ServiceNSW_UI_playwright
├── .github/
│   └── workflows/
│       └── playwright.yml            # GitHub Actions CI pipeline
├── data/
│   └── service-test-data.json        # test input data
├── env/
│   ├── .env.sit                      # SIT environment config
│   └── .env.uat                      # UAT environment config
├── node_modules/                     # Installed npm dependencies
├── logs/
│   └── test-execution.log            # Test execution logs
├── allure-results/                   # Raw Allure test results
├── allure-report/                    # Generated Allure HTML report
├── pages/
│   ├── BasePage.ts                   # Common page actions
│   ├── HomePage.ts                   # Homepage page object
│   ├── SearchResultsPage.ts          # Search results page object
│   └── ServiceDetailsPage.ts         # Service details page object
├── fixtures/
│   └── testFixtures.ts               # Custom Playwright fixtures
├── screenshots/                      # Failure screenshots
├── tests/
│   └── service-nsw.e2e.spec.ts       # E2E test scenarios
├── utils/
│   ├── env.ts                        # dotenv environment loader
│   └── logger.ts                     # Winston logger setup
├── .gitignore                        # Files and folders ignored by Git
├── playwright.config.ts              # Playwright configuration
├── package.json                      # Scripts and dependencies
└── tsconfig.json                     # TypeScript configuration
```

## Steps to Execute

1. Log in to GitHub and clone the repository:

```bash
git clone <repository-url>
```

2. Go to the project folder:

```bash
cd ServiceNSW_UI_Playwright
```

3. Install project dependencies:

```bash
npm install
```

4. Run the SIT test suite:

```bash
npm run test:sit
```

5. Generate the Allure report after test execution:

```bash
npm run allure:generate
```

6. Open the Allure report:

```bash
npm run allure:open
```

The SIT command runs the tests against the SIT environment using the configured Chrome browser project. Review the Allure report to see the test execution results.
