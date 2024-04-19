import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "blog title is required"] },
    description: { type: String },
    picture: { type: String },
    content: { type: String, required: [true, "blog content is required"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    tag: { type: mongoose.Schema.Types.ObjectId, ref: "tag" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
