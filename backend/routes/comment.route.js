import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import {
  commentPost,
  getCommentPost,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:id", protectRoute, commentPost);
router.get("/:id", protectRoute, getCommentPost);

export default router;
