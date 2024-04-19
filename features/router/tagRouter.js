import express from "express";
import {
  createTagCont,
  getAllTagsCont,
  getTagsFollowedCont,
  followTagCont,
  unfollowTagCont,
  getTagbyIDCont,
} from "../controller/tagController.js";
import { authHandler } from "../../middlewares/authHandler.js";

const tagRouter = express.Router();

tagRouter.post("/", authHandler, createTagCont);
tagRouter.get("/", getAllTagsCont);
tagRouter.get("/:tagId", getTagbyIDCont);
tagRouter.post("/follow-tag/:tagId", authHandler, followTagCont);
tagRouter.delete("/unfollow-tag/:tagId", authHandler, unfollowTagCont);
tagRouter.get("/tag-following/:userId", getTagsFollowedCont);

export default tagRouter;
