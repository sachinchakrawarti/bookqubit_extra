// test-api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';
const ADMIN_URL = 'http://localhost:5000/api/v1/admin';

console.log('🧪 Testing Geography API Endpoints\n');
console.log('=' .repeat(60));

// ==========================================
// Test Public API Endpoints
// ==========================================

async function testPublicAPI() {
  console.log('\n📡 TESTING PUBLIC API\n');
  console.log('-'.repeat(40));

  // 1. Health Check
  try {
    console.log('\n1️⃣ Testing Health Check...');
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health Check:', health.data.message);
  } catch (error) {
    console.log('❌ Health Check Failed:', error.message);
  }

  // 2. Get All Countries
  try {
    console.log('\n2️⃣ Testing GET /geography/countries...');
    const countries = await axios.get(`${BASE_URL}/geography/countries`);
    console.log(`✅ Countries: ${countries.data.data?.length || 0} countries found`);
  } catch (error) {
    console.log('❌ GET /geography/countries Failed:', error.response?.data?.message || error.message);
  }

  // 3. Get Country by ID
  try {
    console.log('\n3️⃣ Testing GET /geography/countries/:id...');
    const country = await axios.get(`${BASE_URL}/geography/countries/1`);
    console.log(`✅ Country: ${country.data.data?.name || 'Not found'}`);
  } catch (error) {
    console.log('❌ GET /geography/countries/:id Failed:', error.response?.data?.message || error.message);
  }

  // 4. Get Country by Code
  try {
    console.log('\n4️⃣ Testing GET /geography/countries/code/:code...');
    const country = await axios.get(`${BASE_URL}/geography/countries/code/US`);
    console.log(`✅ Country: ${country.data.data?.name || 'Not found'}`);
  } catch (error) {
    console.log('❌ GET /geography/countries/code/:code Failed:', error.response?.data?.message || error.message);
  }

  // 5. Get All States
  try {
    console.log('\n5️⃣ Testing GET /geography/states...');
    const states = await axios.get(`${BASE_URL}/geography/states`);
    console.log(`✅ States: ${states.data.data?.length || 0} states found`);
  } catch (error) {
    console.log('❌ GET /geography/states Failed:', error.response?.data?.message || error.message);
  }

  // 6. Get All Cities
  try {
    console.log('\n6️⃣ Testing GET /geography/cities...');
    const cities = await axios.get(`${BASE_URL}/geography/cities`);
    console.log(`✅ Cities: ${cities.data.data?.length || 0} cities found`);
  } catch (error) {
    console.log('❌ GET /geography/cities Failed:', error.response?.data?.message || error.message);
  }

  // 7. Get All Continents
  try {
    console.log('\n7️⃣ Testing GET /geography/continents...');
    const continents = await axios.get(`${BASE_URL}/geography/continents`);
    console.log(`✅ Continents: ${continents.data.data?.length || 0} continents found`);
  } catch (error) {
    console.log('❌ GET /geography/continents Failed:', error.response?.data?.message || error.message);
  }

  // 8. Search
  try {
    console.log('\n8️⃣ Testing GET /geography/search...');
    const search = await axios.get(`${BASE_URL}/geography/search?q=United`);
    console.log(`✅ Search Results: Found ${search.data.data?.countries?.length || 0} countries`);
  } catch (error) {
    console.log('❌ GET /geography/search Failed:', error.response?.data?.message || error.message);
  }

  // 9. Dashboard Stats
  try {
    console.log('\n9️⃣ Testing GET /geography/dashboard/stats...');
    const stats = await axios.get(`${BASE_URL}/geography/dashboard/stats`);
    console.log(`✅ Dashboard Stats: ${stats.data.data?.countries?.total || 0} countries total`);
  } catch (error) {
    console.log('❌ GET /geography/dashboard/stats Failed:', error.response?.data?.message || error.message);
  }

  // 10. Analytics Dashboard
  try {
    console.log('\n🔟 Testing GET /geography/analytics/dashboard...');
    const analytics = await axios.get(`${BASE_URL}/geography/analytics/dashboard`);
    console.log(`✅ Analytics Dashboard: Retrieved successfully`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/dashboard Failed:', error.response?.data?.message || error.message);
  }
}

// ==========================================
// Test Admin API Endpoints
// ==========================================

async function testAdminAPI() {
  console.log('\n\n🔐 TESTING ADMIN API\n');
  console.log('-'.repeat(40));

  // 1. Admin Stats
  try {
    console.log('\n1️⃣ Testing GET /admin/geography/stats...');
    const stats = await axios.get(`${ADMIN_URL}/geography/stats`);
    console.log(`✅ Admin Stats: ${stats.data.data?.totalCountries || 0} countries total`);
  } catch (error) {
    console.log('❌ GET /admin/geography/stats Failed:', error.response?.data?.message || error.message);
  }

  // 2. Admin Dashboard
  try {
    console.log('\n2️⃣ Testing GET /admin/geography/dashboard...');
    const dashboard = await axios.get(`${ADMIN_URL}/geography/dashboard`);
    console.log(`✅ Admin Dashboard: Retrieved successfully`);
  } catch (error) {
    console.log('❌ GET /admin/geography/dashboard Failed:', error.response?.data?.message || error.message);
  }

  // 3. Admin Get All Countries
  try {
    console.log('\n3️⃣ Testing GET /admin/geography/countries...');
    const countries = await axios.get(`${ADMIN_URL}/geography/countries`);
    console.log(`✅ Admin Countries: ${countries.data.data?.length || 0} countries found`);
  } catch (error) {
    console.log('❌ GET /admin/geography/countries Failed:', error.response?.data?.message || error.message);
  }

  // 4. Admin Create Country
  try {
    console.log('\n4️⃣ Testing POST /admin/geography/countries...');
    const newCountry = {
      code: 'XX',
      name: 'Test Country',
      native_name: 'Test Country',
      capital: 'Test City',
      continent_id: 1,
      population: 1000000,
      area_km2: 1000,
      currency_code: 'TST',
      phone_code: '+999',
      tld: '.test'
    };
    const country = await axios.post(`${ADMIN_URL}/geography/countries`, newCountry);
    console.log(`✅ Created Country: ${country.data.data?.name}`);
  } catch (error) {
    if (error.response?.status === 409) {
      console.log('ℹ️ Test country already exists (this is fine)');
    } else {
      console.log('❌ POST /admin/geography/countries Failed:', error.response?.data?.message || error.message);
    }
  }

  // 5. Admin Get Deleted Countries
  try {
    console.log('\n5️⃣ Testing GET /admin/geography/countries/deleted...');
    const deleted = await axios.get(`${ADMIN_URL}/geography/countries/deleted`);
    console.log(`✅ Deleted Countries: ${deleted.data.data?.length || 0} countries found`);
  } catch (error) {
    console.log('❌ GET /admin/geography/countries/deleted Failed:', error.response?.data?.message || error.message);
  }

  // 6. Admin Get All States
  try {
    console.log('\n6️⃣ Testing GET /admin/geography/states...');
    const states = await axios.get(`${ADMIN_URL}/geography/states`);
    console.log(`✅ Admin States: ${states.data.data?.length || 0} states found`);
  } catch (error) {
    console.log('❌ GET /admin/geography/states Failed:', error.response?.data?.message || error.message);
  }

  // 7. Admin Get All Cities
  try {
    console.log('\n7️⃣ Testing GET /admin/geography/cities...');
    const cities = await axios.get(`${ADMIN_URL}/geography/cities`);
    console.log(`✅ Admin Cities: ${cities.data.data?.length || 0} cities found`);
  } catch (error) {
    console.log('❌ GET /admin/geography/cities Failed:', error.response?.data?.message || error.message);
  }

  // 8. Admin Audit Trail
  try {
    console.log('\n8️⃣ Testing GET /admin/geography/audit...');
    const audit = await axios.get(`${ADMIN_URL}/geography/audit`);
    console.log(`✅ Audit Trail: Retrieved successfully`);
  } catch (error) {
    console.log('❌ GET /admin/geography/audit Failed:', error.response?.data?.message || error.message);
  }
}

// ==========================================
// Test Analytics API Endpoints
// ==========================================

async function testAnalyticsAPI() {
  console.log('\n\n📊 TESTING ANALYTICS API\n');
  console.log('-'.repeat(40));

  // 1. Country Distribution
  try {
    console.log('\n1️⃣ Testing GET /geography/analytics/distribution/countries...');
    const dist = await axios.get(`${BASE_URL}/geography/analytics/distribution/countries`);
    console.log(`✅ Country Distribution: ${dist.data.data?.length || 0} continents found`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/distribution/countries Failed:', error.response?.data?.message || error.message);
  }

  // 2. Top Countries by Population
  try {
    console.log('\n2️⃣ Testing GET /geography/analytics/top/countries/population...');
    const top = await axios.get(`${BASE_URL}/geography/analytics/top/countries/population?limit=5`);
    console.log(`✅ Top Countries: ${top.data.data?.length || 0} countries found`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/top/countries/population Failed:', error.response?.data?.message || error.message);
  }

  // 3. Country Statistics
  try {
    console.log('\n3️⃣ Testing GET /geography/analytics/stats/countries...');
    const stats = await axios.get(`${BASE_URL}/geography/analytics/stats/countries`);
    console.log(`✅ Country Stats: ${stats.data.data?.total || 0} total countries`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/stats/countries Failed:', error.response?.data?.message || error.message);
  }

  // 4. Activity Ratios
  try {
    console.log('\n4️⃣ Testing GET /geography/analytics/stats/activity...');
    const activity = await axios.get(`${BASE_URL}/geography/analytics/stats/activity`);
    console.log(`✅ Activity Ratios: Retrieved successfully`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/stats/activity Failed:', error.response?.data?.message || error.message);
  }

  // 5. Data Growth
  try {
    console.log('\n5️⃣ Testing GET /geography/analytics/growth...');
    const growth = await axios.get(`${BASE_URL}/geography/analytics/growth?period=monthly`);
    console.log(`✅ Data Growth: Retrieved successfully`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/growth Failed:', error.response?.data?.message || error.message);
  }

  // 6. Generate Report
  try {
    console.log('\n6️⃣ Testing GET /geography/analytics/report...');
    const report = await axios.get(`${BASE_URL}/geography/analytics/report`);
    console.log(`✅ Report: Generated successfully`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/report Failed:', error.response?.data?.message || error.message);
  }

  // 7. Analytics Health
  try {
    console.log('\n7️⃣ Testing GET /geography/analytics/health...');
    const health = await axios.get(`${BASE_URL}/geography/analytics/health`);
    console.log(`✅ Analytics Health: ${health.data.data?.status}`);
  } catch (error) {
    console.log('❌ GET /geography/analytics/health Failed:', error.response?.data?.message || error.message);
  }
}

// ==========================================
// Run All Tests
// ==========================================

async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  console.log('=' .repeat(60));

  try {
    await testPublicAPI();
    await testAdminAPI();
    await testAnalyticsAPI();
  } catch (error) {
    console.log('\n❌ Test suite error:', error.message);
  }

  console.log('\n' + '=' .repeat(60));
  console.log('✅ API Testing Complete!\n');
}

runAllTests();