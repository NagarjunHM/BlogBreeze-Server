import customError from "../../middlewares/errorHandler.js";
import {
  insertNewBlog,
  editBlog,
  deleteBlog,
  fetchBlog,
  fetchUserBlog,
  fetchAllBlogs,
  // fetchAllBlogs,
} from "../repository/blogRepository.js";

// create blog
export const insertNewBlogCont = async (req, res, next) => {
  try {
    const { title, description, content } = req.body;

    console.log(req.file);

    if (!title) throw new customError(400, "blog title is required");
    if (!content) throw new customError(400, "blog content is required");

    const { status, message } = await insertNewBlog(
      title,
      description,
      req.file.path,
      content,
      req.userId
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// edit blog
export const editBlogCont = async (req, res, next) => {
  try {
    const { title, content, description, picture } = req.body;
    const id = req.params.id;

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
      picture,
    };

    const { status, message } = await editBlog(
      updatedBlogData.title,
      updatedBlogData.content,
      updatedBlogData.description,
      updatedBlogData.picture,
      req.userId,
      id
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// deletenblog
export const deleteBlogCont = async (req, res, next) => {
  try {
    const { status, message } = await deleteBlog(req.userId, req.params.id);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// fetch specific blog
export const fetchBlogCont = async (req, res, next) => {
  try {
    const { status, message } = await fetchBlog(req.params.id);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const fetchUserBlogCont = async (req, res, next) => {
  try {
    const email = req.params.email;

    if (!email) throw new customError(400, "email cannot be empty");

    const { status, message } = await fetchUserBlog(email);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const fetchAllBlogsCont = async (req, res, next) => {
  try {
    const { status, message } = await fetchAllBlogs();
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
