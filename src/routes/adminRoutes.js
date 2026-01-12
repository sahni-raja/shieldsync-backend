import express from "express";
import {
  approveAgency,
  getPendingAgencies,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/agencies/pending",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getPendingAgencies
);

router.put(
  "/agency/:id/approve",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  approveAgency
);

export default router;
