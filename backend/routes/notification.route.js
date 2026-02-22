import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  deleteNotif,
  getAllNotifications,
  readAllNotif,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getAllNotifications);
router.patch("/", protectRoute, readAllNotif);
router.delete("/:id", protectRoute, deleteNotif);

export default router;
