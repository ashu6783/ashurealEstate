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

// Configure CORS with appropriate origins
const allowedOrigins = [
  'https://ashureal-estate.vercel.app', 
  'http://localhost:5173'
];

// Middleware
app.use(
  cors({
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(cookieParser());

// Debug middleware for cookies
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log('Cookies received:', req.cookies);
    next();
  });
}

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
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});