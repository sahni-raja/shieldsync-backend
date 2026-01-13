import express from "express";
import {
  approveAgency,
  getPendingAgencies,
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
   ✅ NEW: GENERIC AGENCY FETCH API
   Supports: ?status=pending
   ================================= */
router.get(
  "/agencies",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  async (req, res, next) => {
    // If status=pending → reuse existing controller
    if (req.query.status === "pending") {
      return getPendingAgencies(req, res, next);
    }

    // Future extension placeholder
    return res.status(400).json({
      message: "Unsupported agency query",
    });
  }
);

export default router;
