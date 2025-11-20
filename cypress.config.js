const { defineConfig } = require('cypress');
const cypressOnFix = require('cypress-on-fix');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { execSync } = require('child_process');

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
        saveAllAttempts: true,
        useInlineDiffs: true,
        reportFilename: 'cypress-cucumber-poc-results.html',
        overwrite: true,
        autoOpen: false //Set to true to auto open the test report when a test run completes
    },
    e2e: {
        baseUrl: "https://testautomation.bigcartel.com",
        async setupNodeEvents(on, config) {
            on = cypressOnFix(on);
            require('cypress-mochawesome-reporter/plugin')(on);
            await addCucumberPreprocessorPlugin(on, config);
            on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));

            // Fix video paths after all tests complete
            on('after:run', async (results) => {
                console.log('\n📹 Post-processing video paths in report...');

                // Add a small delay to ensure report is fully written
                await new Promise(resolve => setTimeout(resolve, 2000));

                try {
                    // Run the HTML-encoded video path fixer
                    execSync('node scripts/fix-html-encoded-video.js', { stdio: 'inherit' });
                } catch (error) {
                    console.error('Failed to fix video paths:', error.message);
                }
            });

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
