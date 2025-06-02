const express = require("express");
const router = express.Router();
const {
  createChargingStation,
  getAllChargingStations,
  getChargingStationById,
  updateChargingStation,
  deleteChargingStation,
  getChargingStationsByName
} = require("../controllers/ChargingStation.js");

const {authenticate} = require("../middlewares/Authenticate.js"); // JWT middleware

// Public routes
router.get("/", getAllChargingStations); // GET /api/stations
router.get("/search", getChargingStationsByName); // GET /api/stations/search?name=...
router.get("/:id", getChargingStationById); // GET /api/stations/:id

// Protected routes
router.post("/", authenticate, createChargingStation); // POST /api/stations
router.put("/:id", authenticate, updateChargingStation); // PUT /api/stations/:id
router.delete("/:id", authenticate, deleteChargingStation); // DELETE /api/stations/:id

module.exports = router;
