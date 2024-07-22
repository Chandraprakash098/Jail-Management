const mongoose = require("mongoose");

const prisonerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    bookingId: { type: String, required: true },
    charges: { type: String, required: true },
    sentenceDetails: { type: String, required: true },
    location: { type: String, required: true },
    documents: [{ type: String }],
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

const Prisoner = mongoose.model("Prisoner", prisonerSchema);

module.exports = Prisoner;
