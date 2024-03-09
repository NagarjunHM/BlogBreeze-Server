import express from "express";

import {
  registerUserCont,
  loginUserCont,
  logoutUserCont,
  refreshTokenCont,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserCont);
userRouter.post("/login", loginUserCont);
userRouter.post("/logout", logoutUserCont);
userRouter.get("/refreshToken", refreshTokenCont);

export default userRouter;
