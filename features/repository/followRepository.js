import customError from "../../middlewares/errorHandler.js";

// follow user
export const followUser = async (userId, otherUserId) => {
  try {
    // Check if the user is already following the otherUser
    const isFollowing = await followingModel.findOne({
      user: userId,
      following: otherUserId,
    });

    if (isFollowing)
      throw new customError(400, "you are already following the other user");

    // Check if the user is already a follower of the otherUser
    const isFollower = await followersModel.findOne({
      user: otherUserId,
      following: userId,
    });

    if (isFollower)
      throw new customError(400, "you are already being followed by this user");

    // Update the Following collection
    await followingModel.findOneAndUpdate(
      { user: userId },
      { $addToSet: { following: otherUserId } },
      { upsert: true }
    );

    // Update the Followers collection
    await followersModel.findOneAndUpdate(
      { user: otherUserId },
      { $addToSet: { followers: userId } },
      { upsert: true }
    );

    return { status: 201, message: "user added" };
  } catch (err) {
    throw err;
  }
};

//unfollow user
export const unFollowUser = async (userId, otherUserId) => {
  try {
    // Check if the user is following the otherUser
    const isFollowing = await followingModel.findOne({
      user: userId,
      following: otherUserId,
    });

    if (!isFollowing)
      throw new customError(400, "you are not following the other user");

    // Check if the user is a follower of the otherUser
    const isFollower = await followersModel.findOne({
      user: otherUserId,
      followers: userId,
    });

    if (!isFollower)
      throw new customError(400, "you are not a follower of this user");

    // Remove from the Following collection
    await followingModel.findOneAndUpdate(
      { user: userId },
      { $pull: { following: otherUserId } }
    );

    // Remove from the Followers collection
    await followersModel.findOneAndUpdate(
      { user: otherUserId },
      { $pull: { followers: userId } }
    );

    return { status: 200, message: "user unfollowed successfully" };
  } catch (err) {
    throw err;
  }
};

//get followers of a user
export const getFollowers = async (userId) => {
  try {
    const followers = await followersModel.findOne({ user: userId });

    if (!followers) return { status: 200, message: [] };
    return { status: 200, message: followers };
  } catch (err) {
    throw err;
  }
};

//get users followed by a user
export const getFollowing = async (userId) => {
  try {
    const followers = await followingModel.findOne({ user: userId });

    if (!followers) return { status: 200, message: [] };
    return { status: 200, message: followers };
  } catch (err) {
    throw err;
  }
};
