import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "AGENCY_ADMIN", "SECURITY", "CLIENT"],
      required: true,
    },

    /* =========================
       EXISTING APPROVAL FLAG
       (KEPT SAFE)
       ========================= */
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role === "CLIENT" || this.role === "SUPER_ADMIN";
      },
    },

    /* =========================
       ✅ NEW: AGENCY APPROVAL STATUS
       ========================= */
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: function () {
        if (this.role === "AGENCY_ADMIN") return "pending";
        return "approved";
      },
    },

    createdByAgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/* =========================
   PASSWORD HASHING
   ========================= */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/* =========================
   PASSWORD MATCH
   ========================= */
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
