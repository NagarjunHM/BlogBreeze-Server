import bcrypt from "bcrypt";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../Model/userModel.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../jwtTokenGenerate.js";
import { deleteImageFromStorage } from "../../middlewares/fileUploadHandler.js";

// register new user
export const registerUser = async (name, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const lowerEmail = email.toLowerCase();
    const newUser = await userModel({
      name,
      email: lowerEmail,
      password: hash,
    });

    await newUser.save();

    return { status: 201, message: "user created" };
  } catch (err) {
    if (err.code === 11000) {
      throw new customError(400, "email id already exists");
    }
    throw err;
  }
};

// login user
export const loginUser = async (email, password) => {
  try {
    const lowerEmail = email.toLowerCase();
    const validUser = await userModel.findOne({ email: lowerEmail });

    if (!validUser) {
      throw new customError(400, "user not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, validUser.password);

    if (!isPasswordMatch) {
      throw new customError(401, "password does not match");
    }

    // generating access and refresh token
    const accessToken = generateAccessToken(validUser.email);
    const refreshToken = generateRefreshToken(validUser.email);

    return {
      status: 200,
      message: {
        token: accessToken,
        email: validUser.email,
        id: validUser._id,
        name: validUser.name,
        profilePicture: validUser.profilePicture,
      },
      refreshToken,
    };
  } catch (err) {
    throw err;
  }
};

// update user details
export const updateUserDetails = async (
  userId,
  name,
  about,
  profilePicture
) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) throw new customError(404, "user not found");

    if (
      profilePicture &&
      user.profilePicture &&
      profilePicture !== user.profilePicture
    ) {
      if (user.profilePicture) {
        await deleteImageFromStorage(user.profilePicture);
      }
    }

    user.name = name;
    user.about = about;
    user.profilePicture = profilePicture;

    await user.save();

    return { status: 201, message: "user details updated" };
  } catch (err) {
    throw err;
  }
};

// fetch user detalis
export const userDetails = async (userId) => {
  try {
    const response = await userModel
      .findById(userId, "-password")
      .populate("following", "_id")
      .populate("tagsFollowing", "_id name");

    if (!response) return { status: 400, message: "user not found" };

    return { status: 200, message: response };
  } catch (err) {
    throw err;
  }
};

// function to check user present or not
export const checkUserPresent = async (email) => {
  try {
    const validEmail = await userModel.findOne({ email });

    if (!validEmail) {
      throw new customError(400, "user not found ");
    }
    return validEmail;
  } catch (err) {
    throw err;
  }
};

// follow user
export const followUser = async (userId, otherUserId) => {
  try {
    if (userId === otherUserId)
      throw new customError(400, "user cannot follow himself");

    const user = await userModel.findById(userId);
    const otherUser = await userModel.findById(otherUserId);

    if (!user || !otherUser) {
      throw new customError(404, "User not found");
    }

    if (user.following.includes(otherUser._id))
      throw new customError(400, "you are already following the user");

    if (otherUser.followers.includes(user._id))
      throw new customError(400, "The other user is already followed by you");

    user.following.push(otherUser._id);
    await user.save();

    otherUser.followers.push(user._id);
    await otherUser.save();

    return { status: 201, message: "user followed successfully" };
  } catch (err) {
    throw err;
  }
};

// unfollow user
export const unFollowUser = async (userId, otherUserId) => {
  try {
    if (userId === otherUserId)
      throw new customError(400, "user cannot unfollow himself");

    const user = await userModel.findById(userId);
    const otherUser = await userModel.findById(otherUserId);

    if (!user || !otherUser) {
      throw new customError(404, "User not found");
    }

    if (!user.following.includes(otherUser._id))
      throw new customError(400, "You are not following the user");

    if (!otherUser.followers.includes(user._id))
      throw new customError(400, "The other user is not followed by you");

    user.following = user.following.filter(
      (id) => id.toString() !== otherUser._id.toString()
    );
    await user.save();

    otherUser.followers = otherUser.followers.filter(
      (id) => id.toString() !== user._id.toString()
    );
    await otherUser.save();

    return { status: 200, message: "user unfollowed successfully" };
  } catch (err) {
    throw err;
  }
};

// get user's followers
export const getFollowers = async (userId) => {
  try {
    const followers = await userModel
      .findById(userId, "followers")
      .populate("followers", "_id name description");

    if (!followers) return { status: 400, message: "user not found" };

    return { status: 200, message: followers };
  } catch (err) {
    throw err;
  }
};

// get user's following
export const getFollowing = async (userId) => {
  try {
    const following = await userModel
      .findById(userId, "following")
      .populate("following", "_id name description");

    if (!following) return { status: 400, message: "user not found" };

    return { status: 200, message: following };
  } catch (err) {
    throw err;
  }
};

// Get all users
export const getUsers = async (featured) => {
  try {
    let query = featured ? { featured: true } : {};

    const users = await userModel.find(query, "_id name");

    if (users.length === 0) {
      return { status: 200, message: "no users" };
    }

    return { status: 200, message: users };
  } catch (err) {
    throw err;
  }
};

// get tags followed by user
export const getTagsFollowed = async () => {
  try {
  } catch (err) {
    throw err;
  }
};
