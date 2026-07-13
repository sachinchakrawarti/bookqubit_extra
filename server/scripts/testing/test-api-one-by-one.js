/**
 * Test API Endpoints One by One
 * Run with: node scripts/testing/test-api-one-by-one.js
 */

import request from 'supertest';
import express from 'express';
import geographyModule from '../../src/api/v1/modules/geography/index.js';

// Create a test app instead of importing the running server
const app = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount geography routes
app.use('/api/v1/geography', geographyModule.routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: 'test'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

async function testAPI() {
  console.log('\n🧪 Testing BookQbit API Endpoints\n');
  console.log('========================================\n');

  // Store results
  const results = [];

  // ==========================================
  // Test 1: Health Check
  // ==========================================
  console.log('1️⃣ Health Check');
  try {
    const res = await request(app).get('/health');
    const passed = res.status === 200;
    results.push({ name: 'Health Check', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📝 Message: ${res.body.message}`);
      console.log(`   🌍 Environment: ${res.body.environment}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Health Check', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 2: Get Countries
  // ==========================================
  console.log('2️⃣ Get Countries');
  try {
    const res = await request(app).get('/api/v1/geography/countries');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get Countries', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Total: ${res.body.data.total} countries`);
      console.log(`   📄 Page: ${res.body.data.page}`);
      console.log(`   📏 Limit: ${res.body.data.limit}`);
      console.log(`   📑 Total Pages: ${res.body.data.totalPages}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get Countries', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 3: Get Countries with Pagination
  // ==========================================
  console.log('3️⃣ Get Countries (Pagination: page=1, limit=5)');
  try {
    const res = await request(app).get('/api/v1/geography/countries?page=1&limit=5');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get Countries Pagination', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Total: ${res.body.data.total} countries`);
      console.log(`   📄 Page: ${res.body.data.page}`);
      console.log(`   📏 Limit: ${res.body.data.limit}`);
      console.log(`   📑 Showing: ${res.body.data.data.length} countries`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get Countries Pagination', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 4: Get Country by ID
  // ==========================================
  console.log('4️⃣ Get Country by ID (ID: 1)');
  try {
    const res = await request(app).get('/api/v1/geography/countries/1');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get Country by ID', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   🌍 Name: ${res.body.data.name}`);
      console.log(`   🔤 Code: ${res.body.data.code}`);
      console.log(`   🏙️ Capital: ${res.body.data.capital}`);
      console.log(`   🌎 Continent ID: ${res.body.data.continent_id}`);
      console.log(`   👥 Population: ${res.body.data.population}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get Country by ID', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 5: Get Country by Code
  // ==========================================
  console.log('5️⃣ Get Country by Code (Code: US)');
  try {
    const res = await request(app).get('/api/v1/geography/countries/code/US');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get Country by Code', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   🌍 Name: ${res.body.data.name}`);
      console.log(`   🔤 Code: ${res.body.data.code}`);
      console.log(`   🏙️ Capital: ${res.body.data.capital}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get Country by Code', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 6: Search Countries
  // ==========================================
  console.log('6️⃣ Search Countries (q: India)');
  try {
    const res = await request(app).get('/api/v1/geography/countries/search?q=India');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Search Countries', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Found: ${res.body.data.length} results`);
      if (res.body.data.length > 0) {
        console.log(`   📍 First Result: ${res.body.data[0].name}`);
      }
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Search Countries', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 7: Get Country Statistics
  // ==========================================
  console.log('7️⃣ Get Country Statistics (ID: 1)');
  try {
    const res = await request(app).get('/api/v1/geography/countries/1/statistics');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Country Statistics', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   🌍 Country: ${res.body.data.country_name}`);
      console.log(`   🔤 Code: ${res.body.data.country_code}`);
      console.log(`   📊 State Count: ${res.body.data.state_count}`);
      console.log(`   🏙️ City Count: ${res.body.data.city_count}`);
      console.log(`   👥 Population: ${res.body.data.population}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Country Statistics', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 8: Get States
  // ==========================================
  console.log('8️⃣ Get States');
  try {
    const res = await request(app).get('/api/v1/geography/states');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get States', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Total States: ${res.body.data.length}`);
      if (res.body.data.length > 0) {
        console.log(`   📍 First State: ${res.body.data[0].name}`);
      }
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get States', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 9: Get State by ID
  // ==========================================
  console.log('9️⃣ Get State by ID (ID: 1)');
  try {
    const res = await request(app).get('/api/v1/geography/states/1');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get State by ID', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📍 Name: ${res.body.data.name}`);
      console.log(`   🔤 Code: ${res.body.data.code}`);
      console.log(`   🌍 Country ID: ${res.body.data.country_id}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get State by ID', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 10: Get Cities
  // ==========================================
  console.log('🔟 Get Cities');
  try {
    const res = await request(app).get('/api/v1/geography/cities');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get Cities', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Total Cities: ${res.body.data.length}`);
      if (res.body.data.length > 0) {
        console.log(`   📍 First City: ${res.body.data[0].name}`);
      }
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get Cities', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 11: Get City by ID
  // ==========================================
  console.log('1️⃣1️⃣ Get City by ID (ID: 1)');
  try {
    const res = await request(app).get('/api/v1/geography/cities/1');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Get City by ID', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📍 Name: ${res.body.data.name}`);
      console.log(`   🏙️ State ID: ${res.body.data.state_id}`);
      console.log(`   👑 Capital: ${res.body.data.is_capital ? 'Yes' : 'No'}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Get City by ID', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 12: Dashboard Analytics Overview
  // ==========================================
  console.log('1️⃣2️⃣ Dashboard Analytics Overview');
  try {
    const res = await request(app).get('/api/v1/geography/analytics/dashboard/overview');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Dashboard Analytics', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   🌍 Total Countries: ${res.body.data.overview.total_countries}`);
      console.log(`   📍 Total States: ${res.body.data.overview.total_states}`);
      console.log(`   🏙️ Total Cities: ${res.body.data.overview.total_cities}`);
      console.log(`   🌎 Total Continents: ${res.body.data.overview.total_continents}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Dashboard Analytics', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 13: Dashboard Quick Stats
  // ==========================================
  console.log('1️⃣3️⃣ Dashboard Quick Stats');
  try {
    const res = await request(app).get('/api/v1/geography/analytics/dashboard/stats');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Quick Stats', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Recent Countries: ${res.body.data.recent_additions?.countries || 0}`);
      console.log(`   📊 Recent States: ${res.body.data.recent_additions?.states || 0}`);
      console.log(`   📊 Recent Cities: ${res.body.data.recent_additions?.cities || 0}`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Quick Stats', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 14: Nearby Cities
  // ==========================================
  console.log('1️⃣4️⃣ Nearby Cities (lat: 40.7128, lng: -74.0060, radius: 100)');
  try {
    const res = await request(app).get('/api/v1/geography/cities/nearby?latitude=40.7128&longitude=-74.0060&radius=100');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Nearby Cities', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Found: ${res.body.data.length} cities`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Nearby Cities', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 15: Search States
  // ==========================================
  console.log('1️⃣5️⃣ Search States (q: California)');
  try {
    const res = await request(app).get('/api/v1/geography/states/search?q=California');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Search States', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Found: ${res.body.data.length} results`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Search States', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Test 16: Search Cities
  // ==========================================
  console.log('1️⃣6️⃣ Search Cities (q: London)');
  try {
    const res = await request(app).get('/api/v1/geography/cities/search?q=London');
    const passed = res.status === 200 && res.body.success;
    results.push({ name: 'Search Cities', passed });
    if (passed) {
      console.log(`   ✅ Status: ${res.status}`);
      console.log(`   📊 Found: ${res.body.data.length} results`);
    } else {
      console.log(`   ❌ Status: ${res.status}`);
      console.log(`   ❌ Error: ${res.body.message}`);
    }
    console.log('');
  } catch (error) {
    results.push({ name: 'Search Cities', passed: false });
    console.log(`   ❌ Failed: ${error.message}\n`);
  }

  // ==========================================
  // Summary
  // ==========================================
  console.log('========================================');
  console.log('📊 Test Summary\n');
  const total = results.length;
  const passedCount = results.filter(r => r.passed).length;
  const failedCount = total - passedCount;

  results.forEach(r => {
    console.log(`   ${r.passed ? '✅' : '❌'} ${r.name}`);
  });

  console.log(`\n📈 Results: ${passedCount} passed, ${failedCount} failed`);
  console.log(`📊 Total Tests: ${total}`);
  console.log('========================================\n');

  process.exit(failedCount === 0 ? 0 : 1);
}

// Run the tests
testAPI().catch(console.error);