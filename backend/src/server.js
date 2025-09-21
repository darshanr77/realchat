import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";

const __dirname = path.resolve();



const app = express();
const PORT = ENV.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

//  Mount API routes first
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//  Serve frontend in production (only for non-API routes)
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      // let API handle it, don't send frontend for /api requests
      return next();
    }
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT,()=>{
  console.log("server is running on port:",PORT);
  connectDB();
});
