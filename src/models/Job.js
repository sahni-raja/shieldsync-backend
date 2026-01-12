import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    agency: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    isOpen: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
