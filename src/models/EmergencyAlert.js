import mongoose from "mongoose";

const emergencyAlertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    location: {
      latitude: Number,
      longitude: Number,
    },
    isResolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("EmergencyAlert", emergencyAlertSchema);
