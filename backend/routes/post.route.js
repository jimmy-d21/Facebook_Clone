import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  likeUnLikePost,
} from "../controllers/post.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.get("/all-posts", protectRoute, getAllPosts);
router.patch("/:id", protectRoute, likeUnLikePost);

export default router;
