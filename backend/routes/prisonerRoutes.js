const express = require("express");
const {
  getPrisoners,
  getPrisonerById,
  createPrisoner,
  updatePrisoner,
  deletePrisoner,
} = require("../controllers/prisonerController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getPrisoners).post(protect, createPrisoner);
router
  .route("/:id")
  .get(protect, getPrisonerById)
  .put(protect, updatePrisoner)
  .delete(protect, deletePrisoner);;




module.exports = router;
