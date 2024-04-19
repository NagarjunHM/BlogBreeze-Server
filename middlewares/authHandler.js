import { checkUserPresent } from "../features/repository/userRepository.js";
import customError from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const authHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new customError(401, "missing token");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        throw new customError(403, "invalid token");
      }
      req.email = decoded.email;
    });

    const user = await checkUserPresent(req.email);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
