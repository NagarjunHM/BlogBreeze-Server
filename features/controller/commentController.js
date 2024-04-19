import customError from "../../middlewares/errorHandler.js";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../repository/commentRepository.js";

// create comment
export const createCommentCont = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const blogId = req.params.blogId;
    const { content } = req.body;

    if (!content) throw new customError(400, "comment cannot be empty");

    const { status, message } = await createComment(userId, blogId, content);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get comments
export const getCommentsCont = async (req, res, next) => {
  try {
    const blogId = req.params.blogId;

    const { status, message } = await getComments(blogId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// update comment
export const updateCommentCont = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const { content } = req.body;

    if (!content) throw new customError(400, "comment can not be empty");

    const { status, message } = await updateComment(userId, commentId, content);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// delete comment
export const deleteCommentCont = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user._id;

    const { status, message } = await deleteComment(userId, commentId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
