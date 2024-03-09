import mongoose from "mongoose";

const tagFollowingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "tag" }],
});

const tagFollowingModel = mongoose.model("TagFollowing", tagFollowingSchema);

export default tagFollowingModel;
