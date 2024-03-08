import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, "blog title is required"] },
  description: { type: String },
  picture: { type: String },
  content: { type: String, required: [true, "blog content is required"] },
  published: { type: Boolean, required: true, default: false },
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

blogSchema.set("timestamps", true);

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
