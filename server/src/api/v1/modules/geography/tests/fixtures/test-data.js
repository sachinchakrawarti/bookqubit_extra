/**
 * Test Data Fixtures
 */

export const testCountries = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
  }
];

export const testStates = [
  {
    id: 1,
    name: 'California',
    code: 'CA',
    country_id: 1,
    population: 39538223,
    area_km2: 423970
  },
  {
    id: 2,
    name: 'Texas',
    code: 'TX',
    country_id: 1,
    population: 29145505,
    area_km2: 695662
  },
  {
    id: 3,
    name: 'England',
    code: 'ENG',
    country_id: 2,
    population: 55980000
  }
];

export const testCities = [
  {
    id: 1,
    name: 'Los Angeles',
    state_id: 1,
    population: 3980000,
    is_capital: false
  },
  {
    id: 2,
    name: 'Houston',
    state_id: 2,
    population: 2304580,
    is_capital: false
  },
  {
    id: 3,
    name: 'London',
    state_id: 3,
    population: 8982000,
    is_capital: true
  }
];

export const testContinent = {
  id: 1,
  name: 'Africa',
  code: 'AF'
};