import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/all-posts", protectRoute, getAllPosts);

export default router;
