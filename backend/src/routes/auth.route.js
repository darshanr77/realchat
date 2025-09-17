import express from "express";
const router = express.Router();

// Don't include /api/auth here, it's already prefixed in server.js
router.get("/signup", (req, res) => {
  res.send("Signup endpoint page");
});

router.get("/login", (req, res) => {
  res.send("Login endpoint page");
});

router.get("/logout", (req, res) => {
  res.send("Logout endpoint page");
});

export default router;
