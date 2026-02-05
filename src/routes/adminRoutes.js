import express from "express";
import {
  approveAgency,
  getPendingAgencies,
  getAllAgencies, 
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

router.get(
  "/agencies",
  protect,
  authorizeRoles("SUPER_ADMIN"),
  (req, res, next) => {
    if (req.query.status === "pending") {
      return getPendingAgencies(req, res, next);
    }

    return getAllAgencies(req, res, next);
  }
);

export default router;
