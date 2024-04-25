import express from "express";
import { getAllCount } from "../controllers/Dashboard.js";

const router = express.Router();

router.get("/dashboard", getAllCount);

export default router;
