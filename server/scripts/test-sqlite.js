// test-sqlite.js
import { sequelize, testConnection, syncDatabase } from './src/api/v1/modules/geography/db/sequelize.js';
import { DataTypes } from 'sequelize';

async function testSQLite() {
  try {
    console.log('🔄 Testing SQLite database connection...\n');
    
    // Test connection
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ Connection failed. Exiting...');
      return;
    }
    
    // Test creating a simple table
    console.log('\n📝 Testing table creation...');
    const TestTable = sequelize.define('TestTable', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'test_tables',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false
    });
    
    // Sync table
    await TestTable.sync({ force: true });
    console.log('✅ Test table created successfully');
    
    // Insert test data
    console.log('\n📝 Inserting test data...');
    const testData = await TestTable.create({ name: 'Test Entry' });
    console.log('✅ Test data inserted:', testData.toJSON());
    
    // Query test data
    console.log('\n📝 Querying test data...');
    const results = await TestTable.findAll();
    console.log('✅ Query results:', results.map(r => r.toJSON()));
    
    // Raw SQL query test
    console.log('\n📝 Testing raw SQL query...');
    const [rawResults] = await sequelize.query('SELECT 1+1 AS result');
    console.log('✅ Raw query result:', rawResults[0]);
    
    // Get database info
    console.log('\n📊 Database information:');
    const [tables] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table'");
    console.log('Tables:', tables.map(t => t.name));
    
    console.log('\n✅ All SQLite tests passed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } finally {
    // Close connection
    await sequelize.close();
    console.log('\n🔒 Database connection closed.');
  }
}

// Run the test
testSQLite();