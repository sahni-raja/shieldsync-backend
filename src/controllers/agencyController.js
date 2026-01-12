import User from "../models/User.js";

/**
 * @desc Create a new guard under agency
 * @route POST /api/agency/guards
 * @access AGENCY_ADMIN
 */
export const createGuard = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const guard = await User.create({
      name,
      email,
      phone,
      password,
      role: "SECURITY",
      createdByAgency: req.user._id,
      isApproved: false,
    });

    res.status(201).json({
      message: "Guard created successfully. Awaiting approval.",
      guardId: guard._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Get pending guards for agency
 * @route GET /api/agency/guards/pending
 * @access AGENCY_ADMIN
 */
export const getPendingGuards = async (req, res) => {
  try {
    const guards = await User.find({
      role: "SECURITY",
      isApproved: false,
      createdByAgency: req.user._id,
    }).select("-password");

    res.status(200).json(guards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc Approve guard
 * @route PUT /api/agency/guard/:id/approve
 * @access AGENCY_ADMIN
 */
export const approveGuard = async (req, res) => {
  try {
    const guard = await User.findById(req.params.id);

    if (!guard || guard.role !== "SECURITY") {
      return res.status(404).json({ message: "Security personnel not found" });
    }

    if (
      !guard.createdByAgency ||
      guard.createdByAgency.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can approve only your own guards",
      });
    }

    guard.isApproved = true;
    await guard.save();

    res.status(200).json({
      message: "Security personnel approved successfully",
      guardId: guard._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
