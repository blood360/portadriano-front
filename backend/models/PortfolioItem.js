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
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  repositoryLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectLink: {
    type: DataTypes.STRING,
    allowNull: true
  },
  issuer: {
    type: DataTypes.STRING,
    allowNull: true
  },
  date: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = PortfolioItem;
