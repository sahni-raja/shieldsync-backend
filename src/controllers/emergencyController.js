import EmergencyAlert from "../models/EmergencyAlert.js";

export const triggerSOS = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const alert = await EmergencyAlert.create({
      user: req.user.id,
      location: { latitude, longitude },
    });

    res.status(201).json({
      message: "Emergency alert triggered",
      alert,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
