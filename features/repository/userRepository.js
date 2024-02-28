import bcrypt from "bcrypt";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../schema/userSchema.js";

// register new user
export const registerUser = async (name, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel({ name, email, password: hash });
    await newUser.save();

    return { status: 201, message: "user created" };
  } catch (err) {
    if (err.code === 11000) {
      throw new customError(400, "email id already exists");
    }
    throw err;
  }
};

// login user
export const loginUser = async (email, password) => {
  try {
    const validUser = await userModel.findOne({ email });

    if (!validUser) {
      throw new customError(400, "user not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, validUser.password);

    if (!isPasswordMatch) {
      throw new customError(401, "password does not match");
    }
    return { status: 200, message: "login successful" };
  } catch (err) {
    throw err;
  }
};
