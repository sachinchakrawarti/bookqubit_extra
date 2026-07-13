// scripts/test-results.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

console.log('📊 API TEST RESULTS SUMMARY\n');
console.log('=' .repeat(60));

// Color codes for console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const tests = [];

async function runTest(name, testFn) {
  try {
    const result = await testFn();
    tests.push({ name, status: 'PASS', result });
    console.log(`${colors.green}✅ PASS${colors.reset}: ${name}`);
  } catch (error) {
    tests.push({ name, status: 'FAIL', error: error.message });
    console.log(`${colors.red}❌ FAIL${colors.reset}: ${name}`);
    console.log(`   ${error.message}`);
  }
}

async function runAllTests() {
  console.log('\n🔄 Running tests...\n');

  // 1. Health Check
  await runTest('Health Check', async () => {
    const response = await axios.get(`${BASE_URL}/health`);
    if (response.status !== 200) throw new Error('Health check failed');
    return response.data;
  });

  // 2. Get Countries (Public)
  await runTest('GET /countries (Public)', async () => {
    const response = await axios.get(`${BASE_URL}/geography/countries`);
    if (!response.data.data) throw new Error('No data returned');
    return `Found ${response.data.data.length} countries`;
  });

  // 3. Get Countries (Admin)
  await runTest('GET /admin/countries (Admin)', async () => {
    const response = await axios.get(`${ADMIN_URL}/countries`);
    if (!response.data.data) throw new Error('No data returned');
    return `Found ${response.data.data.length} countries`;
  });

  // 4. Get States
  await runTest('GET /states', async () => {
    const response = await axios.get(`${ADMIN_URL}/states`);
    if (!response.data.data) throw new Error('No data returned');
    return `Found ${response.data.data.length} states`;
  });

  // 5. Get Cities
  await runTest('GET /cities', async () => {
    const response = await axios.get(`${ADMIN_URL}/cities`);
    if (!response.data.data) throw new Error('No data returned');
    return `Found ${response.data.data.length} cities`;
  });

  // 6. Get Continents
  await runTest('GET /continents', async () => {
    const response = await axios.get(`${BASE_URL}/geography/continents`);
    if (!response.data.data) throw new Error('No data returned');
    return `Found ${response.data.data.length} continents`;
  });

  // 7. Create Country
  await runTest('POST /admin/countries (Create)', async () => {
    const timestamp = Date.now().toString().slice(-1);
    const data = {
      code: `X${timestamp}`,
      name: `Test Country ${Date.now()}`,
      native_name: `Test Country ${Date.now()}`,
      capital: 'Test City',
      continent_id: 1,
      population: 1000000,
      area_km2: 1000,
      currency_code: 'TST',
      phone_code: '+999',
      tld: '.test'
    };
    const response = await axios.post(`${ADMIN_URL}/countries`, data);
    if (!response.data.data) throw new Error('Create failed');
    return `Created: ${response.data.data.name} (ID: ${response.data.data.id})`;
  });

  // 8. Admin Stats
  await runTest('GET /admin/stats', async () => {
    const response = await axios.get(`${ADMIN_URL}/stats`);
    if (!response.data.data) throw new Error('No stats returned');
    return `${response.data.data.totalCountries} countries, ${response.data.data.totalStates} states, ${response.data.data.totalCities} cities`;
  });

  // 9. Analytics Dashboard
  await runTest('GET /analytics/dashboard', async () => {
    const response = await axios.get(`${BASE_URL}/geography/analytics/dashboard`);
    if (!response.data.data) throw new Error('No analytics data');
    return 'Analytics data retrieved';
  });

  // 10. Search
  await runTest('GET /search', async () => {
    const response = await axios.get(`${BASE_URL}/geography/search?q=United`);
    if (!response.data.data) throw new Error('No search results');
    return `Found ${response.data.data.countries?.length || 0} countries`;
  });

  // Print Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY\n');

  const passed = tests.filter(t => t.status === 'PASS');
  const failed = tests.filter(t => t.status === 'FAIL');

  console.log(`${colors.green}✅ PASSED: ${passed.length}${colors.reset}`);
  console.log(`${colors.red}❌ FAILED: ${failed.length}${colors.reset}`);
  console.log(`📦 TOTAL: ${tests.length}\n`);

  if (passed.length > 0) {
    console.log('📋 PASSED TESTS:');
    passed.forEach(t => {
      console.log(`  ${colors.green}✅${colors.reset} ${t.name}: ${t.result}`);
    });
  }

  if (failed.length > 0) {
    console.log('\n📋 FAILED TESTS:');
    failed.forEach(t => {
      console.log(`  ${colors.red}❌${colors.reset} ${t.name}: ${t.error}`);
    });
  }

  console.log('\n' + '=' .repeat(60));
  console.log(`✅ Overall Status: ${failed.length === 0 ? 'ALL PASSED' : `${failed.length} TESTS FAILED`}`);
  console.log('=' .repeat(60));
}

runAllTests();