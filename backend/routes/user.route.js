import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { followUnFollow } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/follow/:id", protectRoute, followUnFollow);

export default router;
