/**
 * Country Model
 * Sequelize model for countries
 * Matches the actual database schema
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';

const CountryModel = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  },
  code: {
    type: DataTypes.STRING(2),
    allowNull: false,
    unique: true,
    field: 'code'
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'name'
  },
  native_name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'native_name'
  },
  capital: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'capital'
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'region_id',
    references: {
      model: 'regions',
      key: 'id'
    }
  },
  subregion_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'subregion_id',
    references: {
      model: 'subregions',
      key: 'id'
    }
  },
  continent_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'continent_id',
    references: {
      model: 'continents',
      key: 'id'
    }
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'population'
  },
  area_km2: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'area_km2'
  },
  currency_code: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'currency_code'
  },
  phone_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
    field: 'phone_code'
  },
  tld: {
    type: DataTypes.STRING(10),
    allowNull: true,
    field: 'tld'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
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
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'deleted_at'
  }
}, {
  tableName: 'countries',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  underscored: true
});

// ==========================================
// Model Associations
// ==========================================

CountryModel.associate = (models) => {
  CountryModel.belongsTo(models.Continent, {
    foreignKey: 'continent_id',
    as: 'continent'
  });
  
  CountryModel.belongsTo(models.Region, {
    foreignKey: 'region_id',
    as: 'region'
  });
  
  CountryModel.belongsTo(models.Subregion, {
    foreignKey: 'subregion_id',
    as: 'subregion'
  });
  
  CountryModel.hasMany(models.State, {
    foreignKey: 'country_id',
    as: 'states'
  });
};

// ==========================================
// Model Hooks
// ==========================================

CountryModel.addHook('beforeCreate', (country) => {
  country.created_at = new Date();
  country.updated_at = new Date();
});

CountryModel.addHook('beforeUpdate', (country) => {
  country.updated_at = new Date();
});

// ==========================================
// Model Methods
// ==========================================

CountryModel.prototype.getFullName = function() {
  return `${this.name} (${this.code})`;
};

CountryModel.prototype.countStates = async function() {
  const stateModel = this.sequelize.models.State;
  return await stateModel.count({
    where: {
      country_id: this.id,
      deleted_at: null
    }
  });
};

// ==========================================
// Export
// ==========================================

export default CountryModel;