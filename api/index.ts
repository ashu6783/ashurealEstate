import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import verifyRoutes from "./routes/test.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the first proxy (needed when behind Render/Vercel proxy)
app.set("trust proxy", 1);

// Middleware
app.use(
  cors({
    origin: ["https://ashureal-estate.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/verify", verifyRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
