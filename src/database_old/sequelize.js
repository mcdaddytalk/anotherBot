require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    logging: process.env.DB_ENV === 'production' ? false : console.log,
});
