const { Op } = require("sequelize");
const ChargingStation = require("../models/ChargingStation.js");

// Helper: sanitize and validate input
function validateStationInput({ name, latitude, longitude, status, powerOutput, connectorType }) {
  if (
    !name ||
    typeof latitude !== "number" ||
    typeof longitude !== "number" ||
    !status ||
    typeof powerOutput !== "number" ||
    !connectorType
  ) {
    return false;
  }
  return true;
}

// Create a new charging station
const createChargingStation = async (req, res) => {
  try {
    const { name, latitude, longitude, status, powerOutput, connectorType } = req.body;

    if (!validateStationInput({ name, latitude, longitude, status, powerOutput, connectorType })) {
      return res.status(400).json({ error: "All fields are required and must be valid: name, latitude (number), longitude (number), status, powerOutput (number), connectorType." });
    }

    // Check for existing station with same name or location
    const existing = await ChargingStation.findOne({
      where: {
        [Op.or]: [
          { name },
          { location: { [Op.eq]: { type: "Point", coordinates: [longitude, latitude] } } }
        ]
      }
    });
    if (existing) {
      return res.status(409).json({ error: "A charging station with the same name or location already exists." });
    }

    const station = await ChargingStation.create({
      name,
      location: { type: "Point", coordinates: [longitude, latitude] }, // Store as GeoJSON Point
      status,
      powerOutput,
      connectorType,
    });

    res.status(201).json({ message: "Charging station created", data: station });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "A charging station with the same name or location already exists." });
    }
    console.error("Create ChargingStation Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get all charging stations with optional filters
const getAllChargingStations = async (req, res) => {
  try {
    const { status, connectorType, minPowerOutput, maxPowerOutput, name } = req.query;

    const where = {};
    if (status) where.status = status;
    if (connectorType) where.connectorType = connectorType;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (minPowerOutput || maxPowerOutput) {
      where.powerOutput = {};
      if (minPowerOutput) where.powerOutput[Op.gte] = parseFloat(minPowerOutput);
      if (maxPowerOutput) where.powerOutput[Op.lte] = parseFloat(maxPowerOutput);
    }

    const stations = await ChargingStation.findAll({ where, order: [["id", "ASC"]] });

    // Format location as latitude/longitude in the response
    const formattedStations = stations.map(station => {
      const plain = station.get({ plain: true });
      if (plain.location && plain.location.type === "Point" && Array.isArray(plain.location.coordinates)) {
        plain.latitude = plain.location.coordinates[1];
        plain.longitude = plain.location.coordinates[0];
      }
      delete plain.location;
      return plain;
    });

    res.json({ count: stations.length, data: formattedStations });
  } catch (err) {
    console.error("GetAll ChargingStations Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get a charging station by ID
const getChargingStationById = async (req, res) => {
  try {
    const station = await ChargingStation.findByPk(req.params.id);
    if (!station) return res.status(404).json({ error: "Station not found" });

    const plain = station.get({ plain: true });
    if (plain.location && plain.location.type === "Point" && Array.isArray(plain.location.coordinates)) {
      plain.latitude = plain.location.coordinates[1];
      plain.longitude = plain.location.coordinates[0];
    }
    delete plain.location;

    res.json({ data: plain });
  } catch (err) {
    console.error("GetById ChargingStation Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Update a charging station
const updateChargingStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByPk(req.params.id);
    if (!station) return res.status(404).json({ error: "Station not found" });

    // Only allow updating certain fields
    const allowedFields = ["name", "latitude", "longitude", "status", "powerOutput", "connectorType"];
    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // Handle location update if latitude or longitude is provided
    if (updates.latitude !== undefined || updates.longitude !== undefined) {
      const currentLocation = station.location && station.location.coordinates
        ? station.location.coordinates
        : [0, 0];
      const newLat = updates.latitude !== undefined ? updates.latitude : currentLocation[1];
      const newLng = updates.longitude !== undefined ? updates.longitude : currentLocation[0];
      updates.location = { type: "Point", coordinates: [newLng, newLat] };
      delete updates.latitude;
      delete updates.longitude;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "No valid fields provided for update." });
    }

    await station.update(updates);

    const plain = station.get({ plain: true });
    if (plain.location && plain.location.type === "Point" && Array.isArray(plain.location.coordinates)) {
      plain.latitude = plain.location.coordinates[1];
      plain.longitude = plain.location.coordinates[0];
    }
    delete plain.location;

    res.json({ message: "Station updated", data: plain });
  } catch (err) {
    console.error("Update ChargingStation Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Delete a charging station
const deleteChargingStation = async (req, res) => {
  try {
    const station = await ChargingStation.findByPk(req.params.id);
    if (!station) return res.status(404).json({ error: "Station not found" });

    await station.destroy();
    res.json({ message: "Station deleted" });
  } catch (err) {
    console.error("Delete ChargingStation Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get charging stations by matching name (case-insensitive, partial match)
const getChargingStationsByName = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({ error: "Name query parameter is required." });
    }

    const stations = await ChargingStation.findAll({
      where: {
        name: { [Op.like]: `%${name}%` }
      },
      order: [["id", "ASC"]]
    });

    // Format location as latitude/longitude in the response
    const formattedStations = stations.map(station => {
      const plain = station.get({ plain: true });
      if (plain.location && plain.location.type === "Point" && Array.isArray(plain.location.coordinates)) {
        plain.latitude = plain.location.coordinates[1];
        plain.longitude = plain.location.coordinates[0];
      }
      delete plain.location;
      return plain;
    });

    res.json({ count: stations.length, data: formattedStations });
  } catch (err) {
    console.error("GetByName ChargingStation Error:", err);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createChargingStation,
  getAllChargingStations,
  getChargingStationById,
  updateChargingStation,
  deleteChargingStation,
  getChargingStationsByName,
};
