# Cypress Cucumber POC

> A proof of concept showcasing the implementation of [Cypress](https://www.cypress.io/) as a test framework with [Cucumber BDD](https://cucumber.io/) and [Mochawesome reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter) integration to test the checkout flow for the ["Test Automation - Big Cartel E-commerce Test Store"](https://testautomation.bigcartel.com/).

---

[![Cypress Tests in Docker](https://github.com/badj/cypress-cucumber-poc/actions/workflows/main.yml/badge.svg)](https://github.com/badj/cypress-cucumber-poc/actions/workflows/main.yml)

---
### Overview

This repository demonstrates:

- **Cypress Testing Framework**: Utilizes [Cypress Studio](https://docs.cypress.io/app/guides/cypress-studio) for test recording - [follow this guide to record test steps with Cypress Studio](https://docs.cypress.io/app/guides/cypress-studio#Step-1---Run-the-spec).
- **Cucumber BDD**: Implements Behavior-Driven Development for structured, readable test scenarios.
- **Mochawesome Reporter**: Generates detailed test result reports.
- **Local Execution**: Run tests locally with multiple browser options.
- **CI/CD Integration**: Executes tests in a [Docker container](https://www.docker.com/) via [GitHub Actions](https://github.com/badj/cypress-cucumber-poc/actions), triggered on push/pull requests to the main branch and daily scheduled runs.

---

### Test Scenarios

The project includes Cypress feature tests covering the following e-commerce checkout journeys:

- Contact page: Submit a contact enquiry ➝ triggers recaptcha.
- Search for an item in the store.
- View a product from search results.
- Select color and age options from dropdowns.
- Increase item quantity.
- Proceed to the cart.
- Verify cart details, including:
  - Correct items.
  - Selected options.
  - Quantities.
  - Item prices and cart totals.

---

### Prerequisites

Ensure the following are installed:

1. [Node.js](https://nodejs.org/en/download/) (LTS version recommended).
2. [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) (included with Node.js).

---
### Setup

1. Clone or Download:
   - Clone this repository: `git clone https://github.com/badj/Cypress-poc.git`
   - Alternatively, download the ZIP file and extract it.
2. Navigate to Project Directory:
   ```bash
   cd Cypress-poc
   ```
3. Install Dependencies:
   ```bash
   npm install
   ```

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
3. Headed Mode - No exit  - Alternative Browsers: (Electron/Chrome/Firefox/Edge/Webkit)
- Run tests with the browser open and browser remain open when run completed 
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
- Run tests with the browser open and closing the browser when run completed
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

---

### CI/CD Pipeline

- Tests are executed in a Docker container using GitHub Actions.
- Triggers on push/pull requests to the main branch and for daily scheduled runs. See the workflow configuration in [.github/workflows/main.yml](.github/workflows/main.yml).

---

### Additional Notes

- Ensure all prerequisites are met before running tests.
- For issues or contributions, refer to the GitHub repository.

---

### Unresolved issues - Work in Progress

**1. Firefox runner fails to capture video recording**
- **STATUS:** Investigating
- **AFFECTED ENVIRONMENTS:** Firefox only!
- **SEVERITY:** Medium
- **EXTENDED DETAILS:** 
  - Test run succeeds but unable to generate / process the video recording(s). 
  - Video from the test run not embedded in the test results report due to no video available/captured during the test run.
  - Following error printed in console at the end of the test run, during video recording processing: 
```
Warning: We failed capturing this video.
This error will not affect or change the exit code.
Error: Insufficient frames captured to create video.
at ChildProcess.<anonymous> (<embedded>:1012:16262)
at ChildProcess.emit (node:events:518:28)
at ChildProcess._handle.onexit (node:internal/child_process:293:12)
```

---



 
