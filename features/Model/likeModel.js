import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "blog" },
});

const likeModel = mongoose.model("like", likeSchema);

export default likeModel;
