// scripts/fix-states.js
import axios from 'axios';

const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

async function testStateCRUD() {
  console.log('\n📝 TESTING STATE CRUD (FIXED)\n');
  console.log('-'.repeat(40));

  let createdStateId = null;

  // 1. CREATE - Using camelCase as expected by mapper
  try {
    console.log('\n1️⃣ CREATE: Adding test state...');
    const createData = {
      countryId: 1,  // camelCase for mapper
      code: 'TS',
      name: `Test State ${Date.now()}`,
      nativeName: `Test State ${Date.now()}`,
      capital: 'Test Capital',
      population: 500000,
      areaKm2: 500
    };
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
    const response = await axios.get(`http://localhost:5000/api/v1/geography/states/${createdStateId}`);
    console.log(`✅ Found: ${response.data.data?.name} (${response.data.data?.code})`);
  } catch (error) {
    console.log('❌ READ BY ID failed:', error.response?.data?.message || error.message);
  }

  // 4. UPDATE
  try {
    console.log('\n4️⃣ UPDATE: Updating state...');
    const updateData = {
      name: `Updated State ${Date.now()}`,
      population: 750000
    };
    const response = await axios.put(`${ADMIN_URL}/states/${createdStateId}`, updateData);
    console.log(`✅ Updated state: ${response.data.data?.name} (Population: ${response.data.data?.population})`);
  } catch (error) {
    console.log('❌ UPDATE failed:', error.response?.data?.message || error.message);
  }

  // 5. DELETE
  try {
    console.log('\n5️⃣ DELETE: Soft deleting state...');
    const response = await axios.delete(`${ADMIN_URL}/states/${createdStateId}`);
    console.log(`✅ Soft deleted state (ID: ${createdStateId})`);
  } catch (error) {
    console.log('❌ DELETE failed:', error.response?.data?.message || error.message);
  }

  // 6. RESTORE
  try {
    console.log('\n6️⃣ RESTORE: Restoring state...');
    const response = await axios.post(`${ADMIN_URL}/states/${createdStateId}/restore`);
    console.log(`✅ Restored state: ${response.data.data?.name}`);
  } catch (error) {
    console.log('❌ RESTORE failed:', error.response?.data?.message || error.message);
  }

  // 7. HARD DELETE
  try {
    console.log('\n7️⃣ HARD DELETE: Permanently deleting state...');
    const response = await axios.delete(`${ADMIN_URL}/states/${createdStateId}/hard`);
    console.log(`✅ Hard deleted state (ID: ${createdStateId})`);
  } catch (error) {
    console.log('❌ HARD DELETE failed:', error.response?.data?.message || error.message);
  }

  console.log('\n✅ State CRUD tests completed!');
}

testStateCRUD();