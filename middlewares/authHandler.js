import customError from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const authHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new customError(401, "missing token");
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        throw new customError(403, "invalid token");
      }
      next();
    });
  } catch (err) {
    next(err);
  }
};
