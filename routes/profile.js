const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authMiddleware");
const { User } = require("../models");

router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // Remove sensitive info
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user); // ✅ send user directly
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
