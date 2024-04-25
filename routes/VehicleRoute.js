import express from "express";
import { createVehicle, getAllVehicles } from "../controllers/Vehicle.js";

const router = express.Router();

router.post("/vehicles", createVehicle);
router.get("/vehicles", getAllVehicles);

export default router;
