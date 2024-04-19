import customError from "../../middlewares/errorHandler.js";
import tagModel from "../Model/tagModel.js";
import userModel from "../Model/userModel.js";

// create tag
export const createTag = async (name, description) => {
  try {
    const tag = new tagModel({ name, description });
    await tag.save();

    return { status: 201, message: tag };
  } catch (err) {
    if (err.code === 11000) {
      throw new customError(400, "tag already exists");
    }
    throw err;
  }
};

// get all tags
export const getAllTags = async (featured) => {
  try {
    let query = featured ? { featured: true } : {};
    const tag = await tagModel.find(query);
    return { status: 200, message: tag };
  } catch (err) {
    throw err;
  }
};

// get tag by id
export const getTagbyID = async (tagId) => {
  try {
    const tag = await tagModel
      .findById(tagId)
      .populate("followers", "_id name");

    if (!tag) throw new customError(400, "tag not found");

    return { status: 200, message: tag };
  } catch (err) {
    throw err;
  }
};

// follow tag
export const followTag = async (userId, tagId) => {
  try {
    const user = await userModel.findById(userId);
    const tag = await tagModel.findById(tagId);

    if (!user || !tag) throw new customError(404, "user or tag not found");

    // check if user already follows the tag
    if (user.tagsFollowing.includes(tag._id))
      throw new customError(400, "user already follows the tag");

    user.tagsFollowing.push(tag._id);
    await user.save();

    tag.followers.push(user._id);
    await tag.save();

    return { status: 201, message: "tag followed successfully" };
  } catch (err) {
    throw err;
  }
};

// unfollow tag
export const unfollowTag = async (userId, tagId) => {
  try {
    const user = await userModel.findById(userId);
    const tag = await tagModel.findById(tagId);

    // Check if user and tag exist
    if (!user || !tag) {
      throw new customError(404, "user or tag not found");
    }

    // Check if user follows the tag
    if (!user.tagsFollowing.includes(tagId)) {
      throw new customError(400, "user does not follow the tag");
    }

    // Remove tag from user's followed tags
    user.tagsFollowing = user.tagsFollowing.filter(
      (id) => id.toString() !== tagId.toString()
    );
    await user.save();

    // Remove user from tag's followers
    tag.followers = tag.followers.filter(
      (id) => id.toString() !== userId.toString()
    );
    await tag.save();

    return { status: 200, message: "tag unfollowed successfully" };
  } catch (err) {
    throw err;
  }
};

// get tags followed by a user
export const getTagsFollowed = async (userId) => {
  try {
    const user = await userModel.findById(userId, "tagsFollowing");

    if (!user) throw new customError(400, "user not found");

    return { status: 200, message: user };
  } catch (err) {
    throw err;
  }
};
