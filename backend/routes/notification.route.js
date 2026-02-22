import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getAllNotifications } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllNotifications);

export default router;
