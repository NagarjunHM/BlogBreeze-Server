import commentModel from "../Model/commentModel.js";
import blogModel from "../Model/blogModel.js";
import customError from "../../middlewares/errorHandler.js";

// create comment
export const createComment = async (userId, blogId, content) => {
  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) throw new customError(400, "blog not found");

    const comment = new commentModel({ user: userId, blog: blogId, content });
    await comment.save();

    blog.comments.push(comment._id);
    await blog.save();

    return { status: 201, message: "comment added" };
  } catch (err) {
    throw err;
  }
};

// get comments
export const getComments = async (blogId) => {
  try {
    const blog = await blogModel.findById(blogId);

    if (!blog) throw new customError(400, "blog not found");

    const comment = await commentModel
      .find({ blog: blogId })
      .populate("user", "_id name");

    return { status: 200, message: comment };
  } catch (err) {
    throw err;
  }
};

// update comment
export const updateComment = async (userId, commentId, content) => {
  try {
    const comment = await commentModel.findOne({
      user: userId,
      _id: commentId,
    });

    if (!comment) throw new customError(400, "comment not found");

    comment.content = content;

    await comment.save();

    return { status: 201, message: "comment updated" };
  } catch (err) {
    throw err;
  }
};

// delete comment
export const deleteComment = async (userId, commentId) => {
  try {
    const comment = await commentModel.findOne({
      user: userId,
      _id: commentId,
    });

    if (!comment) throw new customError(400, "comment not found");

    const blog = await blogModel.findById(comment.blog);

    if (!blog) throw new customError(400, "blog not found");

    await commentModel.findOneAndDelete(comment._id);

    blog.comments.pull(comment._id);
    await blog.save();

    return { status: 200, message: "comment deleted" };
  } catch (err) {
    throw err;
  }
};
