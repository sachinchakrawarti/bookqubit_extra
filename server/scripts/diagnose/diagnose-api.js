// scripts/diagnose/diagnose-api.js
import axios from 'axios';

const ADMIN_URL = 'http://localhost:5000/api/v1/admin/geography';

async function diagnose() {
  console.log('🔍 DIAGNOSING API ISSUES\n');
  console.log('='.repeat(60));

  // Check if server is running first
  try {
    await axios.get('http://localhost:5000/api/v1/health');
    console.log('✅ Server is running\n');
  } catch (error) {
    console.log('❌ Server is NOT running!');
    console.log('   Please start the server first: npm run dev');
    console.log('   Error:', error.code || error.message);
    return;
  }

  // 1. State CREATE
  console.log('\n1️⃣ Testing State CREATE...');
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const getRandomLetter = () => letters[Math.floor(Math.random() * 26)];
  const stateCode = `${getRandomLetter()}${getRandomLetter()}`;
  
  try {
    const data = {
      country_id: 1,
      code: stateCode,
      name: `Test State ${Date.now()}`
    };
    console.log('   Request:', JSON.stringify(data));
    const response = await axios.post(`${ADMIN_URL}/states`, data);
    console.log(`   ✅ State CREATE WORKS! ID: ${response.data.data?.id}`);
  } catch (error) {
    if (error.response) {
      console.log(`   ❌ State CREATE FAILED: Status ${error.response.status}`);
      console.log(`      Message: ${error.response.data?.message || error.message}`);
      if (error.response.data?.errors) {
        console.log('      Errors:', JSON.stringify(error.response.data.errors));
      }
    } else if (error.request) {
      console.log('   ❌ State CREATE FAILED: No response from server');
      console.log('      Check if server is running on port 5000');
    } else {
      console.log(`   ❌ State CREATE FAILED: ${error.message}`);
    }
  }

  // 2. City CREATE
  console.log('\n2️⃣ Testing City CREATE...');
  try {
    const data = {
      state_id: 1,
      name: `Test City ${Date.now()}`
    };
    console.log('   Request:', JSON.stringify(data));
    const response = await axios.post(`${ADMIN_URL}/cities`, data);
    console.log(`   ✅ City CREATE WORKS! ID: ${response.data.data?.id}`);
  } catch (error) {
    if (error.response) {
      console.log(`   ❌ City CREATE FAILED: Status ${error.response.status}`);
      console.log(`      Message: ${error.response.data?.message || error.message}`);
      if (error.response.data?.errors) {
        console.log('      Errors:', JSON.stringify(error.response.data.errors));
      }
    } else if (error.request) {
      console.log('   ❌ City CREATE FAILED: No response from server');
    } else {
      console.log(`   ❌ City CREATE FAILED: ${error.message}`);
    }
  }

  // 3. Country UPDATE
  console.log('\n3️⃣ Testing Country UPDATE...');
  try {
    const countries = await axios.get(`${ADMIN_URL}/countries`);
    if (countries.data.data?.length > 0) {
      const id = countries.data.data[0].id;
      console.log(`   Using country ID: ${id}`);
      
      const updateData = { 
        name: `Updated ${Date.now()}`
      };
      console.log('   Update data:', JSON.stringify(updateData));
      
      try {
        const response = await axios.put(`${ADMIN_URL}/countries/${id}`, updateData);
        console.log(`   ✅ UPDATE WORKS! Name: ${response.data.data?.name}`);
      } catch (error) {
        if (error.response) {
          console.log(`   ❌ UPDATE FAILED: Status ${error.response.status}`);
          console.log(`      Message: ${error.response.data?.message || error.message}`);
          if (error.response.data?.errors) {
            console.log('      Errors:', JSON.stringify(error.response.data.errors));
          }
        } else {
          console.log(`   ❌ UPDATE FAILED: ${error.message}`);
        }
      }
    } else {
      console.log('   ⚠️ No countries found to test update');
    }
  } catch (error) {
    if (error.response) {
      console.log(`   ❌ Failed to get countries: Status ${error.response.status}`);
      console.log(`      Message: ${error.response.data?.message || error.message}`);
    } else {
      console.log(`   ❌ Failed to get countries: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Diagnosis complete!\n');
}

diagnose();