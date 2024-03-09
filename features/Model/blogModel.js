import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "blog title is required"] },
  description: { type: String },
  picture: { type: String },
  content: { type: String, required: [true, "blog content is required"] },
  published: { type: Boolean, required: true, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

blogSchema.set("timestamps", true);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
