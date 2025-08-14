const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  'postgresql://meu_portfolio_db_dfqo_user:JwsLvMqc98unAMCA2w0acLNC00sdVHZR@dpg-d2ed1tuuk2gs73b9ia6g-a/meu_portfolio_db_dfqo',
  {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
