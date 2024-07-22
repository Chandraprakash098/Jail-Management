const express = require("express");
const {
  getVisitations,
  createVisitation,
} = require("../controllers/visitationController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getVisitations).post(protect, createVisitation);

module.exports = router;
