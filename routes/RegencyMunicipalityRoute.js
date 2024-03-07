import express from "express";
import {
  createCodeRegencyMunicipality,
  getcodeRegencyMunicipality,
  updateCodeRegencyMunicipality,
} from "../controllers/RegencyMunicipality.js";

const router = express.Router();

router.get("/regency-municipalities", getcodeRegencyMunicipality);
router.post("/regency-municipalities", createCodeRegencyMunicipality);
router.patch("/regency-municipalities/:id", updateCodeRegencyMunicipality);

export default router;
