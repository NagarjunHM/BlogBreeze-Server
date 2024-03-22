import jwt from "jsonwebtoken";
// access token
export const generateAccessToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, {
      expiresIn: "10m",
    });

    return token;
  } catch (err) {}
};

// refresh token
export const generateRefreshToken = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    return token;
  } catch (err) {}
};
