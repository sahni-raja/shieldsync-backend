import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";

// POST JOB
export const postJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    const job = await Job.create({
      agency: req.user.id,
      title,
      description,
    });

    res.status(201).json({ message: "Job posted", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// APPLY JOB
export const applyJob = async (req, res) => {
  try {
    const { jobId, documents } = req.body;

    const application = await JobApplication.create({
      job: jobId,
      candidate: req.user.id,
      documents,
    });

    res.status(201).json({
      message: "Application submitted",
      application,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
