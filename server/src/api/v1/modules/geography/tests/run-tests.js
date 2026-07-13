/**
 * Simple Test Runner
 * Run without Jest dependencies
 */

import { MODULE, config, getModuleHealth } from '../index.js';

async function runTests() {
  console.log('\n🧪 Running Geography Module Tests\n');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Module exists
  try {
    console.log('📝 Test 1: Module exists');
    if (MODULE && MODULE.name === 'geography') {
      console.log('✅ PASSED\n');
      passed++;
    } else {
      console.log('❌ FAILED: Module not found\n');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 2: Module has correct version
  try {
    console.log('📝 Test 2: Module version');
    if (MODULE && MODULE.version === '1.0.0') {
      console.log('✅ PASSED\n');
      passed++;
    } else {
      console.log('❌ FAILED: Version mismatch\n');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 3: Config exists
  try {
    console.log('📝 Test 3: Configuration exists');
    if (config) {
      console.log('✅ PASSED\n');
      passed++;
    } else {
      console.log('❌ FAILED: Config not found\n');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 4: Health check
  try {
    console.log('📝 Test 4: Health check');
    const health = await getModuleHealth();
    if (health && health.status) {
      console.log('✅ PASSED\n');
      passed++;
    } else {
      console.log('❌ FAILED: Health check failed\n');
      failed++;
    }
  } catch (error) {
    console.log(`❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Summary
  console.log('========================================');
  console.log(`📊 Results: ${passed} passed, ${failed} failed`);
  console.log('========================================\n');

  if (failed === 0) {
    console.log('🎉 All tests passed!');
    process.exit(0);
  } else {
    console.log('❌ Some tests failed!');
    process.exit(1);
  }
}

runTests().catch(console.error);