import express from "express";
import {
  getUsers,
  getUserById,
  isActivateUser,
  updateUser,
  createAdmin,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.patch("/user/active/:id", isActivateUser);
router.get("/user/detail/:id", getUserById);
router.patch("/user/:id", updateUser);
router.post("/users", createAdmin);
export default router;
