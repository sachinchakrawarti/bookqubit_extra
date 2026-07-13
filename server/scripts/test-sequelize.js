// test-sequelize.js
import { sequelize } from './src/api/v1/modules/geography/db/sequelize.js';

async function testConnection() {
  try {
    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Test query
    const result = await sequelize.query('SELECT 1+1 AS result');
    console.log('✅ Test query executed successfully:', result[0][0]);
    
    console.log('✅ All tests passed!');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error details:', error);
    return false;
  } finally {
    // Close connection
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

// Run the test
testConnection();