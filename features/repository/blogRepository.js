import blogModel from "../schema/blogSchema.js";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../schema/userSchema.js";
import { deleteImageFromStorage } from "../../middlewares/fileUploadHandler.js";

// insert new blog
export const insertNewBlog = async (
  title,
  description,
  picture,
  content,
  userId
) => {
  try {
    const newBlog = await blogModel({
      title,
      description,
      picture,
      content,
      user: userId,
    });
    await newBlog.save();
    return { status: 201, message: "blog created successful" };
  } catch (err) {
    throw err;
  }
};

// edit your blog
export const editBlog = async (
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

    // Update the properties individually
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

// fetch specific post
export const fetchBlog = async (blogId) => {
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

// fetch all blogs of a specific user
export const fetchUserBlog = async (email) => {
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new customError(400, "user not found ");
    }

    const blog = await blogModel.find({ user: user._id });

    if (!blog) {
      throw new customError(400, "no blogs found");
    }

    return { status: 200, message: blog };
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
