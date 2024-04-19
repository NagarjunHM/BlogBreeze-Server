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
  getBlogsByTagId,
  getBlogsByTagsFollowing,
  getBlogsByFollowing,
} from "../repository/blogRepository.js";

// create blog
export const insertNewBlogCont = async (req, res, next) => {
  try {
    const { title, description, content, tag } = req.body;

    if (!title) throw new customError(400, "blog title is required");
    if (!content) throw new customError(400, "blog content is required");

    const { status, message } = await insertNewBlog(
      title,
      description,
      req.file?.path,
      content,
      req.user._id,
      tag?.value
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

// get blogs by tagId
export const getBlogsByTagIdCont = async (req, res, next) => {
  try {
    const { status, message } = await getBlogsByTagId(req.params.tagId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// update blog
export const updateBlogCont = async (req, res, next) => {
  try {
    const { title, description, content, tag } = req.body;
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
      tag: tag?.value,
    };

    if (req.body?.picture) {
      updatedBlogData.picture = req.body.picture;
    } else if (req.file?.path) {
      updatedBlogData.picture = req.file?.path;
    }

    const { status, message } = await updateBlog(
      updatedBlogData.title,
      updatedBlogData.content,
      updatedBlogData.description,
      updatedBlogData.picture,
      updatedBlogData.tag,
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
    const { status, message } = await deleteBlog(
      req.user._id,
      req.params.userId
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// fetch all blogs of a specific user
export const getBlogByUserIdCont = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { status, message } = await getBlogByUserId(userId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const getBlogsByTagsFollowingCont = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { status, message } = await getBlogsByTagsFollowing(userId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const getBlogsByFollowingCont = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { status, message } = await getBlogsByFollowing(userId);

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
