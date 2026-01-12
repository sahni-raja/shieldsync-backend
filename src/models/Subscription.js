import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    planName: { type: String, required: true },
    duration: { type: String, enum: ["MONTHLY", "YEARLY"], required: true },
    price: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);
