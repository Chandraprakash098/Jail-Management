const Prisoner = require("../models/Prisoner");

const getPrisoners = async (req, res) => {
  const prisoners = await Prisoner.find({});
  res.json(prisoners);
};

const getPrisonerById = async (req, res) => {
  const prisoner = await Prisoner.findById(req.params.id);

  if (prisoner) {
    res.json(prisoner);
  } else {
    res.status(404);
    throw new Error("Prisoner not found");
  }
};

const createPrisoner = async (req, res) => {
  const {
    name,
    bookingId,
    charges,
    sentenceDetails,
    location,
    documents,
    image,
  } = req.body;

  const prisoner = new Prisoner({
    name,
    bookingId,
    charges,
    sentenceDetails,
    location,
    documents: documents.split(",").map((doc) => doc.trim()),
    image,
  });

  const createdPrisoner = await prisoner.save();
  res.status(201).json(createdPrisoner);
};

const updatePrisoner = async (req, res) => {
  const {
    name,
    bookingId,
    charges,
    sentenceDetails,
    location,
    documents,
    image,
  } = req.body;

  const prisoner = await Prisoner.findById(req.params.id);

  if (prisoner) {
    prisoner.name = name;
    prisoner.bookingId = bookingId;
    prisoner.charges = charges;
    prisoner.sentenceDetails = sentenceDetails;
    prisoner.location = location;
    prisoner.documents = documents.split(",").map((doc) => doc.trim());
    prisoner.image = image;

    const updatedPrisoner = await prisoner.save();
    res.json(updatedPrisoner);
  } else {
    res.status(404);
    throw new Error("Prisoner not found");
  }
};

module.exports = {
  getPrisoners,
  getPrisonerById,
  createPrisoner,
  updatePrisoner,
};