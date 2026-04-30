import express from "express";
import {
  createLead,
  deleteLead,
  getLeads,
  updateLead,
} from "../controllers/leadController.js";
import protect from "../middleware/authMiddleware.js"

const router = express.Router();

router.post("/leads", protect, createLead);
router.get("/leads", protect, getLeads);
router.put("/leads/:id", protect, updateLead);
router.delete("/leads/:id", protect, deleteLead);

export default router;