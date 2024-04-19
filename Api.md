## User Schema (userModel.js)

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name should be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: {
      validator: (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email),
      message: "Invalid email",
    },
  },
  password: { type: String, required: [true, "Password is required"] },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
```

## Blog Schema (blogModel.js)

```javascript
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Blog title is required"] },
  description: String,
  picture: String,
  content: { type: String, required: [true, "Blog content is required"] },
  published: { type: Boolean, required: true, default: false },
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

blogSchema.set("timestamps", true);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
```

## Tag Schema (tagModel.js)

```javascript
import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const tagModel = mongoose.model("tag", tagSchema);

export default tagModel;
```

## Like Schema (likeModel.js)

```javascript
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
});

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;
```

## Comment Schema (commentModel.js)

```javascript
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
  content: { type: String, required: true },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
```

## Followers Schema (followersModel.js)

```javascript
import mongoose from "mongoose";

const followersSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Followers = mongoose.model("Followers", followersSchema);

export default Followers;
```

## Following Schema (followingModel.js)

```javascript
import mongoose from "mongoose";

const followingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const Following = mongoose.model("Following", followingSchema);

export default Following;
```

## TagFollowing Schema (tagFollowingModel.js)

```javascript
import mongoose from "mongoose";

const tagFollowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
});

const TagFollowing = mongoose.model("TagFollowing", tagFollowingSchema);

export default TagFollowing;
```

---

# API Endpoints

1. **User System:**

   - [x] Register User: `POST /api/users/register`

   - [x] Login User: `POST /api/users/login` (Requires Authentication)

   - [x] Logout User: `POST /api/users/logout`

   - [x] Refresh Token: `GEt /api/users/refreshToken`

2. **Blog System:**

   - [x] Create Blog: `POST /api/blogs` (Requires Authentication)

   - [x] Get All Blogs: `GET /api/blogs`

   - [x] Get Blog by ID: `GET /api/blogs/:blogId`

   - [x] Get Blog by UserID: `GET /api/blogs/user/:UserId`

   - [x] Update Blog: `PUT /api/blogs/:blogId` (Requires Authentication)

   - [x] Delete Blog: `DELETE /api/blogs/:blogId` (Requires Authentication)

   - [x] Like Blog: `POST /api/blogs/:blogId/like` (Requires Authentication)

   - [x] Unlike Blog: `DELETE /api/blogs/:blogId/unlike` (Requires Authentication)

3. **Tag System:**

   - [x] Create Tag: `POST /api/tags` (Requires Authentication)

   - [x] Get All Tags: `GET /api/tags`

   - [x] Get Tag by ID: `GET /api/tags/:tagId`

   - [ ] Update Tag: `PUT /api/tags/:tagId` (Requires Authentication) x

   - [ ] Delete Tag: `DELETE /api/tags/:tagId` (Requires Authentication) x

   - [x] Follow Tag: `POST /api/tags/:userId/follow/:tagId` (Requires Authentication)

   - [x] Unfollow Tag: `DELETE /api/tags/:userId/unfollow/:tagId` (Requires Authentication)

   - [x] Get Tags Followed by a User: `GET /api/tags/tag-following/:userId`

4. **Comments System:**

   - [x] Create Comment: `POST /api/comments/:blogId` (Requires Authentication)

   - [x] Get Comments for a Blog: `GET /api/comments/:blogId`

   - [x] Update Comment: `PUT /api/comments/:commentId` (Requires Authentication)

   - [x] Delete Comment: `DELETE /api/comments/:commentId` (Requires Authentication)

5. **Follow System:**

   - [x] Follow User: `POST /api/users/:userId/follow` (Requires Authentication)

   - [x] Unfollow User: `DELETE /api/users/:userId/unfollow` (Requires Authentication)

   - [x] Get Followers of a User: `GET /api/followers/:userId`

   - [x] Get Users Followed by a User: `GET /api/following/:userId`
