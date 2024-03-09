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
  published
) => {
  try {
    const newBlog = new blogModel({
      title,
      description,
      picture,
      content,
      user: userId,
      published,
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
    const result = await blogModel.find();

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
    const result = await blogModel.findById(blogId);

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

    if (blog.picture) {
      await deleteImageFromStorage(blog.picture);
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
export const getBlogByUserId = async (id, published) => {
  try {
    const user = await userModel.findOne({ id });

    if (!user) {
      throw new customError(400, "user not found ");
    }

    const blogParams = { user: user._id };

    if (published !== undefined) {
      blogParams.published = published;
    }

    const blog = await blogModel.find(blogParams);

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
    if (!blog) throw new customError(400, "blog not found");

    // check if the user's like already exists
    const likeExist = await likeModel.findOne({ user: userId, blog: blogId });

    if (likeExist)
      throw new customError(400, "user has already liked the post");

    const newLike = new likeModel({ user: userId, blog: blogId });
    await newLike.save();

    blog.likes.push(newLike._id);
    await blog.save();

    return { status: 201, message: newLike };
  } catch (err) {
    throw err;
  }
};

// unlike blog
export const unlikeBlog = async (userId, blogId) => {
  try {
    const blog = await blogModel.findById(blogId);

    // blog not found
    if (!blog) throw new customError(400, "blog not found");

    // check if the user has liked
    const likeExist = await likeModel.findOne({ user: userId, blog: blogId });

    if (!likeExist) throw new customError(400, "user has not liked the blog");

    await likeModel.findOneAndDelete(likeExist._id);

    blog.likes.pull(likeExist._id);
    await blog.save();

    return { status: 200, message: "blog unliked" };
  } catch (err) {
    throw err;
  }
};
