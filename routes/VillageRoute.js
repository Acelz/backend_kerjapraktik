import express from "express";
import {
  createVillage,
  getVillageById,
  getVillages,
  updateVillage,
} from "../controllers/Village.js";

const router = express.Router();

router.get("/villages", getVillages);
router.get("/villages/:id", getVillageById);
router.patch("/villages/:d", updateVillage);
router.post("/villages", createVillage);

export default router;
