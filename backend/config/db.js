require('dotenv').config({ path: "D://web_dev/charging_station/backend/.env" });
const { Sequelize } = require('sequelize');

// console.log('DB_PASS:', process.env.DB_PASS);

const sequelize = new Sequelize('chargingstations', 'root', process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;