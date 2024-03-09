import express from "express";
import {
  followUserCont,
  unFollowUserCont,
  getFollowersCont,
  getFollowingCont,
} from "../controller/followController.js";
import { authHandler } from "../../middlewares/authHandler.js";

const followRouter = express.Router();

followRouter.post("/:userId/follow", authHandler, followUserCont);
followRouter.delete("/:userId/unfollow", authHandler, unFollowUserCont);
followRouter.get("/followers/:userId", getFollowersCont);
followRouter.get("/following/:userId", getFollowingCont);

export default followRouter;
