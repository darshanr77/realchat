import express from "express";
const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Message sent");
});

router.get("/receive", (req, res) => {
  res.send("Message received");
});

export default router;
