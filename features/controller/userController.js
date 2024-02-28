import { registerUser, loginUser } from "../repository/userRepository.js";
import customError from "../../middlewares/errorHandler.js";

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

export const loginUserCont = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) throw new customError(400, "email is required");
    if (!password) throw new customError(400, "password is required");

    const { status, message } = await loginUser(email, password);
    res.status(status).json(message);
  } catch (err) {
    next(err);
  }
};
