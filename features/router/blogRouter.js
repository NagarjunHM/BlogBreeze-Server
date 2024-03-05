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
import { upload } from "../../middlewares/fileUploadHnadler.js";

const blogRouter = express.Router();

blogRouter.post(
  "/newPost",
  authHandler,
  upload.single("picture"),
  insertNewBlogCont
);
blogRouter.put("/:id", authHandler, editBlogCont);
blogRouter.delete("/:id", authHandler, deleteBlogCont);
blogRouter.get("/detail/:id", fetchBlogCont);
blogRouter.get("/:email", fetchUserBlogCont);
blogRouter.get("/", fetchAllBlogsCont);
export default blogRouter;
