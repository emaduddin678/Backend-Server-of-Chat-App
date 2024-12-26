import bcryptjs from "bcryptjs";
import UserModel from "../models/UserModel.js";
import checkUserExists from "../helper/checkUserExists.js";
import checkPassword from "../helper/checkPassword.js";
import createJSONWebToken from "../helper/createJSONWebToken.js";
import { jwtSecret } from "../../secret.js";
import cloudinary from "../lib/cloudinary.js";
import { uploadImage } from "../helper/uploadImageToCloudinary.js";

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
      message: "User logged in  successfully!!",
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
    const user = await UserModel.findOne({ email });
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
      console.log(user.password, password);
      return response.status(401).json({
        message: "Invalid credentials!",
        error: true,
        success: false,
      });
    }
    console.log(isPasswordMatch);

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
      message: "User logged in  successfully!!",
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
      message: "User logged out successfully!!",
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
    const userId = request.user._id;
    const { name, profilePic } = request.body;
    console.log(profilePic, userId);

    if (!profilePic) {
      return response
        .status(400)
        .json({ message: "Profile pic is required.." });
    }
    const updatedData = {
      name: name,
    };

    const uploadResult = await uploadImage(profilePic);
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        ...updatedData,
        profile_pic: uploadResult,
      },
      { new: true }
    );

    // success response
    return response.status(200).json({
      message: "User updated in successfully!!",
      payload: { user: updatedUser },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in update controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const checkAuth = async (request, response) => {
  try {
    // success response
    return response.status(200).json({
      message: "User checked in successfully!!",
      payload: { user: request.user },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in update controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { handleSignUp, handleLogin, handleLogout, updateProfile, checkAuth };
