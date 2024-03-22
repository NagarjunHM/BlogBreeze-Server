import mongoose from "mongoose";

// email validator
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// defining user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minlength: [3, "name should be atleast 3 character long"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    validate: { validator: validateEmail, message: "invalid email" },
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  bio: {
    type: String,
  },
  about: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
