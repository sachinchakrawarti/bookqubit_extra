// scripts/fix-cities.js
import axios from 'axios';

const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

async function testCityCRUD() {
  console.log('\n📝 TESTING CITY CRUD (FIXED)\n');
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

  // 1. CREATE - Using correct field names
  try {
    console.log('\n1️⃣ CREATE: Adding test city...');
    const createData = {
      state_id: stateId,
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
    const response = await axios.get(`http://localhost:5000/api/v1/geography/cities/${createdCityId}`);
    console.log(`✅ Found: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ READ BY ID failed:', error.response?.data?.message || error.message);
  }

  // 4. UPDATE
  try {
    console.log('\n4️⃣ UPDATE: Updating city...');
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

  // 5. DELETE
  try {
    console.log('\n5️⃣ DELETE: Soft deleting city...');
    const response = await axios.delete(`${ADMIN_URL}/cities/${createdCityId}`);
    console.log(`✅ Soft deleted city (ID: ${createdCityId})`);
  } catch (error) {
    console.log('❌ DELETE failed:', error.response?.data?.message || error.message);
  }

  // 6. RESTORE
  try {
    console.log('\n6️⃣ RESTORE: Restoring city...');
    const response = await axios.post(`${ADMIN_URL}/cities/${createdCityId}/restore`);
    console.log(`✅ Restored city: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ RESTORE failed:', error.response?.data?.message || error.message);
  }

  // 7. HARD DELETE
  try {
    console.log('\n7️⃣ HARD DELETE: Permanently deleting city...');
    const response = await axios.delete(`${ADMIN_URL}/cities/${createdCityId}/hard`);
    console.log(`✅ Hard deleted city (ID: ${createdCityId})`);
  } catch (error) {
    console.log('❌ HARD DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ City CRUD tests completed!');
}

testCityCRUD();