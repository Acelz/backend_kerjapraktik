import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  createUser,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.get("/user/detail/:id", getUserById);
router.patch("/user/:id", updateUser);
router.post("/user", createUser);
export default router;
