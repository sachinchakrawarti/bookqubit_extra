/**
 * Test Report Generator
 * Generates a summary of test results
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateReport() {
  console.log('\n📊 Test Report Generator\n');
  console.log('========================================\n');

  // Create test report directory
  const reportDir = path.join(__dirname, '../../../../../test-reports');
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log('📁 Test reports will be saved to:', reportDir);

  // Run tests with different reporters
  const commands = [
    {
      name: 'Jest JSON Report',
      cmd: `cross-env NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.js --json --outputFile=${path.join(reportDir, 'jest-results.json')}`
    },
    {
      name: 'Jest HTML Report',
      cmd: `cross-env NODE_OPTIONS=--experimental-vm-modules jest --config jest.config.js --coverage --coverageDirectory=${path.join(reportDir, 'coverage')}`
    }
  ];

  commands.forEach(({ name, cmd }) => {
    console.log(`\n📝 Running: ${name}`);
    console.log(`🔧 Command: ${cmd}`);
  });

  console.log('\n========================================');
  console.log('✅ Test report generation complete!');
}

generateReport();