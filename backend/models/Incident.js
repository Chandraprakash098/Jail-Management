const mongoose = require("mongoose");

const incidentSchema = mongoose.Schema(
  {
    description: { type: String, required: true },
    involvedParties: [{ type: String, required: true }],
    actionsTaken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Incident = mongoose.model("Incident", incidentSchema);

module.exports = Incident;
