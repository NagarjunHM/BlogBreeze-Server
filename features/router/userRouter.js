import express from "express";

import {
  registerUserCont,
  loginUserCont,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserCont);
userRouter.post("/login", loginUserCont);

export default userRouter;
