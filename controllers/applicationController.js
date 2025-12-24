const { Application, Job } = require("../models"); // Sequelize model import

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // Sequelize uses findByPk for primary key lookups
    const jobExists = await Job.findByPk(jobId);
    if (!jobExists) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied to this job
    // const existingApplication = await Application.findOne({
    //   where: {
    //     jobId,
    //     user: req.user.id, // assuming 'user' field exists in Application model
    //   },
    // });
    const existingApplication = await Application.findOne({
  where: {
    jobId,
    userId: req.user.id, // ✅ correct column
  },
});
    if (existingApplication) {
      return res.status(400).json({ message: "Already applied to this job" });
    }

    // Create the application
    // const application = await Application.create({
    //   jobId,
    //   user: req.user.id,
    // });
    const application = await Application.create({
      jobId,
      userId: req.user.id, // ✅ correct
    });

    res.status(201).json({ message: "Application successful", application });
  } catch (error) {
    console.error("ApplyToJob Error:", error.message);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    // const applications = await Application.findAll({
    //   where: { user: req.user.id },
    //   include: [
    //     {
    //       model: Job,
    //       as: "job", // make sure association alias is correct
    //     },
    //   ],
    // });
    const applications = await Application.findAll({
      where: { userId: req.user.id }, // ✅
      include: [{ model: Job, as: "job" }],
    });
    res.status(200).json({ applications });
  } catch (error) {
    console.error("GetMyApplications Error:", error.message);
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
};
