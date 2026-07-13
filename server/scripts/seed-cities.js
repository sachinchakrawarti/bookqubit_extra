// scripts/seed-cities.js
import { sequelize } from '../src/api/v1/modules/geography/db/sequelize.js';

async function seedCities() {
  try {
    console.log('🌆 Seeding cities...');
    
    const queryInterface = sequelize.getQueryInterface();
    
    // Get US states
    const states = await queryInterface.select(null, 'states', {
      where: { 
        deleted_at: null 
      }
    });
    
    const cities = [];
    
    // Add cities for each state (example for California)
    const california = states.find(s => s.code === 'CA');
    if (california) {
      cities.push(
        { state_id: california.id, name: 'Los Angeles', population: 3898747, latitude: 34.0522, longitude: -118.2437, is_capital: 0 },
        { state_id: california.id, name: 'San Diego', population: 1423851, latitude: 32.7157, longitude: -117.1611, is_capital: 0 },
        { state_id: california.id, name: 'San Jose', population: 1013375, latitude: 37.3382, longitude: -121.8863, is_capital: 0 },
        { state_id: california.id, name: 'San Francisco', population: 873965, latitude: 37.7749, longitude: -122.4194, is_capital: 0 },
        { state_id: california.id, name: 'Sacramento', population: 524943, latitude: 38.5816, longitude: -121.4944, is_capital: 1 }
      );
    }
    
    // Add more cities for other states...
    
    if (cities.length > 0) {
      for (const city of cities) {
        await queryInterface.bulkInsert('cities', [{
          ...city,
          created_at: new Date(),
          updated_at: new Date()
        }]);
      }
      console.log(`✅ ${cities.length} cities seeded`);
    }
    
    console.log('✅ City seeding completed!');
  } catch (error) {
    console.error('❌ Failed to seed cities:', error.message);
  } finally {
    await sequelize.close();
  }
}

seedCities();