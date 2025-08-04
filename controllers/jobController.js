const { JobListing } = require('../models');

exports.getJobs = async (req, res) => {
  try {
    const jobs = await JobListing.findAll({ order: [["createdAt", "DESC"]] });
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await JobListing.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    console.error("Error fetching job by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.postJob = async (req, res) => {
  try {
    const job = await JobListing.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ error: "Failed to create job" });
  }
};
