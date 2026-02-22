import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { commentPost } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id", protectRoute, commentPost);

export default router;
