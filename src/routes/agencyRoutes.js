import express from "express";
import {
  createGuard,
  getPendingGuards,
  approveGuard,
} from "../controllers/agencyController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/agency/guards
 * @desc    Create a guard under agency
 * @access  AGENCY_ADMIN
 */
router.post(
  "/guards",
  protect,
  authorizeRoles("AGENCY_ADMIN"),
  createGuard
);

/**
 * @route   GET /api/agency/guards/pending
 * @desc    Get pending guards of agency
 * @access  AGENCY_ADMIN
 */
router.get(
  "/guards/pending",
  protect,
  authorizeRoles("AGENCY_ADMIN"),
  getPendingGuards
);

/**
 * @route   PUT /api/agency/guard/:id/approve
 * @desc    Approve guard
 * @access  AGENCY_ADMIN
 */
router.put(
  "/guard/:id/approve",
  protect,
  authorizeRoles("AGENCY_ADMIN"),
  approveGuard
);

export default router;