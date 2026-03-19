const express = require("express");
const {
  createEventProposal,
  getMyEventHistory,
} = require("../controllers/eventController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, createEventProposal);
router.get("/history", protect, getMyEventHistory);

module.exports = router;