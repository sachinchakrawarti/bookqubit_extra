// galaxy.js - Insert Geography Schema Data from JSON
// Reads numbered JSON files and inserts into database

const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

console.log('\x1b[36m%s\x1b[0m', '\n🌍 Inserting Geography Schema Data...\n');

const dbPath = path.join(__dirname, '../db/bookqubit_database.db');
const dataPath = __dirname;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Failed to connect:', err);
    process.exit(1);
  }
  console.log('\x1b[32m%s\x1b[0m', '✅ Connected to database\n');
});

db.run('PRAGMA foreign_keys = ON;');

// Helper: Read JSON file
function readJSON(folder, file) {
  const filePath = path.join(dataPath, folder, file);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(`  📡 Loaded ${file} from ${folder}`);
    return data;
  } catch (err) {
    console.log(`  ⚠️  ${folder}/${file} not found`);
    return null;
  }
}

// Helper: Insert data into table
function insertData(table, data, columns, callback) {
  if (!data || data.length === 0) {
    console.log(`  ⏭️  No data for ${table}`);
    if (callback) callback();
    return;
  }

  const placeholders = columns.map(() => '?').join(', ');
  const sql = `INSERT OR IGNORE INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;
  let inserted = 0;
  let total = data.length;

  const stmt = db.prepare(sql);
  data.forEach(row => {
    const values = columns.map(col => row[col]);
    stmt.run(values, function(err) {
      if (!err && this.changes > 0) inserted++;
    });
  });
  stmt.finalize();

  console.log(`  ✅ Inserted ${inserted}/${total} records into ${table}`);
  if (callback) setTimeout(callback, 100);
}

// Insert Geography Schema
function insertGeography() {
  console.log('\x1b[36m%s\x1b[0m', '📁 02_geography_schema:');

  // 1. Continents
  const continents = readJSON('02_geography_schema', '01_continents.json');
  insertData('continents', continents, ['id', 'name', 'code'], () => {

    // 2. Regions
    const regions = readJSON('02_geography_schema', '02_regions.json');
    insertData('regions', regions, ['id', 'name', 'continent_id'], () => {

      // 3. Subregions
      const subregions = readJSON('02_geography_schema', '03_subregions.json');
      insertData('subregions', subregions, ['id', 'name', 'region_id'], () => {

        // 4. Countries
        const countries = readJSON('02_geography_schema', '04_countries.json');
        insertData('countries', countries, [
          'id', 'code', 'name', 'native_name', 'capital', 'region_id',
          'subregion_id', 'continent_id', 'population', 'area_km2',
          'currency_code', 'phone_code', 'tld', 'is_active'
        ], () => {

          // 5. States
          const states = readJSON('02_geography_schema', '05_states.json');
          insertData('states', states, [
            'id', 'country_id', 'code', 'name', 'native_name',
            'capital', 'population', 'area_km2', 'is_active'
          ], () => {

            // 6. Cities
            const cities = readJSON('02_geography_schema', '06_cities.json');
            insertData('cities', cities, [
              'id', 'state_id', 'name', 'native_name', 'population',
              'latitude', 'longitude', 'timezone_id', 'postal_code',
              'is_capital', 'is_active'
            ], () => {

              // 7. Timezones
              const timezones = readJSON('02_geography_schema', '07_timezones.json');
              insertData('timezones', timezones, ['id', 'name', 'offset', 'code'], () => {

                // 8. Currencies
                const currencies = readJSON('02_geography_schema', '08_currencies.json');
                insertData('currencies', currencies, ['id', 'code', 'name', 'symbol', 'symbol_native'], () => {

// 9. Country Codes
const countryCodes = readJSON('02_geography_schema', '09_country_codes.json');
insertData('country_codes', countryCodes, ['country_id', 'standard', 'code', 'is_preferred'], () => {
  
                    console.log('\x1b[32m%s\x1b[0m', '\n✅ Geography Schema inserted successfully!\n');

                    // Show summary
                    db.all("SELECT name FROM sqlite_master WHERE type='table' AND name IN ('continents', 'regions', 'subregions', 'countries', 'states', 'cities', 'timezones', 'currencies', 'country_codes')", (err, rows) => {
                      if (!err && rows) {
                        console.log('\x1b[36m%s\x1b[0m', '📊 Tables populated:');
                        rows.forEach(row => {
                          console.log(`  ✅ ${row.name}`);
                        });
                      }
                      db.close();
                    });

                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

// Run
insertGeography();