import express from "express";
import { createVehicle } from "../controllers/Vehicle.js";

const router = express.Router();

router.post("/vechiles", createVehicle);

export default router;
