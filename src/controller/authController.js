import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";
import checkUserExists from "../helper/checkUserExists.js";
import checkPassword from "../helper/checkPassword.js";
import createJSONWebToken from "../helper/createJSONWebToken.js";
import { jwtSecret } from "../../secret.js";

const handleSignUp = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // Handle empty or undefined email and password
    if (!name) {
      return response.status(400).json({
        message: "Name is empty, Please provide your name!!",
        error: true,
        success: false,
      });
    }
    if (!email) {
      return response.status(400).json({
        message: "Email is empty, Please provide a valid email!!",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return response.status(400).json({
        message: "Password is empty, Please provide password!!",
        error: true,
        success: false,
      });
    }
    if (password.length < 6) {
      return response.status(400).json({
        message: "Password must be at least 6 characters!!",
        error: true,
        success: false,
      });
    }

    // Checking if the user already exists
    const user = await checkUserExists(email);
    if (user) {
      return response.status(409).json({
        message: "User with this email already exists!",
        error: true,
        success: false,
      });
    }

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new UserModel(userData);
    // console.log(newUser)
    // Return success response with user data (excluding password)
    const userWithoutPassword = { ...newUser.toObject() };
    delete userWithoutPassword.password; // Remove password before sending the response

    const token = createJSONWebToken(
      userWithoutPassword,
      jwtSecret,
      response,
      "7d"
    );

    if (token) {
      await newUser.save();
    } else {
      response.status(400).json({
        message: "Invalid user data!!",
        error: true,
        success: false,
      });
    }

    // success response
    return response.status(202).json({
      message: "Users logged in  successfully!!",
      payload: { user: userWithoutPassword, token },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const handleLogin = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Handle empty or undefined email and password
    if (!email) {
      return response.status(400).json({
        message: "Email is empty, Please provide a valid email!!",
        error: true,
        success: false,
      });
    }
    if (!password) {
      return response.status(400).json({
        message: "Password is empty, Please provide password!!",
        error: true,
        success: false,
      });
    }

    // checking real user
    const user = await checkUserExists(email);
    if (!user) {
      return response.status(404).json({
        message: "Invalid credentials!",
        error: true,
        success: false,
      });
    }

    // checking Password
    const isPasswordMatch = await checkPassword(password, user.password);
    if (!isPasswordMatch) {
      return response.status(401).json({
        message: "Invalid credentials!",
        error: true,
        success: false,
      });
    }

    // user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    // handle jwt token
    // token, cookie
    const accessToken = createJSONWebToken(
      userWithoutPassword,
      jwtSecret,
      response,
      "7d"
    );

    // success response
    return response.status(200).json({
      message: "Users logged in  successfully!!",
      payload: { user: userWithoutPassword, accessToken },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
    });
  }
};

const handleLogout = async (request, response) => {
  try {
    response.cookie("token", "", {
      maxAge: 0,
    });
    // success response
    return response.status(202).json({
      message: "Users logged out successfully!!",
      payload: {},
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const updateProfile = async (request, response) => {
  try {
    const user = request.user;
    console.log(user)

    if (user.password && user.password.length < 6) {
      return response.status(400).json({
        message: "Password must be at least 6 characters!!",
        error: true,
        success: false,
      });
    }

  

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashPassword,
    };
    const newUser = new UserModel(userData);
    // console.log(newUser)
    // Return success response with user data (excluding password)
    const userWithoutPassword = { ...newUser.toObject() };
    delete userWithoutPassword.password; // Remove password before sending the response

    const token = createJSONWebToken(
      userWithoutPassword,
      jwtSecret,
      response,
      "7d"
    );

    if (token) {
      await newUser.save();
    } else {
      response.status(400).json({
        message: "Invalid user data!!",
        error: true,
        success: false,
      });
    }

    // success response
    return response.status(202).json({
      message: "Users logged in  successfully!!",
      payload: { user: userWithoutPassword, token },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { handleSignUp, handleLogin, handleLogout, updateProfile };
