import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings, // ✅ NEW (ADMIN)
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =========================================================
   CLIENT ROUTES (KEEP AS-IS)
========================================================= */
router.post("/", protect, authorizeRoles("CLIENT"), createBooking);
router.get("/my", protect, authorizeRoles("CLIENT"), getMyBookings);

/* =========================================================
   ADMIN ROUTE (ADDED ONLY)
========================================================= */
router.get(
  "/admin/all",
  protect,
  authorizeRoles("SUPER_ADMIN", "AGENCY_ADMIN"),
  getAllBookings
);

export default router;
