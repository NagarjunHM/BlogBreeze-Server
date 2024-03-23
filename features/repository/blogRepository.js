import blogModel from "../Model/blogModel.js";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../Model/userModel.js";
import likeModel from "../Model/likeModel.js";
import { deleteImageFromStorage } from "../../middlewares/fileUploadHandler.js";

// insert new blog
export const insertNewBlog = async (
  title,
  description,
  picture,
  content,
  userId,
  published,
  tag
) => {
  try {
    const newBlog = new blogModel({
      title,
      description,
      picture,
      content,
      user: userId,
      published,
      tag,
    });
    await newBlog.save();
    return { status: 201, message: "blog created successful" };
  } catch (err) {
    throw err;
  }
};

// fetch all blogs
export const fetchAllBlogs = async () => {
  try {
    const result = await blogModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user", "_id name");

    if (!result) {
      throw new customError("200", "no blogs found");
    }

    return { status: 200, message: result };
  } catch (err) {
    throw err;
  }
};

// get blog by id
export const getBlogById = async (blogId) => {
  try {
    const result = await blogModel
      .findById(blogId)
      .sort({ createdAt: -1 })
      .populate("user", "_id name")
      .populate("likes", "user blog");

    if (!result) {
      throw new customError(400, "blog not found");
    }

    return { status: 200, message: result };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// update blog
export const updateBlog = async (
  title,
  content,
  description,
  picture,
  user,
  blogId
) => {
  try {
    let blog = await blogModel.findOne({ _id: blogId, user });

    if (!blog) throw new customError(400, "Blog not found");

    if (picture && blog.picture && picture !== blog.picture) {
      if (blog.picture) {
        await deleteImageFromStorage(blog.picture);
      }
    }

    blog.title = title;
    blog.content = content;
    blog.description = description;
    blog.picture = picture;

    await blog.save();

    return { status: 200, message: "Blog updated successfully" };
  } catch (err) {
    throw err;
  }
};

// delete blog
export const deleteBlog = async (user, blogId) => {
  try {
    const result = await blogModel.findOneAndDelete({ user, _id: blogId });
    if (!result) {
      throw new customError(400, "blog not found");
    }
    if (result.picture) {
      await deleteImageFromStorage(result.picture);
    }

    return { status: 200, message: "blog deleted successfully" };
  } catch (err) {
    throw err;
  }
};

// fetch all blogs of a specific user
export const getBlogByUserId = async (id) => {
  try {
    const user = await userModel.findOne({ _id: id });

    if (!user) {
      throw new customError(400, "user not found ");
    }

    const blog = await blogModel
      .find({ user: user._id })
      .populate("user", "_id name");

    if (!blog) {
      throw new customError(400, "no blogs found");
    }

    return { status: 200, message: blog };
  } catch (err) {
    throw err;
  }
};

// like blog
export const likeBlog = async (userId, blogId) => {
  try {
    const blog = await blogModel.findById(blogId);

    // blog not found
    if (!blog) throw new customError(404, "blog not found");

    // check if the user's like already exists
    if (blog.likes.includes(userId))
      throw new customError(400, "user has already liked the post");

    blog.likes.push(userId);
    await blog.save();

    return { status: 201, message: "blog liked successfully" };
  } catch (err) {
    throw err;
  }
};

// unlike blog
export const unlikeBlog = async (userId, blogId) => {
  try {
    const blog = await blogModel.findById(blogId);

    // blog not found
    if (!blog) throw new customError(404, "blog not found");

    // check if the user has liked
    if (!blog.likes.includes(userId))
      throw new customError(400, "user has not liked the post");

    blog.likes.pull(userId);
    await blog.save();

    return { status: 200, message: "blog unliked successfully" };
  } catch (err) {
    throw err;
  }
};
