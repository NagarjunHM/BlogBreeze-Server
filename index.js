import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./ConnectDB.js";
import userRouter from "./features/router/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import blogRouter from "./features/router/blogRouter.js";
import commentRouter from "./features/router/commentRouter.js";
import followRouter from "./features/router/followRouter.js";
import tagRouter from "./features/router/tagRouter.js";

const app = express();
app.use(cookieParser());

// Middleware for handling CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users/", userRouter);
app.use("/api/blogs/", blogRouter);
app.use("/api/comments/", commentRouter);
app.use("/api/tags/", tagRouter);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(5000, (err) => {
  if (err) console.log(err);
  connectDB();
  console.log("Server is listening at port number 5000");
});
