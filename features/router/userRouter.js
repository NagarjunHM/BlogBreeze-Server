import express from "express";
import { authHandler } from "../../middlewares/authHandler.js";

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
userRouter.post("/refreshToken", refreshTokenCont);

export default userRouter;
