import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const tagModel = mongoose.model("tag", tagSchema);

export default tagModel;
