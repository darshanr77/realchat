import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Changed from router.get() to router.post() for signup and login
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/check",protectRoute,(req,res) => {res.status(200).json(req.user)});

export default router;