const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Update path as needed
const { v4: uuidv4 } = require("uuid");

const ChargingStation = sequelize.define("ChargingStation", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true, // Ensure unique id
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, // Ensure unique name
    validate: {
      notEmpty: true,
    },
  },
  location: {
    type: DataTypes.GEOMETRY('POINT', 4326),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Inactive"),
    allowNull: false,
    defaultValue: "Active",
  },
  powerOutput: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.1, 
    },
  },
  connectorType: {
    type: DataTypes.ENUM("Type2", "CCS", "CHAdeMO", "Tesla", "GB/T"),
    allowNull: false,
  }});

module.exports = ChargingStation;
