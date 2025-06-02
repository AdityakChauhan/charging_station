require('dotenv').config({ path: "D://web_dev/charging_station/backend/.env" });
const { Sequelize } = require('sequelize');

// Use full Railway DB URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // optional: turn off SQL logging in console
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
