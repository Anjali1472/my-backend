// // routes/jobRoutes.js
// const express = require("express");
// const router = express.Router();
// const { Job } = require("../models");

// // ✅ POST /api/jobs - Create job
// router.post("/", async (req, res) => {
//   try {
//     const job = await Job.create(req.body);
//     res.status(201).json(job);
//   } catch (err) {
//     console.error("Error creating job:", err);
//     res.status(500).json({ error: "Failed to create job" });
//   }
// });

// // ✅ GET /api/jobs - Fetch all jobs
// router.get("/", async (req, res) => {
//   try {
//     const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
//     res.json(jobs);
//   } catch (err) {
//     console.error("Error fetching jobs:", err);
//     res.status(500).json({ error: "Failed to fetch jobs" });
//   }
// });

// // GET /api/jobs/:id
// router.get("/:id", async (req, res) => {
//   try {
//     const job = await Job.findByPk(req.params.id); // ✅ use findByPk for Sequelize
//     if (!job) {
//       return res.status(404).json({ error: "Job not found" });
//     }
//     res.json(job);
//   } catch (err) {
//     console.error("Error fetching job:", err);
//     res.status(500).json({ error: "Failed to fetch job" });
//   }
// });

// module.exports = router;
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const dotenv = require("dotenv");

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Mount jobRoutes ✅
// app.use("/api/jobs", require("./routes/jobRoutes"));

// // Example: other routes
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api", require("./routes/profile"));
// app.use("/api/application", require("./routes/applicationRoutes"));

// // DB setup
// const db = require("./models");
// db.sequelize.sync(); // ✅ This connects to the DB

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });


// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const { Job } = require("../models");

// POST /api/jobs
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// GET /api/jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

module.exports = router;
