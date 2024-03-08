import express from "express";
import {
  insertNewBlogCont,
  editBlogCont,
  deleteBlogCont,
  fetchBlogCont,
  fetchUserBlogCont,
  fetchAllBlogsCont,
} from "../controller/blogController.js";
import { authHandler } from "../../middlewares/authHandler.js";
import { upload } from "../../middlewares/fileUploadHandler.js";

const blogRouter = express.Router();

blogRouter.post(
  "/newBlog",
  authHandler,
  upload.single("picture"),
  insertNewBlogCont
);
blogRouter.put("/:id", authHandler, upload.single("picture"), editBlogCont);
blogRouter.delete("/:id", authHandler, deleteBlogCont);
blogRouter.get("/detail/:id", fetchBlogCont);
blogRouter.get("/:userId", fetchUserBlogCont);
blogRouter.get("/", fetchAllBlogsCont);
export default blogRouter;
