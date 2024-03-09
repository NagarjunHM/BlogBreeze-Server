import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const tagModel = mongoose.model(tagSchema);

export default tagModel;
