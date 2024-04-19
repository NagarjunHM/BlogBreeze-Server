import blogModel from "../Model/blogModel.js";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../Model/userModel.js";
import tagModel from "../Model/tagModel.js";
import { deleteImageFromStorage } from "../../middlewares/fileUploadHandler.js";

// insert new blog
export const insertNewBlog = async (
  title,
  description,
  picture,
  content,
  userId,
  tag
) => {
  try {
    const newBlog = new blogModel({
      title,
      description,
      picture,
      content,
      user: userId,
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
      .populate("user", "_id name")
      .populate("tag", "_id name");

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
      .populate("likes", "user blog")
      .populate("tag", "_id name");

    if (!result) {
      throw new customError(400, "blog not found");
    }

    return { status: 200, message: result };
  } catch (err) {
    throw err;
  }
};

// update blog
export const updateBlog = async (
  title,
  content,
  description,
  picture,
  tag,
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
    blog.tag = tag;

    await blog.save();

    return { status: 201, message: "Blog updated successfully" };
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
      .sort({ createdAt: -1 })
      .populate("user", "_id name")
      .populate("tag", "_id name");

    if (!blog) {
      throw new customError(200, "no blogs found");
    }

    return { status: 200, message: blog };
  } catch (err) {
    throw err;
  }
};

// fetch all blogs based on tag id
export const getBlogsByTagId = async (tagId) => {
  try {
    const tag = await tagModel
      .findOne({ _id: tagId })
      .populate("followers", "_id name");

    if (!tag) {
      throw new customError(404, "no tag found");
    }

    const blog = await blogModel
      .find({ tag: tagId })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "_id name",
      })
      .populate({
        path: "tag",
        select: "_id name",
      });

    if (!blog) {
      throw new customError(404, "no blogs found");
    }

    return { status: 200, message: { tag: tag, blog: blog } };
  } catch (err) {
    throw err;
  }
};

//  userId is the ID of the user whose tagsFollowing you want to fetch
export const getBlogsByTagsFollowing = async (userId) => {
  try {
    // Find the user by userId and populate the tagsFollowing field
    const user = await userModel.findById(userId).populate("tagsFollowing");

    if (!user) {
      throw new Error("User not found");
    }

    // Extract tag IDs from the user's tagsFollowing array
    const tagIds = user.tagsFollowing.map((tag) => tag._id);

    // Find blogs where the tags array contains any of the tag IDs
    const blogs = await blogModel
      .find({ tag: { $in: tagIds } })
      .populate("user")
      .populate("tag");

    return { status: 200, message: blogs };
  } catch (error) {
    throw error;
  }
};

export const getBlogsByFollowing = async (userId) => {
  try {
    const user = await userModel.findById(userId).populate("following");
    if (!user) {
      throw new Error("User not found");
    }
    // Extract user IDs from the following array
    const followingIds = user.following.map((user) => user._id);

    // Find blogs where the user ID matches the author ID
    const blogs = await blogModel
      .find({ user: { $in: followingIds } })
      .populate("user")
      .populate("tag");

    return { status: 200, message: blogs };
  } catch (error) {
    throw error;
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
