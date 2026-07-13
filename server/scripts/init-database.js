// scripts/init-database.js
import { sequelize } from '../src/api/v1/modules/geography/db/sequelize.js';
import { DataTypes } from 'sequelize';

// Define models
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
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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
    allowNull: false,
    references: {
      model: 'continents',
      key: 'id'
    }
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
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

// Seed data
const continents = [
  { code: 'AF', name: 'Africa' },
  { code: 'AN', name: 'Antarctica' },
  { code: 'AS', name: 'Asia' },
  { code: 'EU', name: 'Europe' },
  { code: 'NA', name: 'North America' },
  { code: 'OC', name: 'Oceania' },
  { code: 'SA', name: 'South America' }
];

const countries = [
  // Africa
  { code: 'NG', name: 'Nigeria', native_name: 'Nigeria', capital: 'Abuja', continent_id: 1, population: 206139589, area_km2: 923768, currency_code: 'NGN', phone_code: '+234', tld: '.ng' },
  { code: 'ZA', name: 'South Africa', native_name: 'South Africa', capital: 'Pretoria', continent_id: 1, population: 59308690, area_km2: 1221037, currency_code: 'ZAR', phone_code: '+27', tld: '.za' },
  { code: 'EG', name: 'Egypt', native_name: 'مصر', capital: 'Cairo', continent_id: 1, population: 102334404, area_km2: 1002450, currency_code: 'EGP', phone_code: '+20', tld: '.eg' },
  { code: 'KE', name: 'Kenya', native_name: 'Kenya', capital: 'Nairobi', continent_id: 1, population: 53771296, area_km2: 580367, currency_code: 'KES', phone_code: '+254', tld: '.ke' },
  { code: 'GH', name: 'Ghana', native_name: 'Ghana', capital: 'Accra', continent_id: 1, population: 31072940, area_km2: 238533, currency_code: 'GHS', phone_code: '+233', tld: '.gh' },
  
  // Asia
  { code: 'IN', name: 'India', native_name: 'भारत', capital: 'New Delhi', continent_id: 3, population: 1380004385, area_km2: 3287263, currency_code: 'INR', phone_code: '+91', tld: '.in' },
  { code: 'CN', name: 'China', native_name: '中国', capital: 'Beijing', continent_id: 3, population: 1439323776, area_km2: 9596961, currency_code: 'CNY', phone_code: '+86', tld: '.cn' },
  { code: 'JP', name: 'Japan', native_name: '日本', capital: 'Tokyo', continent_id: 3, population: 126476461, area_km2: 377975, currency_code: 'JPY', phone_code: '+81', tld: '.jp' },
  { code: 'KR', name: 'South Korea', native_name: '대한민국', capital: 'Seoul', continent_id: 3, population: 51780579, area_km2: 100210, currency_code: 'KRW', phone_code: '+82', tld: '.kr' },
  { code: 'ID', name: 'Indonesia', native_name: 'Indonesia', capital: 'Jakarta', continent_id: 3, population: 273523615, area_km2: 1904569, currency_code: 'IDR', phone_code: '+62', tld: '.id' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', native_name: 'United Kingdom', capital: 'London', continent_id: 4, population: 67886011, area_km2: 243610, currency_code: 'GBP', phone_code: '+44', tld: '.uk' },
  { code: 'DE', name: 'Germany', native_name: 'Deutschland', capital: 'Berlin', continent_id: 4, population: 83783942, area_km2: 357022, currency_code: 'EUR', phone_code: '+49', tld: '.de' },
  { code: 'FR', name: 'France', native_name: 'France', capital: 'Paris', continent_id: 4, population: 65273511, area_km2: 640679, currency_code: 'EUR', phone_code: '+33', tld: '.fr' },
  { code: 'IT', name: 'Italy', native_name: 'Italia', capital: 'Rome', continent_id: 4, population: 60461826, area_km2: 301340, currency_code: 'EUR', phone_code: '+39', tld: '.it' },
  { code: 'ES', name: 'Spain', native_name: 'España', capital: 'Madrid', continent_id: 4, population: 46754778, area_km2: 505992, currency_code: 'EUR', phone_code: '+34', tld: '.es' },
  
  // North America
  { code: 'US', name: 'United States', native_name: 'United States', capital: 'Washington D.C.', continent_id: 5, population: 331002651, area_km2: 9833517, currency_code: 'USD', phone_code: '+1', tld: '.us' },
  { code: 'CA', name: 'Canada', native_name: 'Canada', capital: 'Ottawa', continent_id: 5, population: 37742154, area_km2: 9984670, currency_code: 'CAD', phone_code: '+1', tld: '.ca' },
  { code: 'MX', name: 'Mexico', native_name: 'México', capital: 'Mexico City', continent_id: 5, population: 128932753, area_km2: 1964375, currency_code: 'MXN', phone_code: '+52', tld: '.mx' },
  
  // South America
  { code: 'BR', name: 'Brazil', native_name: 'Brasil', capital: 'Brasília', continent_id: 7, population: 212559417, area_km2: 8515767, currency_code: 'BRL', phone_code: '+55', tld: '.br' },
  { code: 'AR', name: 'Argentina', native_name: 'Argentina', capital: 'Buenos Aires', continent_id: 7, population: 45195774, area_km2: 2780400, currency_code: 'ARS', phone_code: '+54', tld: '.ar' },
  { code: 'CL', name: 'Chile', native_name: 'Chile', capital: 'Santiago', continent_id: 7, population: 19116201, area_km2: 756102, currency_code: 'CLP', phone_code: '+56', tld: '.cl' },
  
  // Oceania
  { code: 'AU', name: 'Australia', native_name: 'Australia', capital: 'Canberra', continent_id: 6, population: 25499884, area_km2: 7692024, currency_code: 'AUD', phone_code: '+61', tld: '.au' },
  { code: 'NZ', name: 'New Zealand', native_name: 'New Zealand', capital: 'Wellington', continent_id: 6, population: 4822233, area_km2: 268838, currency_code: 'NZD', phone_code: '+64', tld: '.nz' }
];

async function initDatabase() {
  try {
    console.log('🔄 Initializing database...');
    console.log('📝 This will create tables and seed data.');
    console.log('⚠️  WARNING: Existing data will be lost!');
    console.log('Press Ctrl+C to cancel or wait 5 seconds to continue...');
    
    // Wait 5 seconds to allow user to cancel
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Sync tables (force: true will drop and recreate tables)
    console.log('📝 Creating tables...');
    await sequelize.sync({ force: true });
    console.log('✅ Tables created successfully');
    
    // Insert continents
    console.log('📝 Inserting continents...');
    await Continent.bulkCreate(continents);
    console.log(`✅ ${continents.length} continents inserted`);
    
    // Insert countries
    console.log('📝 Inserting countries...');
    await Country.bulkCreate(countries);
    console.log(`✅ ${countries.length} countries inserted`);
    
    console.log('✅ Database initialization completed successfully!');
    
    // Verify data
    const countryCount = await Country.count();
    const continentCount = await Continent.count();
    console.log(`📊 Database stats: ${continentCount} continents, ${countryCount} countries`);
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
    console.log('🔒 Database connection closed.');
  }
}

// Run the initialization
initDatabase();