import express from "express";
import {
  createCommentCont,
  getCommentsCont,
  updateCommentCont,
  deleteCommentCont,
} from "../controller/commentController.js";
import { authHandler } from "../../middlewares/authHandler.js";

const commentRouter = express.Router();

commentRouter.post("/:blogId", authHandler, createCommentCont);
commentRouter.get("/:blogId", getCommentsCont);
commentRouter.put("/:commentId", authHandler, updateCommentCont);
commentRouter.delete("/:commentId", authHandler, deleteCommentCont);

export default commentRouter;
