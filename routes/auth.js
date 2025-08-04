const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const multer = require("multer");

// Add JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "998558c1c86ff95cc294286655cf36c70d9ce29e323f7975e1b110ad630f194b";

// Multer setup for resume upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

/**
 * Register
 */
router.post("/register", upload.single("resume"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      qualification,
      college,
      passingYear,
      lastCompany,
      experience,
      skills,
      password,
      confirmPassword,
    } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    let skillsArray = [];
    if (skills) {
      try {
        skillsArray = JSON.parse(skills);
      } catch (e) {
        return res.status(400).json({ error: "Invalid skills format" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      dob,
      qualification,
      college,
      passing_year: passingYear,     // 🔁 mapped to DB field
      last_company: lastCompany, 
      experience,
      skills: skillsArray,
      password: hashedPassword,
      resume: req.file ? req.file.path : null,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * Login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      token,
      user, // Optional: Send user info to frontend
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
