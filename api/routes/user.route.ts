import express from "express";
import { getUsers, getUser, updateUser, deleteUser, savePost, profilePosts } from "../controllers/user.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/profilePosts", verifyToken, profilePosts);
router.get("/:id", verifyToken, getUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);
router.post("/save", verifyToken, savePost);


export default router;