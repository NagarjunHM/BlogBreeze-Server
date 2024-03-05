import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import cookieParser from "cookie-parser";
import connectDB from "./ConnectDB.js";
import userRouter from "./features/router/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { authHandler } from "./middlewares/authHandler.js";
import blogRouter from "./features/router/blogRouter.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: process.env.URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

app.use(cors({ ...corsOptions, credentials: true }));
app.use(cookieParser());

// routes
app.use("/api/user/", userRouter);
app.use("/api/blog/", blogRouter);

app.get("/", authHandler, (req, res) => {
  res.status(200).json("welcome to BlogBreeze");
});

// error handler middleware
app.use(errorHandler);

app.listen(5000, (err) => {
  if (err) console.log(err);
  connectDB();
  console.log("server is listening at port number 5000");
});
