import express from "express";
import { shouldBeLoggedIn, shouldBeAdmin } from "../controllers/verify.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/should-be-logged-in", verifyToken, shouldBeLoggedIn);
router.get("/should-be-admin", verifyToken, shouldBeAdmin);

export default router;