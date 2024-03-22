import express from "express";
import { authHandler } from "../../middlewares/authHandler.js";

import {
  registerUserCont,
  loginUserCont,
  logoutUserCont,
  refreshTokenCont,
  userDetailsCont,
  followUserCont,
  unfollowUserCont,
  getFollowersCont,
  getFollowingCont,
  getTagsFollowedCont,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserCont);
userRouter.post("/login", loginUserCont);
userRouter.post("/logout", logoutUserCont);
userRouter.get("/refreshToken", refreshTokenCont);
userRouter.get("/:userId", userDetailsCont);
userRouter.post("/:userId/follow", authHandler, followUserCont);
userRouter.delete("/:userId/unfollow", authHandler, unfollowUserCont);
userRouter.get("/:userId/followers", getFollowersCont);
userRouter.get("/:userId/following", getFollowingCont);
userRouter.get("/:userId/tagsFollowing", getTagsFollowedCont);

export default userRouter;
