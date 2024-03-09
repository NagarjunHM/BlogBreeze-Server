import customError from "../../middlewares/errorHandler.js";
import tagFollowingModel from "../Model/tagFollowingModel.js";
import tagModel from "../Model/tagModel.js";

// create tag
export const createTag = async (name) => {
  try {
    const tag = new tagModel({ name });
    await tag.save();

    return { status: 201, message: "tag created" };
  } catch (err) {
    throw err;
  }
};

// get all tags
export const getAllTags = async () => {
  try {
    const tag = await tagModel.find();

    return { status: 200, message: tag };
  } catch (err) {
    throw err;
  }
};

// get tag by id
export const getTagbyID = async (tagId) => {
  try {
    const tag = await tagModel.findById(tagId);

    if (!tag) throw new customError(400, "tag not found");

    return { status: 200, message: tag };
  } catch (err) {
    throw err;
  }
};

// follow tag
export const followTag = async (userId, tagId) => {
  try {
    const isFollowing = await tagFollowingModel.findOne({
      user: userId,
      tags: tagId,
    });

    if (isFollowing)
      throw new customError(400, "user is already following the tag");

    // update tagFollowingModel
    await tagFollowingModel.findOneAndUpdate(
      { user: userId },
      { $addToSet: { tags: tagId } },
      { upsert: true }
    );

    // update tagModel
    await tagModel.findOneAndUpdate(
      { _id: tagId },
      { $addToSet: { followers: userId } }
    );

    return { status: 201, message: "user followed the tag successfully" };
  } catch (err) {
    throw err;
  }
};

// unfollow tag
export const unfollowTag = async () => {
  try {
    // Check if the user is following the tag
    const isFollowing = await tagFollowingModel.findOne({
      user: userId,
      tags: tagId,
    });

    if (!isFollowing) {
      throw new customError(400, "User is not following the tag");
    }

    // Update TagFollowing collection (remove tag)
    await tagFollowingModel.findOneAndUpdate(
      { user: userId },
      { $pull: { tags: tagId } }
    );

    // Update Tag model (remove follower)
    await tagModel.findOneAndUpdate(
      { _id: tagId },
      { $pull: { followers: userId } }
    );

    return { status: 200, message: "User unfollowed the tag successfully." };
  } catch (err) {
    throw err;
  }
};

// get tags followed by a user
export const getTagsFollowed = async (userId) => {
  try {
    const tags = await tagFollowingModel.findOne({ user: userId });
    return { status: 200, message: tags };
  } catch (err) {
    throw err;
  }
};
