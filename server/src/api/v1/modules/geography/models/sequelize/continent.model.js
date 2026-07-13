/**
 * Continent Model
 * Sequelize model for continents
 * Matches the actual database schema
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';

const ContinentModel = sequelize.define('Continent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'name'
  },
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
    field: 'code'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: 'continents',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  // No paranoid/soft delete since there's no deleted_at column
  underscored: true
});

// ==========================================
// Model Associations
// ==========================================

ContinentModel.associate = (models) => {
  ContinentModel.hasMany(models.Country, {
    foreignKey: 'continent_id',
    as: 'countries'
  });
};

// ==========================================
// Model Hooks
// ==========================================

ContinentModel.addHook('beforeCreate', (continent) => {
  continent.created_at = new Date();
  continent.updated_at = new Date();
});

ContinentModel.addHook('beforeUpdate', (continent) => {
  continent.updated_at = new Date();
});

// ==========================================
// Model Methods
// ==========================================

ContinentModel.prototype.countCountries = async function() {
  const countryModel = this.sequelize.models.Country;
  return await countryModel.count({
    where: {
      continent_id: this.id,
      deleted_at: null
    }
  });
};

// ==========================================
// Export
// ==========================================

export default ContinentModel;