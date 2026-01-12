import express from "express";
import { postJob, applyJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/post", protect, authorizeRoles("ADMIN"), postJob);
router.post("/apply", protect, authorizeRoles("SECURITY"), applyJob);

export default router;
