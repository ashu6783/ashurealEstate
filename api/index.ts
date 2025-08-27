import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db";
import authRoutes from "./routes/auth.route";
import postRoutes from "./routes/post.route";
import userRoutes from "./routes/user.route";
import verifyRoutes from "./routes/test.route";
import paymentroutes from "./routes/payment.route";


const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

const allowedOrigins = [
  'https://ashureal-estate.vercel.app', 
  'http://localhost:5173'
];

app.use(
  cors({
    origin: function(origin, callback) {
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



app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/payment", paymentroutes);


app.get("/", (req, res) => {
  res.send("API is running");
});


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});