// scripts/check-database.js
import { sequelize } from '../src/api/v1/modules/geography/db/sequelize.js';
import { DataTypes } from 'sequelize';

// Define models (matching your existing models)
const Continent = sequelize.define('Continent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'continents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true
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
  continent_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  population: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  area_km2: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true
  },
  currency_code: {
    type: DataTypes.STRING(3),
    allowNull: true
  },
  phone_code: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  tld: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'countries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});

// Define relationships
Country.belongsTo(Continent, { foreignKey: 'continent_id', as: 'continent' });
Continent.hasMany(Country, { foreignKey: 'continent_id', as: 'countries' });

async function checkDatabase() {
  try {
    console.log('🔍 Checking database data...\n');
    
    // Check if tables exist
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log('📊 Tables in database:', tables.join(', '));
    console.log('----------------------------------------\n');
    
    // Check continents
    const continents = await Continent.findAll();
    console.log(`🌍 Continents (${continents.length}):`);
    continents.forEach(c => {
      console.log(`  - ${c.code}: ${c.name}`);
    });
    console.log('----------------------------------------\n');
    
    // Check countries
    const countries = await Country.findAll({
      include: [{ model: Continent, as: 'continent' }]
    });
    console.log(`🌎 Countries (${countries.length}):`);
    countries.forEach(c => {
      const continentName = c.continent ? c.continent.name : 'Unknown';
      console.log(`  - ${c.code}: ${c.name} (${continentName})`);
      if (c.capital) console.log(`    Capital: ${c.capital}`);
      if (c.population) console.log(`    Population: ${c.population.toLocaleString()}`);
      console.log('');
    });
    
    // Get table stats
    console.log('----------------------------------------');
    console.log('📊 Database Statistics:');
    
    // Count total countries
    const totalCountries = await Country.count();
    console.log(`  - Total Countries: ${totalCountries}`);
    
    // Count active countries
    const activeCountries = await Country.count({ where: { is_active: true } });
    console.log(`  - Active Countries: ${activeCountries}`);
    
    // Count countries by continent
    console.log('  - Countries by Continent:');
    for (const continent of continents) {
      const count = await Country.count({ where: { continent_id: continent.id } });
      console.log(`    ${continent.name}: ${count}`);
    }
    
    console.log('\n✅ Database check completed successfully!');
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  } finally {
    await sequelize.close();
    console.log('\n🔒 Database connection closed.');
  }
}

// Run the check
checkDatabase();