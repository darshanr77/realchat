import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();

// Middleware to parse JSON
app.use(express.json());

// ===== API Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ===== Serve frontend in production =====
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      // Let API routes handle their own errors
      return next();
    }
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  // Development mode → prevent 404 on root
  app.get("/", (req, res) => {
    res.send("🚀 API is running (development mode)");
  });
}

// ===== Start Server =====
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on port: ${PORT}`);
  await connectDB();
});
