# Blog Breeze - Backend 💻

## Overview 🌟

Blog Breeze is a full-stack blogging platform built with Node.js, Express.js, and MongoDB. It includes robust data models for User, Blog, Tag, Like, Comment, Followers, Following, and TagFollowing. This backend service provides RESTful API endpoints for user management, blogging, tagging, and commenting.

## Technologies Used 🛠️

- **Node.js** 🚀
- **Express.js** 🌐
- **MongoDB** 📦

## API Endpoints 🚀

### User System 👤

- **Register User:** `POST /api/users/register` ✍️
- **Login User:** `POST /api/users/login` 🔑 (Requires Authentication)
- **Logout User:** `POST /api/users/logout` 🚪
- **Refresh Token:** `POST /api/users/refreshToken` 🔄
- **User Details:** `POST /api/users/:userId` 👤
- **Follow User:** `POST /api/users/:userId/follow` 👥 (Requires Authentication)
- **Unfollow User:** `DELETE /api/users/:userId/unfollow` ❌ (Requires Authentication)
- **Get Followers of a User:** `GET /api/users/:userId/followers` 👥 (Requires Authentication)
- **Get Users Followed by a User:** `GET /api/users/:userId/following` 👣 (Requires Authentication)
- **Get Tags Followed by a User:** `GET /api/users/:userId/tagsFollowing` 🔖 (Requires Authentication)

### Blog System 📝

- **Create Blog:** `POST /api/blogs` ✍️ (Requires Authentication)
- **Get All Blogs:** `GET /api/blogs` 📚
- **Get Blog by ID:** `GET /api/blogs/:blogId` 📖
- **Update Blog:** `PUT /api/blogs/:blogId` 🛠️ (Requires Authentication)
- **Delete Blog:** `DELETE /api/blogs/:blogId` ❌ (Requires Authentication)
- **Like Blog:** `POST /api/blogs/:blogId/like` ❤️ (Requires Authentication)
- **Unlike Blog:** `DELETE /api/blogs/:blogId/unlike` 💔 (Requires Authentication)
- **Get Blogs by User ID:** `GET /api/blogs/user/:userId` 👤 (Requires Authentication)
- **Get Blogs by Tag ID:** `GET /api/blogs/tag/:tagId` 🔖 (Requires Authentication)
- **Get Blogs by Tags Following:** `GET /api/blogs/following/tags/:userId` 🔖 (Requires Authentication)
- **Get Blogs by Users Following:** `GET /api/blogs/following/users/:userId` 👥 (Requires Authentication)

### Tag System 🔖

- **Create Tag:** `POST /api/tags` ✍️ (Requires Authentication)
- **Get All Tags:** `GET /api/tags` 🏷️
- **Get Tag by ID:** `GET /api/tags/:tagId` 📖
- **Follow Tag:** `POST /api/tags/follow-tag/:tagId` 👤 (Requires Authentication)
- **Unfollow Tag:** `DELETE /api/tags/unfollow-tag/:tagId` ❌ (Requires Authentication)
- **Get Tags Followed by a User:** `GET /api/tags/tag-following/:userId` 🔖 (Requires Authentication)

### Comments System 💬

- **Create Comment:** `POST /api/comments/:blogId` ✍️ (Requires Authentication)
- **Get Comments for a Blog:** `GET /api/comments/:blogId` 💬
- **Update Comment:** `PUT /api/comments/:commentId` 🛠️ (Requires Authentication)
- **Delete Comment:** `DELETE /api/comments/:commentId` ❌ (Requires Authentication)

### Search System 🔍

- **Search:** `GET /api/search/:searchItem` 🔍

### Request 🐛

- If You find any bug then please create issue i would love to solve that
