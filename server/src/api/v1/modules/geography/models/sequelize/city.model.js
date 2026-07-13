/**
 * City Model
 * Sequelize model for cities
 */

import { DataTypes, Op } from 'sequelize';
import { sequelize } from '../../db/sequelize.js';

const CityModel = sequelize.define('City', {
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
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'states',
      key: 'id'
    }
  },
  native_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  is_capital: {
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
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    validate: {
      min: 0
    }
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
    validate: {
      min: -90,
      max: 90
    }
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
    validate: {
      min: -180,
      max: 180
    }
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  timezone: {
    type: DataTypes.STRING(50),
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
  tableName: 'cities',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true,
  underscored: true,
  indexes: [
    {
      fields: ['state_id']
    },
    {
      fields: ['name']
    },
    {
      fields: ['is_capital']
    },
    {
      fields: ['latitude', 'longitude']
    }
  ]
});

// ==========================================
// Model Associations
// ==========================================

CityModel.associate = (models) => {
  CityModel.belongsTo(models.State, {
    foreignKey: 'state_id',
    as: 'state'
  });
};

// ==========================================
// Model Scopes
// ==========================================

CityModel.addScope('withState', {
  include: [
    {
      association: 'state',
      include: ['country']
    }
  ]
});

CityModel.addScope('capital', {
  where: { is_capital: true }
});

CityModel.addScope('withCoordinates', {
  where: {
    latitude: { [Op.ne]: null },
    longitude: { [Op.ne]: null }
  }
});

// ==========================================
// Model Hooks
// ==========================================

CityModel.addHook('beforeCreate', (city) => {
  city.created_at = new Date();
  city.updated_at = new Date();
});

CityModel.addHook('beforeUpdate', (city) => {
  city.updated_at = new Date();
});

// ==========================================
// Model Methods
// ==========================================

CityModel.prototype.getFullName = function() {
  return `${this.name}${this.native_name ? ` (${this.native_name})` : ''}`;
};

CityModel.prototype.hasCoordinates = function() {
  return this.latitude !== null && this.longitude !== null;
};

CityModel.prototype.getCoordinates = function() {
  if (this.hasCoordinates()) {
    return {
      latitude: parseFloat(this.latitude),
      longitude: parseFloat(this.longitude)
    };
  }
  return null;
};

// ==========================================
// Export
// ==========================================

export default CityModel;