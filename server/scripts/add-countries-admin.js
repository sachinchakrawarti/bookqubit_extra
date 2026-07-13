// scripts/add-countries-admin.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/admin/geography';

// New countries to add (with continent_id mapping)
const newCountries = [
  {
    code: 'PK',
    name: 'Pakistan',
    native_name: 'پاکستان',
    capital: 'Islamabad',
    continent_id: 3, // Asia
    population: 220892340,
    area_km2: 881913,
    currency_code: 'PKR',
    phone_code: '+92',
    tld: '.pk',
    is_active: true
  },
  {
    code: 'BD',
    name: 'Bangladesh',
    native_name: 'বাংলাদেশ',
    capital: 'Dhaka',
    continent_id: 3, // Asia
    population: 164689383,
    area_km2: 147570,
    currency_code: 'BDT',
    phone_code: '+880',
    tld: '.bd',
    is_active: true
  },
  {
    code: 'VN',
    name: 'Vietnam',
    native_name: 'Việt Nam',
    capital: 'Hanoi',
    continent_id: 3, // Asia
    population: 97338579,
    area_km2: 331212,
    currency_code: 'VND',
    phone_code: '+84',
    tld: '.vn',
    is_active: true
  },
  {
    code: 'TH',
    name: 'Thailand',
    native_name: 'ประเทศไทย',
    capital: 'Bangkok',
    continent_id: 3, // Asia
    population: 69799978,
    area_km2: 513120,
    currency_code: 'THB',
    phone_code: '+66',
    tld: '.th',
    is_active: true
  },
  {
    code: 'TR',
    name: 'Turkey',
    native_name: 'Türkiye',
    capital: 'Ankara',
    continent_id: 4, // Europe (or Asia depending on classification)
    population: 84339067,
    area_km2: 783562,
    currency_code: 'TRY',
    phone_code: '+90',
    tld: '.tr',
    is_active: true
  },
  {
    code: 'NL',
    name: 'Netherlands',
    native_name: 'Nederland',
    capital: 'Amsterdam',
    continent_id: 4, // Europe
    population: 17134872,
    area_km2: 41543,
    currency_code: 'EUR',
    phone_code: '+31',
    tld: '.nl',
    is_active: true
  },
  {
    code: 'SE',
    name: 'Sweden',
    native_name: 'Sverige',
    capital: 'Stockholm',
    continent_id: 4, // Europe
    population: 10099265,
    area_km2: 450295,
    currency_code: 'SEK',
    phone_code: '+46',
    tld: '.se',
    is_active: true
  },
  {
    code: 'NO',
    name: 'Norway',
    native_name: 'Norge',
    capital: 'Oslo',
    continent_id: 4, // Europe
    population: 5421241,
    area_km2: 385207,
    currency_code: 'NOK',
    phone_code: '+47',
    tld: '.no',
    is_active: true
  },
  {
    code: 'DK',
    name: 'Denmark',
    native_name: 'Danmark',
    capital: 'Copenhagen',
    continent_id: 4, // Europe
    population: 5831404,
    area_km2: 43094,
    currency_code: 'DKK',
    phone_code: '+45',
    tld: '.dk',
    is_active: true
  },
  {
    code: 'FI',
    name: 'Finland',
    native_name: 'Suomi',
    capital: 'Helsinki',
    continent_id: 4, // Europe
    population: 5540720,
    area_km2: 338424,
    currency_code: 'EUR',
    phone_code: '+358',
    tld: '.fi',
    is_active: true
  }
];

async function addCountries() {
  console.log('🔄 Adding new countries via Admin API...\n');
  
  let added = 0;
  let errors = 0;

  for (const country of newCountries) {
    try {
      console.log(`📝 Adding: ${country.name} (${country.code})...`);
      const response = await axios.post(`${API_URL}/countries`, country);
      if (response.status === 200 || response.status === 201) {
        console.log(`✅ Added: ${country.name} (${country.code})`);
        added++;
      }
    } catch (error) {
      if (error.response) {
        console.log(`❌ Failed to add ${country.name} (${country.code}): ${error.response.data.message || error.message}`);
        if (error.response.data.errors) {
          console.log('  Errors:', JSON.stringify(error.response.data.errors, null, 2));
        }
      } else {
        console.log(`❌ Failed to add ${country.name} (${country.code}): ${error.message}`);
      }
      errors++;
    }
  }

  console.log(`\n📊 Summary: ${added} countries added, ${errors} errors`);
  
  // Get updated list
  try {
    const response = await axios.get(`${API_URL}/countries`);
    console.log(`\n📋 Total countries in database: ${response.data.data?.length || response.data.length || 0}`);
  } catch (error) {
    console.log('❌ Failed to fetch updated country list');
  }
}

// Run the function
addCountries();