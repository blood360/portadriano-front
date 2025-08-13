const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Defina como true para ver os logs SQL
    define: {
      timestamps: true // Adiciona createdAt e updatedAt automaticamente
    }
  }
);

module.exports = sequelize;
