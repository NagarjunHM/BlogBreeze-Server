import mongoose from "mongoose";

const followingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: user },
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: user }],
});

const followingModel = mongoose.model("following", followingSchema);
export default followingModel;
