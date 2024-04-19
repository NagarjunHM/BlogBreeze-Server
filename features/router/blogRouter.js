import express from "express";
import {
  insertNewBlogCont,
  updateBlogCont,
  deleteBlogCont,
  getBlogByIdCont,
  getBlogByUserIdCont,
  fetchAllBlogsCont,
  likeBlogCont,
  unlikeBlogCont,
  getBlogsByTagIdCont,
  getBlogsByTagsFollowingCont,
  getBlogsByFollowingCont,
} from "../controller/blogController.js";
import { authHandler } from "../../middlewares/authHandler.js";
import { upload } from "../../middlewares/fileUploadHandler.js";

const blogRouter = express.Router();

blogRouter.post("/", authHandler, upload.single("picture"), insertNewBlogCont);
blogRouter.get("/", fetchAllBlogsCont);
blogRouter.get("/:blogId", getBlogByIdCont);
blogRouter.put(
  "/:blogId",
  authHandler,
  upload.single("picture"),
  updateBlogCont
);
blogRouter.delete("/:userId", authHandler, deleteBlogCont);
blogRouter.get("/user/:userId", getBlogByUserIdCont);
blogRouter.get("/tag/:tagId", getBlogsByTagIdCont);
blogRouter.get("/following/tags/:userId", getBlogsByTagsFollowingCont);
blogRouter.get("/following/users/:userId", getBlogsByFollowingCont);
blogRouter.post("/:blogId/like", authHandler, likeBlogCont);
blogRouter.delete("/:blogId/unlike", authHandler, unlikeBlogCont);

export default blogRouter;
