const mongoose = require("mongoose");

const visitationSchema = mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    relation: { type: String, required: true },
    approvalStatus: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Visitation = mongoose.model("Visitation", visitationSchema);

module.exports = Visitation;
