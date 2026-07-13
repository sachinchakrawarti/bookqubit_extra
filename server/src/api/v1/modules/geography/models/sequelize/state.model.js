/**
 * State Model
 * Sequelize model for states/provinces
 */

import { DataTypes } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';

const StateModel = sequelize.define('State', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [2, 100]
    }
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
    validate: {
      len: [1, 10]
    }
  },
  country_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'countries',
      key: 'id'
    }
  },
  native_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  is_capital_state: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0
    }
  },
  area: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  region: {
    type: DataTypes.STRING(100),
    allowNull: true
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
  tableName: 'states',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  underscored: true,
  indexes: [
    {
      fields: ['country_id']
    },
    {
      fields: ['name']
    },
    {
      fields: ['code']
    }
  ]
});

// ==========================================
// Model Associations
// ==========================================

StateModel.associate = (models) => {
  StateModel.belongsTo(models.Country, {
    foreignKey: 'country_id',
    as: 'country'
  });
  
  StateModel.hasMany(models.City, {
    foreignKey: 'state_id',
    as: 'cities'
  });
};

// ==========================================
// Model Scopes
// ==========================================

StateModel.addScope('withCountry', {
  include: [
    {
      association: 'country'
    }
  ]
});

StateModel.addScope('withCities', {
  include: [
    {
      association: 'cities',
      where: { deleted_at: null },
      required: false
    }
  ]
});

// ==========================================
// Model Hooks
// ==========================================

StateModel.addHook('beforeCreate', (state) => {
  state.created_at = new Date();
  state.updated_at = new Date();
});

StateModel.addHook('beforeUpdate', (state) => {
  state.updated_at = new Date();
});

// ==========================================
// Model Methods
// ==========================================

StateModel.prototype.getFullName = function() {
  return `${this.name}${this.code ? ` (${this.code})` : ''}`;
};

StateModel.prototype.countCities = async function() {
  const cityModel = this.sequelize.models.City;
  return await cityModel.count({
    where: {
      state_id: this.id,
      deleted_at: null
    }
  });
};

// ==========================================
// Export
// ==========================================

export default StateModel;