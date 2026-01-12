import express from "express";
import {
  createSubscription,
  getMySubscription,
} from "../controllers/subscriptionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSubscription);
router.get("/my", protect, getMySubscription);

export default router;
