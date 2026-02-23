import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  followUnFollow,
  getSuggestedUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectRoute, followUnFollow);
router.get("/:id", protectRoute, getUserProfile);
router.get("/", protectRoute, getSuggestedUsers);
router.patch("/", protectRoute, updateUserProfile);

export default router;
