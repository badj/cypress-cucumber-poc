# Cypress Cucumber POC

> A proof of concept project to showcase the implementation of [Cypress](https://www.cypress.io/) as a test framework with [Cucumber BDD](https://cucumber.io/) and [Mochawesome reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) integration to test the checkout flow for the ["Test Automation - Big Cartel E-commerce Test Store"](https://testautomation.bigcartel.com/).

---
### Table of contents

- [Overview](#overview)
- [Test Scenarios](#test-scenarios)
- [Pre requisites](#prerequisites)
- [Setup](#setup)
- [Running tests](#running-tests)
- [Viewing test results](#viewing-test-results)
- [CI/CD Pipeline](#cicd-pipeline)
- [Additional notes](#additional-notes)
- [Gotcha's](#gotchas)
- [Unresolved issues - Work in progress and being monitored](#unresolved-issues---work-in-progress-and-being-monitored)
  - [1. Firefox runner fails to capture the video recording](#1-firefox-runner-fails-to-capture-the-video-recording)
  - [2. Test scenarios, steps previously disabled and temporary scenarios added to handle Cloudflare security checks triggered on cart and checkout pages:](#2-test-scenarios-steps-previously-disabled-and-temporary-scenarios-added-to-handle-cloudflare-security-checks-triggered-on-cart-and-checkout-pages)
    - [2.1. Previously disabled Scenario: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout](#21-previously-disabled-scenario-add-item-to-cart--continue-to-cart--verify-cart-details--continue-the-checkout)
    - [2.2. Previously disabled Scenario Outline: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout](#22-previously-disabled-scenario-outline-add-item-to-cart--continue-to-cart--verify-cart-details--continue-the-checkout)
    - [2.3. Previous temporary Scenario: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered](#23-previous-temporary-scenario-add-item-to-cart--continue-to-cart--cloudflare-security-check-page-is-triggered)
    - [2.4. Previous temporary Scenario Outline: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered](#24-previous-temporary-scenario-outline-add-item-to-cart--continue-to-cart--cloudflare-security-check-page-is-triggered)
    - [⚠️ If scenarios are not disabled then the Scenarios for the local test runs will fail with the following failures error outputs sample for 2.3 and 2.4](#if-scenarios-are-not-disabled-then-the-scenarios-for-the-local-test-runs-will-fail-with-the-following-failures---error-outputs-samples-for-23-and-24)

---


[2. Test scenarios, steps previously disabled and temporary scenarios added to handle Cloudflare security checks triggered on cart and checkout pages:](#2-test-scenarios-steps-previously-disabled-and-temporary-scenarios-added-to-handle-cloudflare-security-checks-triggered-on-cart-and-checkout-pages)
[2.1. Previously disabled Scenario: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout](#21-previously-disabled-scenario-add-item-to-cart--continue-to-cart--verify-cart-details--continue-the-checkout)
[2.2. Previously disabled Scenario Outline: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout](#22-previously-disabled-scenario-outline-add-item-to-cart--continue-to-cart--verify-cart-details--continue-the-checkout)
[2.3. Previous temporary Scenario: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered](#23-previous-temporary-scenario-add-item-to-cart--continue-to-cart--cloudflare-security-check-page-is-triggered)
[2.4. Previous temporary Scenario Outline: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered](#24-previous-temporary-scenario-outline-add-item-to-cart--continue-to-cart--cloudflare-security-check-page-is-triggered)
### Overview

This repository demonstrates:

- **Cypress Testing Framework**: Utilises [Cypress Studio](https://docs.cypress.io/app/guides/cypress-studio) for test recording - [follow this guide to record test steps with Cypress Studio](https://docs.cypress.io/app/guides/cypress-studio#Step-1---Run-the-spec).
- **Cucumber BDD**: Implemented Behaviour-Driven Development for structured, readable test scenarios.
- **Mochawesome Reporter**: Generates detailed test result reports.
- **Local Execution**: Run tests locally with multiple browser options.
- **CI/CD Integration**: Executes tests in a [Docker container](https://www.docker.com/) via [GitHub Actions](https://github.com/badj/cypress-cucumber-poc/actions), triggered on push/pull requests to the main branch and daily scheduled runs.

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Test Scenarios

This project includes Cypress feature tests covering the following e-commerce checkout journeys:

- Contact page: Submit a contact enquiry ➝ triggers recaptcha.
- Search for an item in the store.
- View a product from search results.
- Select colour and age options from dropdowns.
- Increase item quantity.
- Proceed to the cart.
- Verify cart details, including:
  - Correct items.
  - Selected options.
  - Quantities.
  - Item prices and cart totals.

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Prerequisites

Ensure the following is installed:

1. [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (Included with Node.js)

[_⇡ Return to the Table of Contents_](#table-of-contents)

---
### Setup

1. Clone or Download:
   - Clone this repository: `git clone https://github.com/badj/cypress-cucumber-poc.git`
   - Alternatively, download the ZIP file and extract it.
2. Navigate to Project Directory:
   ```bash
   cd cypress-cucumber-poc
   ```
3. Install Dependencies:
   ```bash
   npm install
   ```

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Running Tests

1. With the Cypress Test Runner:

- For an interactive GUI to select and run specific tests.
  ```bash
  npx cypress open
  ```
2. Headless Mode:
- Run tests without opening a browser window *(Default Electron Browser)*
  ```bash
  npx cypress run
  ```
3. Headed Mode - No exit - Alternative Browsers: (Electron/Chrome/Firefox/Edge/Webkit)
- Run tests with the browser open, and the browser remains open when the run completed 
  ```bash
  npx cypress run --headed --browser electron --no-exit
  ```
  ```bash
  npx cypress run --headed --browser chrome --no-exit
  ```
  ```bash
  npx cypress run --headed --browser firefox --no-exit
  ```
  ```bash
  npx cypress run --headed --browser edge --no-exit
  ```
  ```bash
  npx cypress run --headed --browser webkit --no-exit
  ```
4. Headless Mode - Alternative Browsers: (Electron/Chrome/Firefox/Edge/Webkit)
- Run tests with no browser window opening
  ```bash
  npx cypress run --browser electron
  ```
  ```bash
  npx cypress run --browser chrome
  ```
  ```bash
  npx cypress run --browser firefox
  ```
  ```bash
  npx cypress run --browser edge
  ```
  ```bash
  npx cypress run --browser webkit
  ```  
5. Headed Mode - Alternative Browsers: (Electron/Chrome/Firefox/Edge/Webkit)
- Run tests with the browser open and closing the browser when the run completed
  ```bash
  npx cypress run --headed
  ```
  ```bash
  npx cypress run --headed --browser chrome
  ```
  ```bash
  npx cypress run --headed --browser firefox
  ```
  ```bash
  npx cypress run --headed --browser edge
  ```
  ```bash
  npx cypress run --headed --browser webkit
  ```

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Viewing Test Results

After the test run completes:

- **HTML Report:** Generated at [cypress/reports/html/](cypress/reports/html/) as `cypress-cucumber-poc-results.html`
    - To open the report automatically after a headless run:
  ```bash
   npx cypress run --reporter-options autoOpen=true
  ```
    - To always open the report after a run - set autoOpen to true in the Reporter Option in [cypress.config.js](cypress.config.js):
   ```javascript
   reporterOptions: {
        autoOpen: true
     }
   ```
- **Video Recordings:** Available at [cypress/reports/html/videos/](cypress/reports/html/videos/) and [cypress/videos/](cypress/videos/)
- **Screenshots:** Saved at [cypress/reports/screenshots/](cypress/reports/screenshots/) for test steps configured to capture screenshots.

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### CI/CD Pipeline

- [![Cypress Tests in Docker](https://github.com/badj/cypress-cucumber-poc/actions/workflows/main.yml/badge.svg)](https://github.com/badj/cypress-cucumber-poc/actions/workflows/main.yml)
  - Tests are executed in a Docker container using GitHub Actions.
  - Triggers on push/pull requests to the main branch and for daily scheduled runs. See the workflow configuration in [.github/workflows/main.yml](.github/workflows/main.yml).

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Additional Notes

- Ensure all prerequisites are met before running tests.
- For issues or contributions, refer to the GitHub repository.

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Gotcha's

**1. Installing Cypress dependencies using `npm install` failing due to an unsupported Node.js version**

> Your current Node.js version is older than the recommended LTS version.
> Cypress requires a more recent version of Node.js. As of Cypress 14.0.0, the minimum supported Node.js version is typically Node.js 18 or higher.

**To resolve the issue:**

1. Update Node.js using nvm (Node Version Manager) - Install Node.js 18 (LTS) or a newer version like 20
```bash
  nvm install 18
```
2. Switch to the new version
```bash
  nvm use 18
```
3. Set it as the default version
```bash
  nvm alias default 18
```
4. Verify the Node.js version - Ensure it’s at least v16 or higher.
```bash
  node -v
```
5. Verify npm version:
```bash
  npm -v
```

**Additional steps if the steps above do not resolve it:**

6. Clear npm Cache and Reinstall Dependencies → The error may be caused by a corrupted npm cache or incomplete dependency installation 
> This ensures a clean slate for dependency installation, avoiding issues from cached or corrupted files.
```bash
  npm cache clean --force
```
7. Remove the node_modules directory and package-lock.json → Navigate to the project directory 
> Change to the cypress-cucumber-poc project directory (example for macOS)*:
```bash
  cd [path to your repo]/cypress-cucumber-poc
```
8. Remove the node_modules directory and package-lock.json file:
```bash
  rm -rf node_modules package-lock.json
```
9. Reinstall dependencies:
```bash
  npm install
```

[_⇡ Return to the Table of Contents_](#table-of-contents)

---

### Unresolved issues - Work in progress and being monitored

#### 1. Firefox runner fails to capture the video recording

- **Status:** Investigating
- **Affected Browsers:** Firefox
- **Severity:** Low
- **Impact:** Video from the test run is not embedded in the test results report due to failed video capture during the Firefox test run.
- **Additional Details:** 
  - Test run succeeds but is unable to generate/process the video recording(s).
  - The following error is printed in the console at the end of the test run, during video recording processing: 
```javascript
Warning: We failed capturing this video.
This error will not affect or change the exit code.
Error: Insufficient frames captured to create video.
at ChildProcess.<anonymous> (<embedded>:1012:16262)
at ChildProcess.emit (node:events:518:28)
at ChildProcess._handle.onexit (node:internal/child_process:293:12)
```

#### 2. Test scenarios, steps previously disabled and temporary scenarios added to handle Cloudflare security checks triggered on cart and checkout pages:

> Will monitor for failures in the GitHub action runs due to Cloudflare security checks triggered on cart and checkout pages.
> Issue started on 18 February 2026 but stopped on 23 February 2026.

##### 2.1. Previously disabled Scenario: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout

- **Status:** Investigating/WIP
- **Affected Browsers:** ALL
- **Severity:** Medium
- **Impact:** Cart and checkout flow pages not tested during GitHub action runs due to Cloudflare security check triggered on checkout payments page load.
- **Additional Details:** 
  - Test scenario disabled due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!

> Scenario disabled due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!
> For local runs: 
> - Enable this test in the feature file to run locally - no cloudflare check triggered on local runs and 
> - Disable "Scenario: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered" 

```javascript
  Scenario: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout
    Given I am on the product page for "White-tabby-cat"
    And product "White-tabby-cat" with color "Colour: White" with age "Age: 4YRS" and quantity 3 is added to the cart
    When I proceed to the cart
    Then the cart page should contain the product details: "Light Spotted Tabby Cat", "Colour: White", "Age: 4YRS", 3, 'NZ$300.00' with sub total 'NZ$900.00'
    When I continue to the checkout
    Then The checkout proceeds to the checkout page
```

##### 2.2. Previously disabled Scenario Outline: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout

- **Status:** Investigating/WIP
- **Affected Browsers:** ALL
- **Severity:** Medium
- **Impact:** Cart and checkout flow pages not tested during GitHub action runs due to Cloudflare security check triggered on checkout payments page load.
- **Additional Details:**
    - Test scenario disabled temporarily due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!

> Scenario disabled due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!
> For local runs:
> - Enable this test in the feature file to run locally - no cloudflare check triggered on local runs and
> - ⚠️Disable "Scenario Outline: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered"

```javascript
  Scenario Outline: Add item to cart ➝ continue to cart ➝ verify cart details ➝ continue the checkout
    Given I am on the product page for <Product>
    And <Product> with <color> with <age> and <quantity> is added to the cart
    When I proceed to the cart
    Then the cart page should contain the product details: <itemName>, <color>, <age>, <quantity>, <itemPrice> with sub total <subTotal>
    And the cart page should contain page elements to continue shopping, provide the sub total and to continue the checkout
    When I continue to the checkout
    Then The checkout proceeds to the checkout page
    Examples:
    | Product           | color           | age         | quantity | itemName                  | itemPrice | subTotal  |
    | "White-tabby-cat" | "Colour: White" | "Age: 4YRS" | 3        | "Light Spotted Tabby Cat" | 'NZ$300.00' | 'NZ$900.00' |
```

##### 2.3. Previous temporary Scenario: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered

- **Status:** Investigating/WIP
- **Affected Browsers:** ALL
- **Severity:** Medium
- **Impact:** Cart and checkout flow pages not tested during GitHub action runs due to Cloudflare security check triggered on checkout payments page load.
- **Additional Details:**
    - Test scenario disabled due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!

> New Scenario created for CI runs until the issue can be fixed for a test to pass by checking the cloudflare check box to proceed to the cart page. 
> ⚠️Disable this Scenario for local test runs where no cloudflare check triggered on local runs

```javascript
  Scenario: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered
    Given I am on the product page for "White-tabby-cat"
    And product "White-tabby-cat" with color "Colour: White" with age "Age: 4YRS" and quantity 3 is added to the cart
    When I proceed to the cart a cloudflare security check page is triggered
```

> **⚠️ If scenarios are not disabled then the Scenarios for the local test runs will fail - refer to the expected failures error outputs below 2.4**

##### 2.4. Previous temporary Scenario Outline: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered

- **Status:** Investigating/WIP
- **Affected Browsers:** ALL
- **Severity:** Medium
- **Impact:** Cart and checkout flow pages not tested during GitHub action runs due to Cloudflare security check triggered on checkout payments page load.
- **Additional Details:**
    - Test scenario disabled due to Cloudflare security check triggered on checkout payments page load for CI / Docker / GitHub action runs - issue started on 18 February 2026!

> New Scenario created for CI runs until the issue can be fixed for a test to pass by checking the cloudflare check box to proceed to the cart page.
> Disable this Scenario for local test runs where no cloudflare check triggered on local runs

```javascript
  Scenario Outline: Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered
    Given I am on the product page for <Product>
    And <Product> with <color> with <age> and <quantity> is added to the cart
    When I proceed to the cart a cloudflare security check page is triggered
    Examples:
    | Product           | color           | age         | quantity |
    | "White-tabby-cat" | "Colour: White" | "Age: 4YRS" | 3        |
```

##### If scenarios are not disabled then the Scenarios for the local test runs will fail with the following failures - error outputs samples for 2.3 and 2.4

> ⚠️ If scenarios are not disabled then the Scenarios for the local test runs will fail with the following failures error outputs sample for 2.3 and 2.4

```javascript
  Running:  testautomation.feature                                                        (1 of 1)  
  Cypress Test POC ➝ Contact and Checkout flow
  ✓ Submit a contact enquiry ➝ triggers recaptcha (example #1) (6721ms)
  ✓ Search for an item ➝ view the product (5750ms)
  ✓ Choose options on the product page ➝ add to the cart
  ✓ Choose options on the product page ➝ add to the cart (example #1)
  1) Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered
  2) Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered (example #1)

  4 passing (1m)
  2 failing

  1) Cypress Test POC ➝ Contact and Checkout flow
  Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered:

  Timed out retrying after 4000ms
  + expected - actual
  -200
  +403

  at Context.eval (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:14043:57)
  at Registry.runStepDefinition (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:10415:48)
  at Object.fn (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:13369:43)
  at runStepWithLogGroup (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:12856:29)
  at Context.eval (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:13365:62)
  at getRet (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:121066:20)
  at tryCatcher (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:1777:23)
  at Promise.attempt.Promise.try (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:4285:29)
  at Context.thenFn (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:121077:66)

  2) Cypress Test POC ➝ Contact and Checkout flow
  Add item to cart ➝ continue to cart ➝ cloudflare security check page is triggered (example #1):

  Timed out retrying after 4000ms
  + expected - actual
  -200
  +403

  at Context.eval (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:14043:57)
  at Registry.runStepDefinition (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:10415:48)
  at Object.fn (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:13369:43)
  at runStepWithLogGroup (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:12856:29)
  at Context.eval (https://testautomation.bigcartel.com/__cypress/tests?p=cypress/e2e/features/testautomation.feature:13365:62)
  at getRet (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:121066:20)
  at tryCatcher (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:1777:23)
  at Promise.attempt.Promise.try (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:4285:29)
  at Context.thenFn (https://testautomation.bigcartel.com/__cypress/runner/cypress_runner.js:121077:66)
```

[_⇡ Return to the Table of Contents_](#table-of-contents)

---



 
