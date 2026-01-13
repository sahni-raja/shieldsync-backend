import express from "express";
import {
  approveAgency,
  getPendingAgencies,
  getAllAgencies, // ✅ NEW import
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* =================================
   EXISTING ROUTES (KEPT SAFE)
   ================================= */

// Get all pending agencies (legacy / direct)
router.get(
  "/agencies/pending",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  getPendingAgencies
);

// Approve agency
router.put(
  "/agency/:id/approve",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  approveAgency
);

/* =================================
   ✅ UPDATED: GENERIC AGENCY FETCH API
   Supports:
   - /agencies              → approved agencies
   - /agencies?status=pending → pending agencies
   ================================= */
router.get(
  "/agencies",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  (req, res, next) => {
    // If status=pending → reuse existing controller
    if (req.query.status === "pending") {
      return getPendingAgencies(req, res, next);
    }

    // ✅ DEFAULT: return approved agencies
    return getAllAgencies(req, res, next);
  }
);

export default router;
