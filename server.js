import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import authRoutes from "./src/routes/authRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import subscriptionRoutes from "./src/routes/subscriptionRoutes.js";
import jobRoutes from "./src/routes/jobRoutes.js";
import emergencyRoutes from "./src/routes/emergencyRoutes.js";

import adminRoutes from "./src/routes/adminRoutes.js";
import agencyRoutes from "./src/routes/agencyRoutes.js";

import cors from "cors";

import {
  notFound,
  errorHandler,
} from "./src/middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

/* =========================
   ✅ UPDATED CORS CONFIG
   ========================= */
const allowedOrigins = [
  "http://localhost:3000",        // Next.js dev
  "http://localhost:5173",        // Vite dev
  "https://your-frontend.vercel.app", // Production (future)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/emergency", emergencyRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/agency", agencyRoutes);

/* =========================
   ERROR HANDLING
   ========================= */
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
