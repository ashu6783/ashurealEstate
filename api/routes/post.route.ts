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

router.get("/", getPosts);
router.post("/", verifyToken, addPost);
router.get("/:id", getPost);
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
