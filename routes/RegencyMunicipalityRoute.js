import express from "express";
import {
  createCodeRegencyMunicipality,
  getcodeRegencyMunicipality,
  updateCodeRegencyMunicipality,
  deleteCodeRegencyMunicipality,
  getCodeRegencyMunicipalityById,
  getAllRegencyMunicipality,
} from "../controllers/RegencyMunicipality.js";

const router = express.Router();

router.get("/regency-municipalities/all", getAllRegencyMunicipality);
router.get("/regency-municipalities", getcodeRegencyMunicipality);
router.post("/regency-municipalities", createCodeRegencyMunicipality);
router.patch("/regency-municipalities/:id", updateCodeRegencyMunicipality);
router.delete("/regency-municipalities/:id", deleteCodeRegencyMunicipality);
router.get("/regency-municipalities/:id", getCodeRegencyMunicipalityById);

export default router;
