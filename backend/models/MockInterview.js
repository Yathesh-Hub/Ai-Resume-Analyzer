const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const MockInterview = sequelize.define('MockInterview', {
  id: {
    type:          DataTypes.INTEGER,
    primaryKey:    true,
    autoIncrement: true
  },
  userId: {
    type:      DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key:   'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  resumeId: {
    type:      DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'resumes',
      key:   'id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
  role: {
    type:      DataTypes.STRING(100),
    allowNull: false
  },
  questions: {
    type:         DataTypes.JSONB,
    defaultValue: []
  },
  overallScore: {
    type:         DataTypes.INTEGER,
    defaultValue: 0
  },
  overallFeedback: {
    type: DataTypes.TEXT
  },
  status: {
    type:         DataTypes.STRING(20),
    defaultValue: 'in-progress'
  },
  completedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName:  'mock_interviews',
  timestamps: true
});

// Associations — defined here so they load when models are required together
MockInterview.associate = (models) => {
  MockInterview.belongsTo(models.User,   { foreignKey: 'userId',   onDelete: 'CASCADE' });
  MockInterview.belongsTo(models.Resume, { foreignKey: 'resumeId', onDelete: 'SET NULL' });
};

module.exports = MockInterview;
