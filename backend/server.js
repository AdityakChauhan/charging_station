require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/User.js');
const chargingStationRoutes = require('./routes/ChargingStation.js');
const sequelize = require('./config/db');
const User = require('./models/User');
// Add other models if needed

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/stations', chargingStationRoutes);

app.get('/', (req, res) => {
  res.send('Charging Station API is running.');
});

const PORT = process.env.BACKEND_PORT || 8000;

sequelize.sync({ alter: true }) // or { force: true } for development only (drops and recreates tables)
  .then(() => {
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
