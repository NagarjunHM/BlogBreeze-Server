import bcrypt from "bcrypt";
import customError from "../../middlewares/errorHandler.js";
import userModel from "../schema/userSchema.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../jwtTokenGenerate.js";

// function to generate unique identifier
const generateUniqueIdentifier = (name) => {
  const randomString = Math.random().toString(36).substring(2, 8);

  const uniqueIdentifier = `${name}_${randomString}`;

  return uniqueIdentifier;
};

// register new user
export const registerUser = async (name, email, password) => {
  try {
    const hash = await bcrypt.hash(password, 10);
    const lowerEmail = email.toLowerCase();
    const id = generateUniqueIdentifier(name);
    const newUser = await userModel({
      id,
      name,
      email: lowerEmail,
      password: hash,
    });

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
    const lowerEmail = email.toLowerCase();
    const validUser = await userModel.findOne({ email: lowerEmail });

    if (!validUser) {
      throw new customError(400, "user not found");
    }

    const isPasswordMatch = await bcrypt.compare(password, validUser.password);

    if (!isPasswordMatch) {
      throw new customError(401, "password does not match");
    }

    // generating access and refresh token
    const accessToken = generateAccessToken(validUser.email);
    const refreshToken = generateRefreshToken(validUser.email);

    return {
      status: 200,
      message: { token: accessToken, email: validUser.email, id: validUser.id },
      refreshToken,
    };
  } catch (err) {
    throw err;
  }
};

// function to check user present or not
export const checkUserPresent = async (email) => {
  try {
    const validEmail = await userModel.findOne({ email });

    if (!validEmail) {
      throw new customError(400, "user not found ");
    }
    return validEmail;
  } catch (err) {
    throw err;
  }
};
