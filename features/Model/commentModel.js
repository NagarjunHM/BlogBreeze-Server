import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
  content: { type: String, required: true },
});
commentSchema.set("timestamps", true);

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
