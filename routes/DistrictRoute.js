import express from "express";
import {
  createDistrict,
  getDistricts,
  updateDistrict,
} from "../controllers/District.js";

const router = express.Router();

router.get("/districts", getDistricts);
router.post("/districts", createDistrict);
router.patch("/districts/:id", updateDistrict);

export default router;
