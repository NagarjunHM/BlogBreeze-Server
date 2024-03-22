1. User System:

   - Register User: POST /api/users/register
   - Login User: POST /api/users/login (Requires Authentication)
   - Logout User: POST /api/users/logout
   - Refresh Token : POST /api/users/refreshToken

   * Follow User: POST /api/users/:userId/follow (Requires Authentication)
   * Unfollow User: DELETE /api/users/:userId/unfollow (Requires Authentication)
   * Get Followers of a User: GET /api/users/:userId/followers (Requires Authentication)
   * Get Users Followed by a User: GET /api/users/:userId/following (Requires Authentication)
   * Get Tags Followed by a User: GET /api/users/:userId/tagsFollowing (Requires Authentication)

2. Blog System:

   - Create Blog: POST /api/blogs (Requires Authentication)
   - Get All Blogs: GET /api/blogs
   - Get Blog by ID: GET /api/blogs/:blogId
   - Update Blog: PUT /api/blogs/:blogId (Requires Authentication)
   - Delete Blog: DELETE /api/blogs/:blogId (Requires Authentication)

   * Like Blog: POST /api/blogs/:blogId/like (Requires Authentication)
   * Unlike Blog: DELETE /api/blogs/:blogId/unlike (Requires Authentication)

3. Tag System:
   - Create Tag: POST /api/tags (Requires Authentication)
   - Get All Tags: GET /api/tags
   - Get Tag by ID: GET /api/tags/:tagId
   - Update Tag: PUT /api/tags/:tagId (Requires Authentication)
   - Delete Tag: DELETE /api/tags/:tagId (Requires Authentication)
   - Follow Tag: POST /api/users/:userId/tagsFollowing/:tagId (Requires Authentication)
   - Unfollow Tag: DELETE /api/users/:userId/tagsFollowing/:tagId (Requires Authentication)

---

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
tagsFollowing: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
});

const blogSchema = new mongoose.Schema({
title: { type: String, required: true },
description: String,
picture: String,
content: { type: String, required: true },
published: { type: Boolean, required: true, default: false },
user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
comments: [{
user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
content: String,
}],
}, { timestamps: true });

const tagSchema = new mongoose.Schema({
name: { type: String, required: true, unique: true },
followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const UserModel = mongoose.model("User", userSchema);
const BlogModel = mongoose.model("Blog", blogSchema);
const TagModel = mongoose.model("Tag", tagSchema);

export { UserModel, BlogModel, TagModel };
