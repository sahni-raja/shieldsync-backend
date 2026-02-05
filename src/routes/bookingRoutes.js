import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings, 
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("CLIENT"), createBooking);
router.get("/my", protect, authorizeRoles("CLIENT"), getMyBookings);

router.get(
  "/admin/all",
  protect,
  authorizeRoles("SUPER_ADMIN", "AGENCY_ADMIN"),
  getAllBookings
);

export default router;
