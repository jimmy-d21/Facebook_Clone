import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  getAllNotifications,
  readAllNotif,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllNotifications);
router.patch("/", protectRoute, readAllNotif);

export default router;
