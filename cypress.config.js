const { defineConfig } = require('cypress');
const cypressOnFix = require('cypress-on-fix');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    video: true,
    videoCompression: 40,
    retries: 1,
    reporterOptions: {
        charts: true,
        reportPageTitle: 'Cypress Test Results',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: true
    },
    e2e: {
        baseUrl: "https://testautomation.bigcartel.com",
        async setupNodeEvents(on, config) {
            on = cypressOnFix(on);
            require('cypress-mochawesome-reporter/plugin')(on);
            await addCucumberPreprocessorPlugin(on, config);
            on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));
            return config;
        },
        specPattern: 'cypress/e2e/**/*.feature',
        screenshotsFolder: "cypress/reports/screenshots",
        screenshotOnRunFailure: true,
        experimentalStudio: true,
        experimentalWebKitSupport: true,
        // Retry enabled globally - to retry all failing tests
        // Disable this and move to individual test or specs to enable retry per
        // test or a spec only. This will retry a failed test (1 retry)  when it fails
        // NOTE: Increase runMode int to increase test retries
        // *************************************************************************
        retries: {
            "runMode": 1, // Increase to attempt retries for failed tests
            "openMode": 0
        }
    },
    'cypress-cucumber-preprocessor': {
        nonGlobalStepDefinitions: true,
        step_definitions: 'cypress/e2e/step_definitions',
    },
});


