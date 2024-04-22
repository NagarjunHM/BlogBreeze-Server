import {
  registerUser,
  loginUser,
  userDetails,
  followUser,
  unFollowUser,
  getFollowers,
  getFollowing,
  // updateUserDetails,
  getUsers,
} from "../repository/userRepository.js";
import jwt from "jsonwebtoken";
import customError from "../../middlewares/errorHandler.js";
import { generateAccessToken } from "../../jwtTokenGenerate.js";

// registration
export const registerUserCont = async (req, res, next) => {
  try {
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const { name, email, password } = req.body;
    let errors = {};

    // checking for null value
    if (!name || !email || !password) {
      throw new customError(
        400,
        "name, email and password all are required fields"
      );
    }

    // name validation
    if (name.length <= 2) {
      errors.name = "name should be atleast 3 character long";
    }

    // email validation
    if (!emailRegex.test(email)) {
      errors.email = "invalid email";
    }

    // password validation
    if (!passwordRegex.test(password)) {
      errors.password =
        "password should be 8 - 15 character long, containig 1 smallcase letter, 1 uppercase letter with 1 special character and 1 digit ";
    }

    if (Object.keys(errors).length) {
      return res.status(400).json(errors);
    }

    const { status, message } = await registerUser(name, email, password);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// login
export const loginUserCont = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new customError(400, "email is required");
    if (!password) throw new customError(400, "password is required");

    const { status, message, refreshToken } = await loginUser(email, password);

    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        // secure: false,
        // sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(status)
      .json(message);
  } catch (err) {
    next(err);
  }
};

// update user details
// export const updateUserDetailsCont = async (req, res, next) => {
//   try {
//     const { name, about } = req.body;

//     if (!name) throw new customError(400, "name is required");

//     const { status, message } = await updateUserDetails(
//       req.params.userId,
//       name,
//       about,
//       req.file?.path
//     );

//     res.status(status).json(message);
//   } catch (err) {
//     next(err);
//   }
// };

// fetch user details
export const userDetailsCont = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) res.status(400).json("userId cannot be empty");

    const { status, message } = await userDetails(userId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// logout
export const logoutUserCont = async (req, res, next) => {
  try {
    const rToken = req.cookies?.jwt;

    if (!rToken) {
      return res.clearCookie("jwt").status(202).json("user logged out");
    }

    jwt.verify(rToken, process.env.REFRESH_TOKEN, async (err, decode) => {
      if (decode) {
        res.clearCookie("jwt").status(200).json("user logged out");
      } else if (err) {
        res
          .clearCookie("jwt")
          .status(403)
          .json("user logged out - invalid referesh token");
      }
    });
  } catch (err) {
    next(err);
  }
};

// refresh token
export const refreshTokenCont = async (req, res, next) => {
  try {
    const rToken = req.cookies?.jwt;

    if (!rToken) {
      throw new customError(401, "missing refresh token");
    }
    jwt.verify(rToken, process.env.REFRESH_TOKEN, (err, decode) => {
      if (err) {
        throw new customError(403, "invalid refresh token");
      } else if (decode) {
        const accessToken = generateAccessToken(decode.email);
        res.status(200).json(accessToken);
      }
    });
  } catch (err) {
    next(err);
  }
};

// follow user
export const followUserCont = async (req, res, next) => {
  try {
    const { status, message } = await followUser(
      req.user._id,
      req.params.userId
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// unfollow user
export const unfollowUserCont = async (req, res, next) => {
  try {
    const { status, message } = await unFollowUser(
      req.user._id,
      req.params.userId
    );

    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get user's followers
export const getFollowersCont = async (req, res, next) => {
  try {
    const { status, message } = await getFollowers(req.params.userId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get user's following
export const getFollowingCont = async (req, res, next) => {
  try {
    const { status, message } = await getFollowing(req.params.userId);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get all users
export const getUsersCont = async (req, res, next) => {
  try {
    const { featured } = req.query;
    const { status, message } = await getUsers(featured);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};

// get tags followed by user
export const getTagsFollowedCont = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
