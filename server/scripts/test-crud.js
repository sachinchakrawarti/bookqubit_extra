// scripts/test-crud.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

console.log('🧪 Testing CRUD Operations\n');
console.log('=' .repeat(60));

// Helper function to generate unique 2-letter codes
const generateCode = (prefix) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomChar = chars[Math.floor(Math.random() * 26)];
  const timestamp = Date.now().toString().slice(-1);
  return `${prefix}${randomChar}`;
};

// Helper function to generate test data
const generateTestData = (type) => {
  const timestamp = Date.now();
  switch (type) {
    case 'country':
      return {
        code: generateCode('T'),  // 2 letters: T + random letter
        name: `Test Country ${timestamp}`,
        native_name: `Test Country ${timestamp}`,
        capital: 'Test City',
        continent_id: 1,
        population: 1000000,
        area_km2: 1000,
        currency_code: 'TST',
        phone_code: '+999',
        tld: '.test'
      };
    case 'state':
      return {
        country_id: 1,
        code: `TS${Date.now().toString().slice(-1)}`,  // 3 chars: TS + 1 digit
        name: `Test State ${timestamp}`,
        native_name: `Test State ${timestamp}`,
        capital: 'Test Capital',
        population: 500000,
        area_km2: 500
      };
    case 'city':
      return {
        state_id: 1,  // snake_case as expected by validation
        name: `Test City ${timestamp}`,
        native_name: `Test City ${timestamp}`,
        population: 100000,
        latitude: 40.7128,
        longitude: -74.0060,
        postal_code: '10001',
        is_capital: false
      };
    default:
      return {};
  }
};

// ==========================================
// Country CRUD Tests
// ==========================================

async function testCountryCRUD() {
  console.log('\n📝 TESTING COUNTRY CRUD\n');
  console.log('-'.repeat(40));

  let createdCountryId = null;
  let testCode = 'TZ';

  // First check if we have any countries to work with
  try {
    const existing = await axios.get(`${ADMIN_URL}/countries`);
    if (existing.data.data && existing.data.data.length > 0) {
      console.log(`✅ Found ${existing.data.data.length} existing countries`);
    }
  } catch (error) {
    console.log('⚠️ Could not fetch existing countries');
  }

  // 1. CREATE
  try {
    console.log('\n1️⃣ CREATE: Adding test country...');
    const createData = generateTestData('country');
    testCode = createData.code;
    console.log('📤 Request data:', JSON.stringify(createData, null, 2));
    const response = await axios.post(`${ADMIN_URL}/countries`, createData);
    createdCountryId = response.data.data?.id;
    console.log(`✅ Created country: ${response.data.data?.name} (ID: ${createdCountryId})`);
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️ Country already exists, trying with different code...');
      // Try with a different code
      try {
        const retryData = generateTestData('country');
        retryData.code = `X${Date.now().toString().slice(-1)}`;
        const response = await axios.post(`${ADMIN_URL}/countries`, retryData);
        createdCountryId = response.data.data?.id;
        testCode = retryData.code;
        console.log(`✅ Created country: ${response.data.data?.name} (ID: ${createdCountryId})`);
      } catch (retryError) {
        console.log('❌ Failed to create country after retry');
      }
    } else if (error.response) {
      console.log('❌ CREATE failed:', error.response.status);
      console.log('📥 Error details:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ CREATE failed:', error.message);
    }
  }

  if (!createdCountryId) {
    console.log('❌ No country available for testing, using existing...');
    try {
      const existing = await axios.get(`${ADMIN_URL}/countries`);
      if (existing.data.data?.length > 0) {
        createdCountryId = existing.data.data[0].id;
        testCode = existing.data.data[0].code;
        console.log(`✅ Using existing country: ${existing.data.data[0].name} (ID: ${createdCountryId})`);
      } else {
        console.log('❌ No countries available');
        return;
      }
    } catch (e) {
      console.log('❌ Could not fetch existing countries');
      return;
    }
  }

  // 2. READ (Get All)
  try {
    console.log('\n2️⃣ READ: Getting all countries...');
    const response = await axios.get(`${ADMIN_URL}/countries`);
    console.log(`✅ Found ${response.data.data?.length || 0} countries`);
  } catch (error) {
    console.log('❌ READ ALL failed:', error.response?.data?.message || error.message);
  }

  // 3. READ (Get By ID)
  try {
    console.log('\n3️⃣ READ: Getting country by ID...');
    const response = await axios.get(`${ADMIN_URL}/countries/${createdCountryId}`);
    console.log(`✅ Found: ${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    console.log('❌ READ BY ID failed:', error.response?.data?.message || error.message);
  }

  // 4. READ (Get By Code)
  try {
    console.log('\n4️⃣ READ: Getting country by code...');
    const response = await axios.get(`${BASE_URL}/geography/countries/code/${testCode}`);
    console.log(`✅ Found: ${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    if (error.response?.status === 404) {
      console.log('ℹ️ Country not found by code (may have been deleted)');
    } else {
      console.log('❌ READ BY CODE failed:', error.response?.data?.message || error.message);
    }
  }

  // 5. UPDATE
  try {
    console.log('\n5️⃣ UPDATE: Updating country...');
    const updateData = {
      name: `Updated Country ${Date.now()}`,
      population: 2000000
    };
    const response = await axios.put(`${ADMIN_URL}/countries/${createdCountryId}`, updateData);
    console.log(`✅ Updated country: ${response.data.data?.name} (Population: ${response.data.data?.population})`);
  } catch (error) {
    console.log('❌ UPDATE failed:', error.response?.data?.message || error.message);
  }

  // 6. DELETE (Soft Delete)
  try {
    console.log('\n6️⃣ DELETE: Soft deleting country...');
    const response = await axios.delete(`${ADMIN_URL}/countries/${createdCountryId}`);
    console.log(`✅ Soft deleted country (ID: ${createdCountryId})`);
  } catch (error) {
    console.log('❌ DELETE failed:', error.response?.data?.message || error.message);
  }

  // 7. READ (Get Deleted)
  try {
    console.log('\n7️⃣ READ: Getting deleted countries...');
    const response = await axios.get(`${ADMIN_URL}/countries/deleted`);
    console.log(`✅ Found ${response.data.data?.length || 0} deleted countries`);
  } catch (error) {
    console.log('❌ READ DELETED failed:', error.response?.data?.message || error.message);
  }

  // 8. RESTORE
  try {
    console.log('\n8️⃣ RESTORE: Restoring country...');
    const response = await axios.post(`${ADMIN_URL}/countries/${createdCountryId}/restore`);
    console.log(`✅ Restored country: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ RESTORE failed:', error.response?.data?.message || error.message);
  }

  // 9. HARD DELETE
  try {
    console.log('\n9️⃣ HARD DELETE: Permanently deleting country...');
    const response = await axios.delete(`${ADMIN_URL}/countries/${createdCountryId}/hard`);
    console.log(`✅ Hard deleted country (ID: ${createdCountryId})`);
  } catch (error) {
    console.log('❌ HARD DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ Country CRUD tests completed!');
}

// ==========================================
// State CRUD Tests
// ==========================================

async function testStateCRUD() {
  console.log('\n📝 TESTING STATE CRUD\n');
  console.log('-'.repeat(40));

  let createdStateId = null;

  // Check if we have any states
  try {
    const existing = await axios.get(`${ADMIN_URL}/states`);
    if (existing.data.data && existing.data.data.length > 0) {
      console.log(`✅ Found ${existing.data.data.length} existing states`);
    }
  } catch (error) {
    console.log('⚠️ Could not fetch existing states');
  }

  // 1. CREATE
  try {
    console.log('\n1️⃣ CREATE: Adding test state...');
    const createData = generateTestData('state');
    console.log('📤 Request data:', JSON.stringify(createData, null, 2));
    const response = await axios.post(`${ADMIN_URL}/states`, createData);
    createdStateId = response.data.data?.id;
    console.log(`✅ Created state: ${response.data.data?.name} (ID: ${createdStateId})`);
  } catch (error) {
    if (error.response) {
      console.log('❌ CREATE failed:', error.response.status);
      console.log('📥 Error details:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ CREATE failed:', error.message);
    }
    return;
  }

  if (!createdStateId) {
    console.log('❌ No state available for testing');
    return;
  }

  // 2. READ (Get All)
  try {
    console.log('\n2️⃣ READ: Getting all states...');
    const response = await axios.get(`${ADMIN_URL}/states`);
    console.log(`✅ Found ${response.data.data?.length || 0} states`);
  } catch (error) {
    console.log('❌ READ ALL failed:', error.response?.data?.message || error.message);
  }

  // 3. READ (Get By ID)
  try {
    console.log('\n3️⃣ READ: Getting state by ID...');
    const response = await axios.get(`${BASE_URL}/geography/states/${createdStateId}`);
    console.log(`✅ Found: ${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    console.log('❌ READ BY ID failed:', error.response?.data?.message || error.message);
  }

  // 4. READ (Get By Country)
  try {
    console.log('\n4️⃣ READ: Getting states by country...');
    const response = await axios.get(`${BASE_URL}/geography/countries/1/states`);
    console.log(`✅ Found ${response.data.data?.length || 0} states for country`);
  } catch (error) {
    console.log('❌ READ BY COUNTRY failed:', error.response?.data?.message || error.message);
  }

  // 5. UPDATE
  try {
    console.log('\n5️⃣ UPDATE: Updating state...');
    const updateData = {
      name: `Updated State ${Date.now()}`,
      population: 750000
    };
    const response = await axios.put(`${ADMIN_URL}/states/${createdStateId}`, updateData);
    console.log(`✅ Updated state: ${response.data.data?.name} (Population: ${response.data.data?.population})`);
  } catch (error) {
    console.log('❌ UPDATE failed:', error.response?.data?.message || error.message);
  }

  // 6. DELETE
  try {
    console.log('\n6️⃣ DELETE: Soft deleting state...');
    const response = await axios.delete(`${ADMIN_URL}/states/${createdStateId}`);
    console.log(`✅ Soft deleted state (ID: ${createdStateId})`);
  } catch (error) {
    console.log('❌ DELETE failed:', error.response?.data?.message || error.message);
  }

  // 7. RESTORE
  try {
    console.log('\n7️⃣ RESTORE: Restoring state...');
    const response = await axios.post(`${ADMIN_URL}/states/${createdStateId}/restore`);
    console.log(`✅ Restored state: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ RESTORE failed:', error.response?.data?.message || error.message);
  }

  // 8. HARD DELETE
  try {
    console.log('\n8️⃣ HARD DELETE: Permanently deleting state...');
    const response = await axios.delete(`${ADMIN_URL}/states/${createdStateId}/hard`);
    console.log(`✅ Hard deleted state (ID: ${createdStateId})`);
  } catch (error) {
    console.log('❌ HARD DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ State CRUD tests completed!');
}

// ==========================================
// City CRUD Tests
// ==========================================

async function testCityCRUD() {
  console.log('\n📝 TESTING CITY CRUD\n');
  console.log('-'.repeat(40));

  let createdCityId = null;

  // First get a valid state ID
  let stateId = 1;
  try {
    const states = await axios.get(`${ADMIN_URL}/states`);
    if (states.data.data && states.data.data.length > 0) {
      stateId = states.data.data[0].id;
      console.log(`✅ Using state ID: ${stateId} for city tests`);
    }
  } catch (error) {
    console.log('⚠️ Could not fetch states, using default ID 1');
  }

  // 1. CREATE
  try {
    console.log('\n1️⃣ CREATE: Adding test city...');
    const createData = {
      state_id: stateId,  // snake_case as expected
      name: `Test City ${Date.now()}`,
      native_name: `Test City ${Date.now()}`,
      population: 100000,
      latitude: 40.7128,
      longitude: -74.0060,
      postal_code: '10001',
      is_capital: false
    };
    console.log('📤 Request data:', JSON.stringify(createData, null, 2));
    const response = await axios.post(`${ADMIN_URL}/cities`, createData);
    createdCityId = response.data.data?.id;
    console.log(`✅ Created city: ${response.data.data?.name} (ID: ${createdCityId})`);
  } catch (error) {
    if (error.response) {
      console.log('❌ CREATE failed:', error.response.status);
      console.log('📥 Error details:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ CREATE failed:', error.message);
    }
    return;
  }

  if (!createdCityId) {
    console.log('❌ No city available for testing');
    return;
  }

  // 2. READ (Get All)
  try {
    console.log('\n2️⃣ READ: Getting all cities...');
    const response = await axios.get(`${ADMIN_URL}/cities`);
    console.log(`✅ Found ${response.data.data?.length || 0} cities`);
  } catch (error) {
    console.log('❌ READ ALL failed:', error.response?.data?.message || error.message);
  }

  // 3. READ (Get By ID)
  try {
    console.log('\n3️⃣ READ: Getting city by ID...');
    const response = await axios.get(`${BASE_URL}/geography/cities/${createdCityId}`);
    console.log(`✅ Found: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ READ BY ID failed:', error.response?.data?.message || error.message);
  }

  // 4. READ (Get By State)
  try {
    console.log('\n4️⃣ READ: Getting cities by state...');
    const response = await axios.get(`${BASE_URL}/geography/states/${stateId}/cities`);
    console.log(`✅ Found ${response.data.data?.length || 0} cities for state`);
  } catch (error) {
    console.log('❌ READ BY STATE failed:', error.response?.data?.message || error.message);
  }

  // 5. UPDATE
  try {
    console.log('\n5️⃣ UPDATE: Updating city...');
    const updateData = {
      name: `Updated City ${Date.now()}`,
      population: 200000,
      is_capital: true
    };
    const response = await axios.put(`${ADMIN_URL}/cities/${createdCityId}`, updateData);
    console.log(`✅ Updated city: ${response.data.data?.name} (Capital: ${response.data.data?.isCapital})`);
  } catch (error) {
    console.log('❌ UPDATE failed:', error.response?.data?.message || error.message);
  }

  // 6. DELETE
  try {
    console.log('\n6️⃣ DELETE: Soft deleting city...');
    const response = await axios.delete(`${ADMIN_URL}/cities/${createdCityId}`);
    console.log(`✅ Soft deleted city (ID: ${createdCityId})`);
  } catch (error) {
    console.log('❌ DELETE failed:', error.response?.data?.message || error.message);
  }

  // 7. RESTORE
  try {
    console.log('\n7️⃣ RESTORE: Restoring city...');
    const response = await axios.post(`${ADMIN_URL}/cities/${createdCityId}/restore`);
    console.log(`✅ Restored city: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ RESTORE failed:', error.response?.data?.message || error.message);
  }

  // 8. HARD DELETE
  try {
    console.log('\n8️⃣ HARD DELETE: Permanently deleting city...');
    const response = await axios.delete(`${ADMIN_URL}/cities/${createdCityId}/hard`);
    console.log(`✅ Hard deleted city (ID: ${createdCityId})`);
  } catch (error) {
    console.log('❌ HARD DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ City CRUD tests completed!');
}

// ==========================================
// Bulk Operations Tests
// ==========================================

async function testBulkOperations() {
  console.log('\n📝 TESTING BULK OPERATIONS\n');
  console.log('-'.repeat(40));

  // 1. Bulk Create Countries with valid 2-letter codes
  try {
    console.log('\n1️⃣ BULK CREATE: Creating 3 test countries...');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const getRandomLetter = () => chars[Math.floor(Math.random() * 26)];
    const timestamp = Date.now().toString().slice(-1);
    
    const bulkData = [
      {
        code: `A${getRandomLetter()}`,
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
        code: `B${getRandomLetter()}`,
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
        code: `C${getRandomLetter()}`,
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
    console.log('📤 Request data:', JSON.stringify(bulkData, null, 2));
    const response = await axios.post(`${ADMIN_URL}/countries/bulk`, bulkData);
    console.log(`✅ Created ${response.data.data?.length || 0} countries in bulk`);
  } catch (error) {
    if (error.response) {
      console.log('❌ BULK CREATE failed:', error.response.status);
      console.log('📥 Error details:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('❌ BULK CREATE failed:', error.message);
    }
  }

  // 2. Bulk Delete Countries
  try {
    console.log('\n2️⃣ BULK DELETE: Deleting test countries...');
    const all = await axios.get(`${ADMIN_URL}/countries`);
    const testCountries = all.data.data?.filter(c => 
      c.code && c.code.startsWith('A') && c.code.length === 2 ||
      c.code && c.code.startsWith('B') && c.code.length === 2 ||
      c.code && c.code.startsWith('C') && c.code.length === 2
    );
    
    if (testCountries && testCountries.length > 0) {
      const ids = testCountries.map(c => c.id);
      console.log(`📤 Deleting IDs: ${ids}`);
      const response = await axios.post(`${ADMIN_URL}/countries/bulk/delete`, { ids });
      console.log(`✅ Deleted ${response.data.count} countries in bulk`);
    } else {
      console.log('ℹ️ No test countries found to delete');
    }
  } catch (error) {
    console.log('❌ BULK DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ Bulk operations tests completed!');
}

// ==========================================
// Run All Tests
// ==========================================

async function runAllCRUDTests() {
  console.log('🚀 Starting CRUD Tests...\n');

  try {
    await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is running\n');
  } catch (error) {
    console.log('❌ Server is not running. Please start the server first.');
    console.log('   Run: npm run dev');
    return;
  }

  await testCountryCRUD();
  await testStateCRUD();
  await testCityCRUD();
  await testBulkOperations();

  console.log('\n' + '='.repeat(60));
  console.log('✅ All CRUD Tests Completed!\n');
}

runAllCRUDTests();