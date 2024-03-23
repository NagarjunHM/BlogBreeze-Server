import customError from "../../middlewares/errorHandler.js";
import {
  createTag,
  getAllTags,
  getTagbyID,
  followTag,
  unfollowTag,
  getTagsFollowed,
} from "../repository/tagRepository.js";

// create tag
export const createTagCont = async (req, res, next) => {
  try {
    const name = req.body.name;

    if (!name) throw new customError(400, "tag name cannot be empty");

    const { status, message } = await createTag(name);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get all tags
export const getAllTagsCont = async (req, res, next) => {
  try {
    const { status, message } = await getAllTags();
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get tag by id
export const getTagbyIDCont = async (req, res, next) => {
  try {
    const tagId = req.params.tagId;

    const { status, message } = await getTagbyID(tagId);

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// follow tag
export const followTagCont = async (req, res, next) => {
  try {
    const { status, message } = await followTag(req.user._id, req.params.tagId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const unfollowTagCont = async (req, res, next) => {
  try {
    const { status, message } = await unfollowTag(
      req.user._id,
      req.params.tagId
    );
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

export const getTagsFollowedCont = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const { status, message } = await getTagsFollowed(userId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
