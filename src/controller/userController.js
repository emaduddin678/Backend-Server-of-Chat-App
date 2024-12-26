import checkUserExists from "../helper/checkUserExists.js";
import createJSONWebToken from "../helper/createJSONWebToken.js";
import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { jwtActivationKey } from "../../secret.js";
import sendEmail from "../helper/sendEmail.js";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { findUserById } from "../services/userService.js";

// process register with information
const handleProcessRegister = async (request, response) => {
  try {
    const { name, email, password, profile_pic } = request.body;

    const userExists = await checkUserExists(email);

    if (userExists) {
      return response.status(400).json({
        message: "User with this email, Already Exists!",
        error: true,
        success: false,
      });
    }

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const tokenPayload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };

    const token = createJSONWebToken(tokenPayload, jwtActivationKey, "10m");

    //prepare email
    const emailData = {
      name,
      email,
      subject: "Account Activation Email!",
      apiURL: `http://localhost:8000/api/user/activate/${token}`,
    };

    //send email with nodemailer;
    await sendEmail(emailData);

    // const user = new UserModel(tokenPayload);
    // const userSaved = await user.save();

    return response.status(200).json({
      message: "An Email send to your mail!",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

// activation user
const handleActivateUserAccount = async (request, response) => {
  try {
    const token = request.params.token;

    if (!token) throw createHttpError(404, "token not found!");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) {
        return response.status(404).json({
          message: "user was not able to verified!",
          error: true,
          success: false,
        });
      }

      const userExists = await checkUserExists(decoded.email);

      if (userExists) {
        return response.status(400).json({
          message: "User with this email, Already Exists!",
          error: true,
          success: false,
        });
      }

      const image = decoded.image;
      if (image) {
        const response = await cloudinary.uploader.upload(image, {
          folder: "EcommerceImageServer/users",
        });
        decoded.image = response.secure_url;
      }

      const user = await UserModel.create(decoded);

      return response.status(201).json({
        message: `User was registration successfully..`,
        error: false,
        success: true,
        payload: user,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createHttpError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createHttpError(401, "Invalid Token");
      } else {
        throw error;
      }
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

// get All user
const getAllUser = async (request, response) => {
  try {
    const users = await UserModel.find();
    // console.log("JSON.stringify(users)");

    return response.status(201).json({
      message: "All user fetched successfully!",
      data: users,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const handleGetUserById = async (request, response) => {
  try {
    const id = request.params.id;

    const options = { password: 0 };

    const user = await findUserById(id, options);

    return response.status(201).json({
      message: `User returned successfully..`,
      payload: user,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export {
  handleProcessRegister,
  getAllUser,
  handleActivateUserAccount,
  handleGetUserById,
};
