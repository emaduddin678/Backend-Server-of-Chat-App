import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";

const handleProcessRegister = async (request, response) => {
  try {
    // console.log("request.body", request.body);

    const { name, email, password, profile_pic } = request.body;

    const checkEmail = await UserModel.findOne({ email });
    // console.log(checkEmail);

    if (checkEmail) {
      return response.status(400).json({
        message: "User with this email, Already Exists!",
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
      success: false,
      error: true,
    });
  }
};

const handleActivateUserAccount = async (request, response) => {
  try {
    const token = req.params.token;

    if (!token) throw createError(404, "token not found!");

    try {
      const decoded = jwt.verify(token, jwtActivationKey);
      if (!decoded) throw createError(404, "user was not able to verified");

      const userExists = await User.exists({ email: decoded.email });
      if (userExists) {
        throw createError(
          409,
          "User with this email already exist. Please login"
        );
      }

      const image = decoded.image;
      if (image) {
        const response = await cloudinary.uploader.upload(image, {
          folder: "EcommerceImageServer/users",
        });
        decoded.image = response.secure_url;
      }

      const user = await User.create(decoded);

      return successResponse(res, {
        statusCode: 201,
        message: `User was registration successfully`,
        payload: user,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw createError(401, "Token has expired");
      } else if (error.name === "JsonWebTokenError") {
        throw createError(401, "Invalid Token");
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

export { handleProcessRegister, getAllUser, handleActivateUserAccount };
