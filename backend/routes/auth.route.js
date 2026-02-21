import express from "express";
import {
  getAuthUser,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getAuthUser);

export default router;
