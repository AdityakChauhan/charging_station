require('dotenv').config({ path: "D://web_dev/charging_station/backend/.env" });
const { Sequelize } = require('sequelize');

// console.log('DB_PASS:', process.env.DB_PASS);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false,
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