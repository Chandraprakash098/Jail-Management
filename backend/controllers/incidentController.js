const Incident = require("../models/Incident");

// Get all incidents
const getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({});
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching incidents" });
  }
};

// Get incident by ID
const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (incident) {
      res.json(incident);
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching incident" });
  }
};

// Create a new incident
const createIncident = async (req, res) => {
  const { description, involvedParties, actionsTaken } = req.body;

  try {
    const incident = new Incident({
      description,
      involvedParties,
      actionsTaken,
    });

    const createdIncident = await incident.save();
    res.status(201).json(createdIncident);
  } catch (error) {
    res.status(500).json({ message: "Error creating incident" });
  }
};

// Update an existing incident
const updateIncident = async (req, res) => {
  const { description, involvedParties, actionsTaken } = req.body;

  try {
    const incident = await Incident.findById(req.params.id);
    if (incident) {
      incident.description = description;
      incident.involvedParties = involvedParties;
      incident.actionsTaken = actionsTaken;

      const updatedIncident = await incident.save();
      res.json(updatedIncident);
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating incident" });
  }
};

// Delete an incident
const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (incident) {
      await incident.remove();
      res.json({ message: "Incident removed" });
    } else {
      res.status(404).json({ message: "Incident not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting incident" });
  }
};

module.exports = {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident,
};
