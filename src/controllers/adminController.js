import User from "../models/User.js";

export const approveAgency = async (req, res) => {
  try {
    const agency = await User.findById(req.params.id);

    if (!agency || agency.role !== "AGENCY_ADMIN") {
      return res.status(404).json({ message: "Agency not found" });
    }

    agency.isApproved = true;

    agency.approvalStatus = "approved";

    await agency.save();

    res.status(200).json({
      message: "Agency approved successfully",
      agencyId: agency._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPendingAgencies = async (req, res) => {
  try {
    const agencies = await User.find({
      role: "AGENCY_ADMIN",
      approvalStatus: "pending", 
      isApproved: false,         
    }).select("-password");

    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllAgencies = async (req, res) => {
  try {
    const agencies = await User.find({
      role: "AGENCY_ADMIN",
      approvalStatus: "approved",
      isApproved: true,
    }).select("-password");

    res.status(200).json(agencies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
