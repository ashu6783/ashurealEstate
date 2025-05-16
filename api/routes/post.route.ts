import express from "express";
import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost
} from "../controllers/post.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

// GET all posts with filters
router.get("/", getPosts);
// POST new post (requires auth)
router.post("/", verifyToken, addPost);
// GET single post by ID
router.get("/:id", getPost);

// PUT update post (requires auth)
router.put("/:id", verifyToken, updatePost);

// DELETE post (requires auth)
router.delete("/:id", verifyToken, deletePost);

export default router;
