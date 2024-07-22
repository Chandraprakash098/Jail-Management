const express = require("express");
const router = express.Router();
const {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
} = require("../controllers/incidentController");
const { protect } = require("../middleware/authMiddleware");

// Get all incidents
router.route("/").get(protect, getIncidents).post(protect, createIncident);

// Get, update, and delete incident by ID
router
  .route("/:id")
  .get(protect, getIncidentById)
  .put(protect, updateIncident)
  .delete(protect, deleteIncident);

module.exports = router;
