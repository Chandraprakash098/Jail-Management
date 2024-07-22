const Visitation = require("../models/Visitation");

const getVisitations = async (req, res) => {
  try {
    const visitations = await Visitation.find({});
    res.json(visitations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visitations" });
  }
};

const createVisitation = async (req, res) => {
  const { visitorName, relation, approvalStatus } = req.body;

  try {
    const visitation = new Visitation({
      visitorName,
      relation,
      approvalStatus,
    });

    const createdVisitation = await visitation.save();
    res.status(201).json(createdVisitation);
  } catch (error) {
    res.status(500).json({ message: "Error creating visitation" });
  }
};

module.exports = {
  getVisitations,
  createVisitation,
};
