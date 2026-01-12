import User from "../models/User.js";

// APPROVE AGENCY (SUPER_ADMIN only)
export const approveAgency = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== "AGENCY_ADMIN") {
      return res.status(404).json({ message: "Agency not found" });
    }

    agency.isApproved = true;
    await agency.save();

    res.status(200).json({
      message: "Agency approved successfully",
      agencyId: agency._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PENDING AGENCIES
export const getPendingAgencies = async (req, res) => {
  try {
    const agencies = await User.find({
      role: "AGENCY_ADMIN",
      isApproved: false,
    }).select("-password");

    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
