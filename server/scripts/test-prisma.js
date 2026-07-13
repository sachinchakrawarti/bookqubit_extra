import { prisma } from './src/api/v1/modules/geography/prisma/client.js';

async function test() {
  try {
    console.log('🔍 Testing Prisma connection...');
    
    // Test 1: Check if countries exist
    const count = await prisma.country.count();
    console.log(`✅ Countries found: ${count}`);
    
    // Test 2: Get first country
    const firstCountry = await prisma.country.findFirst();
    console.log('✅ First country:', firstCountry);
    
    // Test 3: Get all countries
    const allCountries = await prisma.country.findMany({
      take: 5
    });
    console.log(`✅ First 5 countries:`, allCountries.map(c => c.name));
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

test();