import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";
import checkUserExists from "../helper/checkUserExists.js";
import checkPassword from "../helper/checkPassword.js";

const handleLogin = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    // Handle empty or undefined email and password
    if (!email) {
      return response.status(401).json({
        message: "Email is empty, Please provide a valid email!!",
        error: true,
      });
    }
    if (!password) {
      return response.status(401).json({
        message: "Password is empty, Please provide password!!",
        error: true,
      });
    }

    const user = await checkUserExists(email);
    if (!user) {
      return response.status(404).json({
        message: "User does not exist with this email. Please register first!",
        error: true,
      });
    }

    const isPasswordMatch = await checkPassword(password, user.password);

    if (!isPasswordMatch) {
      return response.status(401).json({
        message: "Email/password does not match!!",
        error: true,
      });
    }

    // user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // success response
    return response.status(202).json({
      message: "Users logged in  successfully!!",
      payload: { userWithoutPassword },
      error: false,
    });
  } catch (error) {
    return response.status(404).json({
      message: "Something wrong, while login!!",
      payload: { userWithoutPassword },
      error: true,
    });
  }
};
const handleLogout = async (request, res, next) => {
  try {
    // success response
    return response.status(202).json({
      message: "users logged out  successfully!!",
      payload: {},
      error: false,
    });
  } catch (error) {
    return response.status(404).json({
      message: "Something wrong, while logging out!!",
      payload: {},
      error: true,
    });
  }
};

export { handleLogin, handleLogout };
