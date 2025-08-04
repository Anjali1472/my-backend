const express = require("express");
const router = express.Router();
const {
  applyToJob,
  getMyApplications,
} = require("../controllers/applicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/apply", authMiddleware, applyToJob);


// Get user's applications
router.get("/", authMiddleware, getMyApplications);

module.exports = router;
