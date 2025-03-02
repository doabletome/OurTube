import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./Connection/mongoConfig.js";
import AuthRoutes from "./Routes/user.js";
import VideoRoutes from "./Routes/video.js";
import CommentRoutes from "./Routes/comment.js";
import dotenv from "dotenv";

//load enviroment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

//  CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your React frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
connectDb();

//  Routes
app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});
