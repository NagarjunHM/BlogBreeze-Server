import customError from "../../middlewares/errorHandler.js";
import {
  followUser,
  unFollowUser,
  getFollowing,
  getFollowers,
} from "../repository/followRepository.js";
import userModel from "../Model/userModel.js";

// function to check weather user and other user are valid users or not
const validateUsers = async (userId, other) => {
  // if other user exists
  const otherUser = await userModel.findById(other);
  if (!otherUser) throw new customError(400, "other user not found");

  // if user exists
  const user = await userModel.findById(userId);
  if (!user) throw new customError(400, "user not found");

  if (userId === otherUser._id)
    throw new customError(400, "user cannot follow himself");

  return { userId, otherUserId: otherUser._id };
};

// follow user
export const followUserCont = async (req, res, next) => {
  try {
    const { userId, otherUserId } = await validateUsers(
      req.user._id,
      req.params.userId
    );
    const { status, message } = await followUser(userId, otherUserId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

//unfollow user
export const unFollowUserCont = async (req, res, next) => {
  try {
    const { userId, otherUserId } = await validateUsers(
      req.user._id,
      req.params.userId
    );
    const { status, message } = await unFollowUser(userId, otherUserId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

//get followers of a user
export const getFollowersCont = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) throw new customError(400, "user not found");

    const { status, message } = await getFollowers(user._id);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

//get users followed by a user
export const getFollowingCont = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.userId);

    if (!user) throw new customError(400, "user not found");

    const { status, message } = await getFollowing(user._id);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
