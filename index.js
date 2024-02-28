import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./ConnectDB.js";
import userRouter from "./features/router/userRouter.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// routes
app.use("/api/user/", userRouter);

// error handler middleware
app.use(errorHandler);

app.listen(5000, (err) => {
  if (err) console.log(err);
  connectDB();
  console.log("server is listening at port number 5000");
});
