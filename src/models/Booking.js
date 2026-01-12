import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    securityPersonnel: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    serviceType: { type: String, required: true },
    bookingDate: { type: Date, required: true },
    durationHours: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },
    liveTrackingEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
