import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./ConnectDB.js";
import userRouter from "./features/router/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import blogRouter from "./features/router/blogRouter.js";
import commentRouter from "./features/router/commentRouter.js";
import tagRouter from "./features/router/tagRouter.js";
import searchRouter from "./features/router/searchRoute.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
app.use(cookieParser());

// Middleware for handling CORS
const allowedOrigins = [
  "https://blog-breeze-client.vercel.app",
  "http://localhost:8000",
  "http://192.168.0.105:8000/",
];

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Welcome route
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      `Welcome to BlogBreeze server! To know more, you can visit <a href="https://github.com/NagarjunHM/BlogBreeze-Server">BlogBreeze GitHub repository</a>`
    );
});

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users/", userRouter);
app.use("/api/blogs/", blogRouter);
app.use("/api/comments/", commentRouter);
app.use("/api/tags/", tagRouter);
app.use("/api/search/", searchRouter);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(5000, (err) => {
  if (err) console.log(err);
  connectDB();
  console.log("Server is listening at port number 5000");
});
