import express from "express";
import { register, login, logout, verifySession } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken"; // Your existing middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Add a verification endpoint to check if the user's session is valid
router.get("/verify", verifyToken, verifySession);

export default router;