// scripts/testing/test-api.js
import axios from 'axios';
import chalk from 'chalk';

const BASE_URL = 'http://localhost:5000/api/v1';
const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

const colors = {
  green: chalk.green,
  red: chalk.red,
  yellow: chalk.yellow,
  blue: chalk.blue,
  gray: chalk.gray,
  bold: chalk.bold,
  white: chalk.white
};

let passed = 0;
let failed = 0;
let skipped = 0;

function logTest(name, status, message = '') {
  const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⏭️';
  const color = status === 'pass' ? colors.green : status === 'fail' ? colors.red : colors.yellow;
  console.log(`${color(icon)} ${colors.white(name)}`);
  if (message) {
    console.log(`   ${colors.gray(message)}`);
  }
  if (status === 'pass') passed++;
  else if (status === 'fail') failed++;
  else skipped++;
}

async function testHealth() {
  try {
    const response = await axios.get(`${BASE_URL}/health`);
    if (response.status === 200) {
      logTest('Health Check', 'pass', `Status: ${response.status}`);
      return true;
    }
    logTest('Health Check', 'fail', `Status: ${response.status}`);
    return false;
  } catch (error) {
    logTest('Health Check', 'fail', error.message);
    return false;
  }
}

async function testCountryCRUD() {
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('🌍 COUNTRY CRUD TESTS'));
  console.log(colors.blue('='.repeat(60)));

  let countryId = null;
  let testCode = null;
  
  // Generate unique 2-letter code
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getRandomLetter = () => chars[Math.floor(Math.random() * 26)];
  testCode = `${getRandomLetter()}${getRandomLetter()}`;
  
  // 1. CREATE - Using snake_case as expected by DTO validation
  try {
    const data = {
      code: testCode,
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
    console.log(`   ${colors.gray('Request data:')}`, JSON.stringify(data));
    const response = await axios.post(`${ADMIN_URL}/countries`, data);
    countryId = response.data.data?.id;
    logTest('CREATE Country', 'pass', `${response.data.data?.name} (ID: ${countryId})`);
  } catch (error) {
    if (error.response?.status === 409) {
      logTest('CREATE Country', 'skip', 'Already exists, trying with different code');
      // Try with a different code
      try {
        const newCode = `${getRandomLetter()}${getRandomLetter()}`;
        const data = {
          code: newCode,
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
        countryId = response.data.data?.id;
        testCode = newCode;
        logTest('CREATE Country (retry)', 'pass', `${response.data.data?.name} (ID: ${countryId})`);
      } catch (retryError) {
        logTest('CREATE Country (retry)', 'fail', 'Could not create with new code');
        // Use existing country for testing
        try {
          const existing = await axios.get(`${ADMIN_URL}/countries`);
          if (existing.data.data?.length > 0) {
            countryId = existing.data.data[0].id;
            testCode = existing.data.data[0].code;
            logTest('Using existing country', 'pass', `ID: ${countryId}`);
          }
        } catch (e) {
          logTest('No countries available', 'fail', 'Could not fetch existing');
        }
      }
    } else {
      const msg = error.response?.data?.message || error.message;
      logTest('CREATE Country', 'fail', msg);
    }
  }

  if (!countryId) {
    logTest('Country CRUD', 'fail', 'No country available for testing');
    return;
  }

  // 2. READ
  try {
    const response = await axios.get(`${ADMIN_URL}/countries/${countryId}`);
    logTest('READ Country', 'pass', `${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    logTest('READ Country', 'fail', error.response?.data?.message || error.message);
  }

  // 3. UPDATE - Don't include code in update
  try {
    const updateData = {
      name: `Updated Country ${Date.now()}`,
      population: 2000000,
      capital: 'Updated Capital'
    };
    const response = await axios.put(`${ADMIN_URL}/countries/${countryId}`, updateData);
    logTest('UPDATE Country', 'pass', `Name: ${response.data.data?.name}, Population: ${response.data.data?.population}`);
  } catch (error) {
    logTest('UPDATE Country', 'fail', error.response?.data?.message || error.message);
  }

  // 4. SOFT DELETE
  try {
    await axios.delete(`${ADMIN_URL}/countries/${countryId}`);
    logTest('SOFT DELETE Country', 'pass', `ID: ${countryId}`);
  } catch (error) {
    logTest('SOFT DELETE Country', 'fail', error.response?.data?.message || error.message);
  }

  // 5. RESTORE
  try {
    await axios.post(`${ADMIN_URL}/countries/${countryId}/restore`);
    logTest('RESTORE Country', 'pass', `ID: ${countryId}`);
  } catch (error) {
    logTest('RESTORE Country', 'fail', error.response?.data?.message || error.message);
  }

  // 6. HARD DELETE
  try {
    await axios.delete(`${ADMIN_URL}/countries/${countryId}/hard`);
    logTest('HARD DELETE Country', 'pass', `ID: ${countryId}`);
  } catch (error) {
    logTest('HARD DELETE Country', 'fail', error.response?.data?.message || error.message);
  }
}

async function testStateCRUD() {
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('🗺️  STATE CRUD TESTS'));
  console.log(colors.blue('='.repeat(60)));

  let stateId = null;

  // Get a valid country ID first
  let countryId = 1;
  try {
    const countries = await axios.get(`${ADMIN_URL}/countries`);
    if (countries.data.data?.length > 0) {
      countryId = countries.data.data[0].id;
      console.log(`   ${colors.gray(`Using country ID: ${countryId}`)}`);
    }
  } catch (error) {
    logTest('Get Country for State', 'fail', error.message);
    return;
  }

  // Generate valid state code (2-3 uppercase letters)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const stateCode = `${chars[Math.floor(Math.random() * 26)]}${chars[Math.floor(Math.random() * 26)]}`;
  
  // 1. CREATE - Try snake_case first, if fails try camelCase
  try {
    const data = {
      country_id: countryId,
      code: stateCode,
      name: `Test State ${Date.now()}`,
      native_name: `Test State ${Date.now()}`,
      capital: 'Test Capital',
      population: 500000,
      area_km2: 500
    };
    console.log(`   ${colors.gray('Request data (snake_case):')}`, JSON.stringify(data));
    const response = await axios.post(`${ADMIN_URL}/states`, data);
    stateId = response.data.data?.id;
    logTest('CREATE State', 'pass', `${response.data.data?.name} (ID: ${stateId})`);
  } catch (error) {
    // Try camelCase
    try {
      const data = {
        countryId: countryId,
        code: stateCode,
        name: `Test State ${Date.now()}`,
        nativeName: `Test State ${Date.now()}`,
        capital: 'Test Capital',
        population: 500000,
        areaKm2: 500
      };
      console.log(`   ${colors.gray('Request data (camelCase):')}`, JSON.stringify(data));
      const response = await axios.post(`${ADMIN_URL}/states`, data);
      stateId = response.data.data?.id;
      logTest('CREATE State (camelCase)', 'pass', `${response.data.data?.name} (ID: ${stateId})`);
    } catch (retryError) {
      const msg = retryError.response?.data?.message || retryError.message;
      const errors = retryError.response?.data?.errors;
      logTest('CREATE State', 'fail', msg);
      if (errors) {
        console.log(`   ${colors.red('Errors:')} ${JSON.stringify(errors)}`);
      }
      return;
    }
  }

  if (!stateId) return;

  // 2. READ
  try {
    const response = await axios.get(`${BASE_URL}/geography/states/${stateId}`);
    logTest('READ State', 'pass', `${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    logTest('READ State', 'fail', error.response?.data?.message || error.message);
  }

  // 3. UPDATE
  try {
    const updateData = {
      name: `Updated State ${Date.now()}`,
      population: 750000
    };
    const response = await axios.put(`${ADMIN_URL}/states/${stateId}`, updateData);
    logTest('UPDATE State', 'pass', `Population: ${response.data.data?.population}`);
  } catch (error) {
    logTest('UPDATE State', 'fail', error.response?.data?.message || error.message);
  }

  // 4. DELETE
  try {
    await axios.delete(`${ADMIN_URL}/states/${stateId}`);
    logTest('DELETE State', 'pass', `ID: ${stateId}`);
  } catch (error) {
    logTest('DELETE State', 'fail', error.response?.data?.message || error.message);
  }

  // 5. RESTORE
  try {
    await axios.post(`${ADMIN_URL}/states/${stateId}/restore`);
    logTest('RESTORE State', 'pass', `ID: ${stateId}`);
  } catch (error) {
    logTest('RESTORE State', 'fail', error.response?.data?.message || error.message);
  }

  // 6. HARD DELETE
  try {
    await axios.delete(`${ADMIN_URL}/states/${stateId}/hard`);
    logTest('HARD DELETE State', 'pass', `ID: ${stateId}`);
  } catch (error) {
    logTest('HARD DELETE State', 'fail', error.response?.data?.message || error.message);
  }
}

async function testCityCRUD() {
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('🏙️  CITY CRUD TESTS'));
  console.log(colors.blue('='.repeat(60)));

  let cityId = null;

  // Get a valid state ID
  let stateId = 1;
  try {
    const states = await axios.get(`${ADMIN_URL}/states`);
    if (states.data.data?.length > 0) {
      stateId = states.data.data[0].id;
      console.log(`   ${colors.gray(`Using state ID: ${stateId}`)}`);
    }
  } catch (error) {
    logTest('Get State for City', 'fail', error.message);
    return;
  }

  // 1. CREATE - Try camelCase first (mapper expects this)
  try {
    const data = {
      stateId: stateId,
      name: `Test City ${Date.now()}`,
      nativeName: `Test City ${Date.now()}`,
      population: 100000,
      latitude: 40.7128,
      longitude: -74.0060,
      postalCode: '10001',
      isCapital: false
    };
    console.log(`   ${colors.gray('Request data (camelCase):')}`, JSON.stringify(data));
    const response = await axios.post(`${ADMIN_URL}/cities`, data);
    cityId = response.data.data?.id;
    logTest('CREATE City', 'pass', `${response.data.data?.name} (ID: ${cityId})`);
  } catch (error) {
    // Try snake_case
    try {
      const data = {
        state_id: stateId,
        name: `Test City ${Date.now()}`,
        native_name: `Test City ${Date.now()}`,
        population: 100000,
        latitude: 40.7128,
        longitude: -74.0060,
        postal_code: '10001',
        is_capital: false
      };
      console.log(`   ${colors.gray('Request data (snake_case):')}`, JSON.stringify(data));
      const response = await axios.post(`${ADMIN_URL}/cities`, data);
      cityId = response.data.data?.id;
      logTest('CREATE City (snake_case)', 'pass', `${response.data.data?.name} (ID: ${cityId})`);
    } catch (retryError) {
      const msg = retryError.response?.data?.message || retryError.message;
      const errors = retryError.response?.data?.errors;
      logTest('CREATE City', 'fail', msg);
      if (errors) {
        console.log(`   ${colors.red('Errors:')} ${JSON.stringify(errors)}`);
      }
      return;
    }
  }

  if (!cityId) return;

  // 2. READ
  try {
    const response = await axios.get(`${BASE_URL}/geography/cities/${cityId}`);
    logTest('READ City', 'pass', response.data.data?.name);
  } catch (error) {
    logTest('READ City', 'fail', error.response?.data?.message || error.message);
  }

  // 3. UPDATE
  try {
    const updateData = {
      name: `Updated City ${Date.now()}`,
      population: 200000,
      isCapital: true
    };
    const response = await axios.put(`${ADMIN_URL}/cities/${cityId}`, updateData);
    logTest('UPDATE City', 'pass', `Capital: ${response.data.data?.isCapital}`);
  } catch (error) {
    logTest('UPDATE City', 'fail', error.response?.data?.message || error.message);
  }

  // 4. DELETE
  try {
    await axios.delete(`${ADMIN_URL}/cities/${cityId}`);
    logTest('DELETE City', 'pass', `ID: ${cityId}`);
  } catch (error) {
    logTest('DELETE City', 'fail', error.response?.data?.message || error.message);
  }

  // 5. RESTORE
  try {
    await axios.post(`${ADMIN_URL}/cities/${cityId}/restore`);
    logTest('RESTORE City', 'pass', `ID: ${cityId}`);
  } catch (error) {
    logTest('RESTORE City', 'fail', error.response?.data?.message || error.message);
  }

  // 6. HARD DELETE
  try {
    await axios.delete(`${ADMIN_URL}/cities/${cityId}/hard`);
    logTest('HARD DELETE City', 'pass', `ID: ${cityId}`);
  } catch (error) {
    logTest('HARD DELETE City', 'fail', error.response?.data?.message || error.message);
  }
}

async function testBulkOperations() {
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('📦 BULK OPERATIONS TESTS'));
  console.log(colors.blue('='.repeat(60)));

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const code1 = `${chars[Math.floor(Math.random() * 26)]}${chars[Math.floor(Math.random() * 26)]}`;
  const code2 = `${chars[Math.floor(Math.random() * 26)]}${chars[Math.floor(Math.random() * 26)]}`;
  const code3 = `${chars[Math.floor(Math.random() * 26)]}${chars[Math.floor(Math.random() * 26)]}`;
  
  const bulkData = [
    {
      code: code1,
      name: `Bulk Country 1`,
      native_name: `Bulk Country 1`,
      continent_id: 1,
      population: 1000000,
      area_km2: 1000,
      currency_code: 'TST',
      phone_code: '+999',
      tld: '.test'
    },
    {
      code: code2,
      name: `Bulk Country 2`,
      native_name: `Bulk Country 2`,
      continent_id: 1,
      population: 2000000,
      area_km2: 2000,
      currency_code: 'TST',
      phone_code: '+999',
      tld: '.test'
    },
    {
      code: code3,
      name: `Bulk Country 3`,
      native_name: `Bulk Country 3`,
      continent_id: 1,
      population: 3000000,
      area_km2: 3000,
      currency_code: 'TST',
      phone_code: '+999',
      tld: '.test'
    }
  ];

  // 1. BULK CREATE
  try {
    console.log(`   ${colors.gray('Creating countries:')} ${code1}, ${code2}, ${code3}`);
    const response = await axios.post(`${ADMIN_URL}/countries/bulk`, bulkData);
    logTest('BULK CREATE', 'pass', `${response.data.data?.length || 0} countries created`);
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    const errors = error.response?.data?.errors;
    logTest('BULK CREATE', 'fail', msg);
    if (errors) {
      console.log(`   ${colors.red('Errors:')} ${JSON.stringify(errors)}`);
    }
  }

  // 2. BULK DELETE
  try {
    const all = await axios.get(`${ADMIN_URL}/countries`);
    const testCountries = all.data.data?.filter(c => 
      c.code === code1 || c.code === code2 || c.code === code3
    );
    if (testCountries && testCountries.length > 0) {
      const ids = testCountries.map(c => c.id);
      const response = await axios.post(`${ADMIN_URL}/countries/bulk/delete`, { ids });
      logTest('BULK DELETE', 'pass', `${response.data.count} countries deleted`);
    } else {
      logTest('BULK DELETE', 'skip', 'No test countries found');
    }
  } catch (error) {
    logTest('BULK DELETE', 'fail', error.response?.data?.message || error.message);
  }
}

async function testAnalytics() {
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('📊 ANALYTICS TESTS'));
  console.log(colors.blue('='.repeat(60)));

  // 1. Dashboard Analytics
  try {
    const response = await axios.get(`${BASE_URL}/geography/analytics/dashboard`);
    logTest('Dashboard Analytics', 'pass', 'Data retrieved');
  } catch (error) {
    logTest('Dashboard Analytics', 'fail', error.response?.data?.message || error.message);
  }

  // 2. Country Distribution
  try {
    const response = await axios.get(`${BASE_URL}/geography/analytics/distribution/countries`);
    logTest('Country Distribution', 'pass', `${response.data.data?.length || 0} continents`);
  } catch (error) {
    logTest('Country Distribution', 'fail', error.response?.data?.message || error.message);
  }

  // 3. Top Countries
  try {
    const response = await axios.get(`${BASE_URL}/geography/analytics/top/countries/population?limit=5`);
    logTest('Top Countries', 'pass', `${response.data.data?.length || 0} countries`);
  } catch (error) {
    logTest('Top Countries', 'fail', error.response?.data?.message || error.message);
  }

  // 4. Activity Ratios
  try {
    const response = await axios.get(`${BASE_URL}/geography/analytics/stats/activity`);
    logTest('Activity Ratios', 'pass', 'Data retrieved');
  } catch (error) {
    logTest('Activity Ratios', 'fail', error.response?.data?.message || error.message);
  }

  // 5. Analytics Health
  try {
    const response = await axios.get(`${BASE_URL}/geography/analytics/health`);
    logTest('Analytics Health', 'pass', response.data.data?.status || 'healthy');
  } catch (error) {
    logTest('Analytics Health', 'fail', error.response?.data?.message || error.message);
  }
}

async function runAllTests() {
  console.log(`\n${colors.bold('🚀 STARTING API TESTS')}`);
  console.log(`📡 Server: ${BASE_URL}`);
  console.log(`${colors.gray('-'.repeat(60))}`);

  // Check if server is running
  const isServerRunning = await testHealth();
  if (!isServerRunning) {
    console.log(`\n${colors.red('❌ Server is not running. Please start the server first:')}`);
    console.log(`   ${colors.yellow('npm run dev')}`);
    process.exit(1);
  }

  // Run all tests
  await testCountryCRUD();
  await testStateCRUD();
  await testCityCRUD();
  await testBulkOperations();
  await testAnalytics();

  // Print summary
  console.log(`\n${colors.blue('='.repeat(60))}`);
  console.log(colors.bold('📊 TEST SUMMARY'));
  console.log(colors.blue('='.repeat(60)));
  console.log(`${colors.green('✅ Passed:')} ${passed}`);
  console.log(`${colors.red('❌ Failed:')} ${failed}`);
  console.log(`${colors.yellow('⏭️ Skipped:')} ${skipped}`);
  console.log(`${colors.blue('📦 Total:')} ${passed + failed + skipped}`);
  
  const total = passed + failed + skipped;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  console.log(`${colors.blue('📈 Pass Rate:')} ${passRate}%`);
  console.log(colors.blue('='.repeat(60)));

  if (failed === 0) {
    console.log(`${colors.green('\n🎉 All tests passed!')}`);
  } else {
    console.log(`${colors.red(`\n❌ ${failed} test(s) failed. Please check the errors above.`)}`);
    process.exit(1);
  }
}

// Run the tests
runAllTests().catch(error => {
  console.error(colors.red('\n❌ Test suite error:'), error.message);
  process.exit(1);
});