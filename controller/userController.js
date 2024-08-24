import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

const registerUser = async (request, response) => {
  try {
    // console.log("request.body", request.body);

    const { name, email, password, profile_pic } = request.body;

    const checkEmail = await UserModel.findOne({ email });
    // console.log(checkEmail);

    if (checkEmail) {
      return response.status(400).json({
        message: "User Already Exists!",
        error: true,
      });
    }

    // password into hashpassword
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      profile_pic,
      password: hashpassword,
    };
    console.log(payload);

    const user = new UserModel(payload);

    const userSaved = await user.save();

    return response.status(201).json({
      message: "user created successfully!",
      data: userSaved,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const getAllUser = async (request, response) => {
  try {
    const users = await UserModel.find();
    console.log("JSON.stringify(users)");

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

export { registerUser, getAllUser };
