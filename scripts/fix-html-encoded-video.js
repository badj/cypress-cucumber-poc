const fs = require('fs');
const path = require('path');

/**
 * Fixes HTML-encoded video paths in the Mochawesome report
 * The video path is embedded as escaped JSON in the HTML
 */

const reportPath = path.join(__dirname, '../cypress/reports/html/cypress-cucumber-poc-results.html');

function fixHtmlEncodedVideo() {
    try {
        console.log('Fixing HTML-encoded video paths...\n');
        console.log('Report:', reportPath, '\n');

        if (!fs.existsSync(reportPath)) {
            console.error('❌ Report not found');
            process.exit(1);
        }

        let htmlContent = fs.readFileSync(reportPath, 'utf8');
        const originalContent = htmlContent;

        // The pattern we found in the output:
        // "value": "videos/cypress/e2e/features/testautomation.feature.mp4"
        // But it's HTML encoded as: &quot;value&quot;: &quot;videos/cypress/e2e/features/testautomation.feature.mp4&quot;

        console.log('🔍 Searching for encoded video paths...\n');

        // Pattern 1: HTML-encoded JSON with backslash escaping
        // \&quot;value\&quot;: \&quot;videos/cypress/e2e/features/testautomation.feature.mp4\&quot;
        const pattern1 = /\\&quot;value\\&quot;:\s*\\&quot;videos\/cypress\/e2e\/(?:features\/)?([^\\&]+\.mp4)\\&quot;/g;
        const matches1 = [...htmlContent.matchAll(pattern1)];

        if (matches1.length > 0) {
            console.log(`✓ Found ${matches1.length} backslash-escaped encoded video path(s):`);
            matches1.forEach(match => {
                console.log(`  - ${match[0].substring(0, 100)}...`);
                console.log(`    Filename: ${match[1]}`);
            });

            htmlContent = htmlContent.replace(pattern1, '\\&quot;value\\&quot;: \\&quot;videos/$1\\&quot;');
            console.log('✓ Fixed backslash-escaped paths\n');
        }

        // Pattern 2: HTML-encoded JSON without backslash escaping
        // &quot;value&quot;: &quot;videos/cypress/e2e/features/testautomation.feature.mp4&quot;
        const pattern2 = /&quot;value&quot;:\s*&quot;videos\/cypress\/e2e\/(?:features\/)?([^&]+\.mp4)&quot;/g;
        const matches2 = [...htmlContent.matchAll(pattern2)];

        if (matches2.length > 0) {
            console.log(`✓ Found ${matches2.length} HTML-encoded video path(s):`);
            matches2.forEach(match => {
                console.log(`  - ${match[0]}`);
                console.log(`    Filename: ${match[1]}`);
            });

            htmlContent = htmlContent.replace(pattern2, '&quot;value&quot;: &quot;videos/$1&quot;');
            console.log('✓ Fixed HTML-encoded paths\n');
        }

        // Pattern 3: Plain JSON in the bundle (not HTML encoded)
        const pattern3 = /"value":\s*"videos\/cypress\/e2e\/(?:features\/)?([^"]+\.mp4)"/g;
        const matches3 = [...htmlContent.matchAll(pattern3)];

        if (matches3.length > 0) {
            console.log(`✓ Found ${matches3.length} plain JSON video path(s):`);
            matches3.forEach(match => {
                console.log(`  - ${match[0]}`);
                console.log(`    Filename: ${match[1]}`);
            });

            htmlContent = htmlContent.replace(pattern3, '"value": "videos/$1"');
            console.log('✓ Fixed plain JSON paths\n');
        }

        // Pattern 4: Any other video path format in context
        const pattern4 = /videos\/cypress\/e2e\/(?:features\/)?([^"'\s\\&]+\.mp4)/g;
        const matches4 = [...htmlContent.matchAll(pattern4)];

        if (matches4.length > 0) {
            console.log(`✓ Found ${matches4.length} additional video path(s):`);
            const uniquePaths = [...new Set(matches4.map(m => m[0]))];
            uniquePaths.slice(0, 5).forEach(path => console.log(`  - ${path}`));

            htmlContent = htmlContent.replace(pattern4, 'videos/$1');
            console.log('✓ Fixed additional video paths\n');
        }

        // Check if any changes were made
        if (htmlContent === originalContent) {
            console.log('⚠ No video paths found to fix\n');

            // Debug: Show what we found
            console.log('Debug info:');
            const anyVideo = htmlContent.match(/videos[^"'\s]{0,100}/g);
            if (anyVideo) {
                console.log('Found video-related strings:');
                [...new Set(anyVideo)].slice(0, 10).forEach(v => console.log(`  - ${v}`));
            }

            return;
        }

        // Write the fixed HTML
        fs.writeFileSync(reportPath, htmlContent, 'utf8');

        const changeCount = (originalContent.length - htmlContent.length);
        console.log(`✅ Successfully updated report!`);
        console.log(`   Bytes changed: ${Math.abs(changeCount)}`);

        // Verify
        const verifyContent = fs.readFileSync(reportPath, 'utf8');
        const stillHasBadPath = verifyContent.includes('videos/cypress/e2e/');

        if (stillHasBadPath) {
            console.log('\n⚠ Warning: Some nested paths may still exist');
            const remaining = verifyContent.match(/videos\/cypress\/e2e\/[^"'\s\\&]+/g);
            if (remaining) {
                console.log(`Found ${remaining.length} remaining issue(s):`);
                [...new Set(remaining)].slice(0, 5).forEach(r => console.log(`  - ${r}`));
            }
        } else {
            console.log('\n✅ Verification: All nested paths removed successfully!');
        }

        console.log(`\n📍 Report: ${reportPath}`);

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

fixHtmlEncodedVideo();
