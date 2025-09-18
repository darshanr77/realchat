import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";


const router = express.Router();

// Don't include /api/auth here, it's already prefixed in server.js
router.get("/signup", signup);

router.get("/login",login);

router.get("/logout", logout);

export default router;
