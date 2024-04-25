import express from "express";
import {
  createDistrict,
  getDistricts,
  updateDistrict,
  getDistrictById,
  deleteDistrict,
} from "../controllers/District.js";

const router = express.Router();

router.get("/districts", getDistricts);
router.post("/district", createDistrict);
router.patch("/district/:id", updateDistrict);
router.get("/district/:id", getDistrictById);
router.delete("/district/:id", deleteDistrict);
router.get("/districts/all", getDistricts);

export default router;
