import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id, role) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (role === "SECURITY") {
      return res.status(403).json({
        message: "Security personnel must be created by an agency",
      });
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      isApproved: role === "CLIENT" || role === "SUPER_ADMIN",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("📧 Email received:", email);
    console.log("🔑 Password received:", password);

    const user = await User.findOne({ email });

    console.log("👤 User found:", user);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    if (!user.isApproved) {
      return res.status(403).json({
        message: "Account pending approval. Please contact admin.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    console.log("🔐 Password match result:", isMatch);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};
