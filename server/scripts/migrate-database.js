// scripts/migrate-database.js
import { sequelize } from '../src/api/v1/modules/geography/db/sequelize.js';
import { DataTypes } from 'sequelize';

async function migrateDatabase() {
  try {
    console.log('🔄 Running database migrations...\n');

    const queryInterface = sequelize.getQueryInterface();

    // Check if states table exists
    const tables = await queryInterface.showAllTables();
    console.log('📊 Existing tables:', tables);

    // Create states table
    if (!tables.includes('states')) {
      console.log('\n📝 Creating states table...');
      await queryInterface.createTable('states', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        country_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'countries',
            key: 'id'
          }
        },
        code: {
          type: DataTypes.STRING(3),
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        native_name: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        capital: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        population: {
          type: DataTypes.BIGINT,
          allowNull: true
        },
        area_km2: {
          type: DataTypes.DECIMAL(15, 2),
          allowNull: true
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true
        }
      });
      console.log('✅ States table created');

      // Add indexes
      await queryInterface.addIndex('states', ['country_id', 'code'], { unique: true });
      await queryInterface.addIndex('states', ['country_id']);
      await queryInterface.addIndex('states', ['name']);
      console.log('✅ States indexes created');
    }

    // Create cities table
    if (!tables.includes('cities')) {
      console.log('\n📝 Creating cities table...');
      await queryInterface.createTable('cities', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        state_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'states',
            key: 'id'
          }
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        native_name: {
          type: DataTypes.STRING(100),
          allowNull: true
        },
        population: {
          type: DataTypes.BIGINT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.DECIMAL(10, 8),
          allowNull: true
        },
        longitude: {
          type: DataTypes.DECIMAL(11, 8),
          allowNull: true
        },
        timezone_id: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        postal_code: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        is_capital: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        is_active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW
        },
        deleted_at: {
          type: DataTypes.DATE,
          allowNull: true
        }
      });
      console.log('✅ Cities table created');

      // Add indexes
      await queryInterface.addIndex('cities', ['state_id']);
      await queryInterface.addIndex('cities', ['name']);
      await queryInterface.addIndex('cities', ['latitude', 'longitude']);
      console.log('✅ Cities indexes created');
    }

    // Seed US States
    console.log('\n📝 Seeding US states...');
    const usStates = [
      { code: 'AL', name: 'Alabama', capital: 'Montgomery', population: 5024279 },
      { code: 'AK', name: 'Alaska', capital: 'Juneau', population: 733391 },
      { code: 'AZ', name: 'Arizona', capital: 'Phoenix', population: 7151502 },
      { code: 'AR', name: 'Arkansas', capital: 'Little Rock', population: 3011524 },
      { code: 'CA', name: 'California', capital: 'Sacramento', population: 39538223 },
      { code: 'CO', name: 'Colorado', capital: 'Denver', population: 5773714 },
      { code: 'CT', name: 'Connecticut', capital: 'Hartford', population: 3605944 },
      { code: 'DE', name: 'Delaware', capital: 'Dover', population: 989948 },
      { code: 'FL', name: 'Florida', capital: 'Tallahassee', population: 21538187 },
      { code: 'GA', name: 'Georgia', capital: 'Atlanta', population: 10711908 },
      { code: 'HI', name: 'Hawaii', capital: 'Honolulu', population: 1455271 },
      { code: 'ID', name: 'Idaho', capital: 'Boise', population: 1839106 },
      { code: 'IL', name: 'Illinois', capital: 'Springfield', population: 12812508 },
      { code: 'IN', name: 'Indiana', capital: 'Indianapolis', population: 6785528 },
      { code: 'IA', name: 'Iowa', capital: 'Des Moines', population: 3190369 },
      { code: 'KS', name: 'Kansas', capital: 'Topeka', population: 2937880 },
      { code: 'KY', name: 'Kentucky', capital: 'Frankfort', population: 4505836 },
      { code: 'LA', name: 'Louisiana', capital: 'Baton Rouge', population: 4657757 },
      { code: 'ME', name: 'Maine', capital: 'Augusta', population: 1362359 },
      { code: 'MD', name: 'Maryland', capital: 'Annapolis', population: 6177224 },
      { code: 'MA', name: 'Massachusetts', capital: 'Boston', population: 7029917 },
      { code: 'MI', name: 'Michigan', capital: 'Lansing', population: 10077331 },
      { code: 'MN', name: 'Minnesota', capital: 'St. Paul', population: 5706494 },
      { code: 'MS', name: 'Mississippi', capital: 'Jackson', population: 2961279 },
      { code: 'MO', name: 'Missouri', capital: 'Jefferson City', population: 6154913 },
      { code: 'MT', name: 'Montana', capital: 'Helena', population: 1084225 },
      { code: 'NE', name: 'Nebraska', capital: 'Lincoln', population: 1961504 },
      { code: 'NV', name: 'Nevada', capital: 'Carson City', population: 3104614 },
      { code: 'NH', name: 'New Hampshire', capital: 'Concord', population: 1377529 },
      { code: 'NJ', name: 'New Jersey', capital: 'Trenton', population: 9288994 },
      { code: 'NM', name: 'New Mexico', capital: 'Santa Fe', population: 2117522 },
      { code: 'NY', name: 'New York', capital: 'Albany', population: 20201249 },
      { code: 'NC', name: 'North Carolina', capital: 'Raleigh', population: 10439388 },
      { code: 'ND', name: 'North Dakota', capital: 'Bismarck', population: 779094 },
      { code: 'OH', name: 'Ohio', capital: 'Columbus', population: 11799448 },
      { code: 'OK', name: 'Oklahoma', capital: 'Oklahoma City', population: 3959353 },
      { code: 'OR', name: 'Oregon', capital: 'Salem', population: 4237256 },
      { code: 'PA', name: 'Pennsylvania', capital: 'Harrisburg', population: 13002700 },
      { code: 'RI', name: 'Rhode Island', capital: 'Providence', population: 1097379 },
      { code: 'SC', name: 'South Carolina', capital: 'Columbia', population: 5118425 },
      { code: 'SD', name: 'South Dakota', capital: 'Pierre', population: 886667 },
      { code: 'TN', name: 'Tennessee', capital: 'Nashville', population: 6910840 },
      { code: 'TX', name: 'Texas', capital: 'Austin', population: 29145505 },
      { code: 'UT', name: 'Utah', capital: 'Salt Lake City', population: 3271616 },
      { code: 'VT', name: 'Vermont', capital: 'Montpelier', population: 643077 },
      { code: 'VA', name: 'Virginia', capital: 'Richmond', population: 8631393 },
      { code: 'WA', name: 'Washington', capital: 'Olympia', population: 7705281 },
      { code: 'WV', name: 'West Virginia', capital: 'Charleston', population: 1793716 },
      { code: 'WI', name: 'Wisconsin', capital: 'Madison', population: 5893718 },
      { code: 'WY', name: 'Wyoming', capital: 'Cheyenne', population: 576851 }
    ];

    const countries = await queryInterface.select(null, 'countries', {
      where: { code: 'US' }
    });

    if (countries.length > 0) {
      const usCountryId = countries[0].id;
      for (const state of usStates) {
        await queryInterface.bulkInsert('states', [{
          country_id: usCountryId,
          code: state.code,
          name: state.name,
          native_name: state.name,
          capital: state.capital,
          population: state.population,
          is_active: 1,
          created_at: new Date(),
          updated_at: new Date()
        }]);
      }
      console.log(`✅ ${usStates.length} US states seeded`);
    }

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error.stack);
  } finally {
    await sequelize.close();
    console.log('\n🔒 Database connection closed.');
  }
}

migrateDatabase();