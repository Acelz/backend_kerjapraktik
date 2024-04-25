import express from "express";
import {
  createVillage,
  getVillageById,
  getVillages,
  updateVillage,
  deleteVillage,
} from "../controllers/Village.js";

const router = express.Router();

router.get("/villages", getVillages);
router.get("/village/:id", getVillageById);
router.patch("/village/:id", updateVillage);
router.post("/village", createVillage);
router.delete("/village/:id", deleteVillage);

export default router;
