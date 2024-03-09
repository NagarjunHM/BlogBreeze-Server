import mongoose from "mongoose";

const followersSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const followersModel = mongoose.model("followers", followersSchema);
export default followersModel;
