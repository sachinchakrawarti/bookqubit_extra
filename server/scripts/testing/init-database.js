/**
 * Initialize Database
 * Creates all tables and seeds initial data
 */

import { sequelize } from '../src/db/sequelize.js';
import {
  Country,
  State,
  City,
  Continent
} from '../src/api/v1/modules/geography/models/sequelize/index.js';

async function initDatabase() {
  try {
    console.log('🔄 Connecting to database...');
    await sequelize.authenticate();
    console.log('✅ Database connected!');

    // Disable foreign key checks for SQLite
    await sequelize.query('PRAGMA foreign_keys = OFF;');
    console.log('🔓 Foreign key checks disabled');

    console.log('🔄 Creating tables...');
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('✅ Tables created!');

    // Re-enable foreign key checks
    await sequelize.query('PRAGMA foreign_keys = ON;');
    console.log('🔒 Foreign key checks enabled');

    console.log('🔄 Seeding data...');

    // Seed Continents
    const continents = await Continent.bulkCreate([
      { id: 1, name: 'Africa', code: 'AF' },
      { id: 2, name: 'Antarctica', code: 'AN' },
      { id: 3, name: 'Asia', code: 'AS' },
      { id: 4, name: 'Europe', code: 'EU' },
      { id: 5, name: 'North America', code: 'NA' },
      { id: 6, name: 'Oceania', code: 'OC' },
      { id: 7, name: 'South America', code: 'SA' }
    ]);
    console.log(`✅ Seeded ${continents.length} continents`);

    // Seed Countries
    const countries = await Country.bulkCreate([
      {
        code: 'US',
        name: 'United States',
        native_name: 'United States',
        capital: 'Washington D.C.',
        continent_id: 5,
        population: 331000000,
        area_km2: 9833520,
        currency_code: 'USD',
        phone_code: '+1',
        tld: '.us',
        is_active: true
      },
      {
        code: 'GB',
        name: 'United Kingdom',
        native_name: 'United Kingdom',
        capital: 'London',
        continent_id: 4,
        population: 67886000,
        area_km2: 243610,
        currency_code: 'GBP',
        phone_code: '+44',
        tld: '.uk',
        is_active: true
      },
      {
        code: 'IN',
        name: 'India',
        native_name: 'भारत',
        capital: 'New Delhi',
        continent_id: 3,
        population: 1380004385,
        area_km2: 3287263,
        currency_code: 'INR',
        phone_code: '+91',
        tld: '.in',
        is_active: true
      },
      {
        code: 'AU',
        name: 'Australia',
        native_name: 'Australia',
        capital: 'Canberra',
        continent_id: 6,
        population: 25687041,
        area_km2: 7692024,
        currency_code: 'AUD',
        phone_code: '+61',
        tld: '.au',
        is_active: true
      },
      {
        code: 'CA',
        name: 'Canada',
        native_name: 'Canada',
        capital: 'Ottawa',
        continent_id: 5,
        population: 38250000,
        area_km2: 9984670,
        currency_code: 'CAD',
        phone_code: '+1',
        tld: '.ca',
        is_active: true
      }
    ]);
    console.log(`✅ Seeded ${countries.length} countries`);

    // Seed States
    const states = await State.bulkCreate([
      { name: 'California', code: 'CA', country_id: countries[0].id, population: 39538223 },
      { name: 'Texas', code: 'TX', country_id: countries[0].id, population: 29145505 },
      { name: 'New York', code: 'NY', country_id: countries[0].id, population: 20201249 },
      { name: 'England', code: 'ENG', country_id: countries[1].id, population: 55980000 },
      { name: 'Scotland', code: 'SCT', country_id: countries[1].id, population: 5460000 },
      { name: 'Maharashtra', code: 'MH', country_id: countries[2].id, population: 112374333 },
      { name: 'Uttar Pradesh', code: 'UP', country_id: countries[2].id, population: 199812341 },
      { name: 'New South Wales', code: 'NSW', country_id: countries[3].id, population: 8183800 },
      { name: 'Ontario', code: 'ON', country_id: countries[4].id, population: 14711827 }
    ]);
    console.log(`✅ Seeded ${states.length} states`);

    // Seed Cities
    await City.bulkCreate([
      { name: 'Los Angeles', state_id: states[0].id, population: 3980000, is_capital: false },
      { name: 'San Francisco', state_id: states[0].id, population: 883305, is_capital: false },
      { name: 'Houston', state_id: states[1].id, population: 2304580, is_capital: false },
      { name: 'New York City', state_id: states[2].id, population: 8419000, is_capital: false },
      { name: 'London', state_id: states[3].id, population: 8982000, is_capital: true },
      { name: 'Manchester', state_id: states[3].id, population: 553230, is_capital: false },
      { name: 'Edinburgh', state_id: states[4].id, population: 488050, is_capital: true },
      { name: 'Mumbai', state_id: states[5].id, population: 12478447, is_capital: false },
      { name: 'Lucknow', state_id: states[6].id, population: 2817105, is_capital: true },
      { name: 'Sydney', state_id: states[7].id, population: 5304000, is_capital: true },
      { name: 'Toronto', state_id: states[8].id, population: 2930000, is_capital: true }
    ]);
    console.log(`✅ Seeded cities`);

    console.log('🎉 Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

initDatabase();