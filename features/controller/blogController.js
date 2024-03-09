import customError from "../../middlewares/errorHandler.js";
import {
  insertNewBlog,
  updateBlog,
  deleteBlog,
  getBlogById,
  getBlogByUserId,
  fetchAllBlogs,
  likeBlog,
  unlikeBlog,
} from "../repository/blogRepository.js";

// create blog
export const insertNewBlogCont = async (req, res, next) => {
  try {
    const { title, description, content, published } = req.body;

    console.log(req.body);
    if (!title) throw new customError(400, "blog title is required");
    if (!content) throw new customError(400, "blog content is required");

    console.log(req.file);
    const { status, message } = await insertNewBlog(
      title,
      description,
      req.file?.path,
      content,
      req.user._id,
      published
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get all blogs
export const fetchAllBlogsCont = async (req, res, next) => {
  try {
    const { status, message } = await fetchAllBlogs();
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get blog by id
export const getBlogByIdCont = async (req, res, next) => {
  try {
    const { status, message } = await getBlogById(req.params.blogId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// update blog
export const updateBlogCont = async (req, res, next) => {
  try {
    const { title, content, description } = req.body;
    const id = req.params.blogId;

    // Check if title and content are provided
    if (!title || !content) {
      return res
        .status(400)
        .json({ error: "title and content are mandatory fields." });
    }

    // Create an object to hold non-null and non-undefined values
    const updatedBlogData = {
      title,
      content,
      description,
    };

    const { status, message } = await updateBlog(
      updatedBlogData.title,
      updatedBlogData.content,
      updatedBlogData.description,
      req.file?.path,
      req.user._id,
      id
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// delete blog
export const deleteBlogCont = async (req, res, next) => {
  try {
    const { status, message } = await deleteBlog(req.user._id, req.params.id);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// fetch all blogs of a specific user
export const getBlogByUserIdCont = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { published } = req.query;

    const { status, message } = await getBlogByUserId(userId, published);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// like blog
export const likeBlogCont = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;

    const { status, message } = await likeBlog(userId, blogId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// unlike blog
export const unlikeBlogCont = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id;

    const { status, message } = await unlikeBlog(userId, blogId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
