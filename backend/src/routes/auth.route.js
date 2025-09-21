import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// ✅ Changed from router.get() to router.post() for signup and login
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;