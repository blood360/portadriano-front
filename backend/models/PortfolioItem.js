const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PortfolioItem = sequelize.define('PortfolioItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // Campos para a imagem em Base64
  imageData: {
    type: DataTypes.TEXT('long'), 
    allowNull: true
  },
  mimeType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // Novos campos para certificados
  issuer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  startDate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endDate: {
    type: DataTypes.STRING,
    allowNull: true
  },
  hours: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  courseType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expectedEndDate: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = PortfolioItem;
