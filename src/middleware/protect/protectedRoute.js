import jwt from "jsonwebtoken";
import { jwtSecret } from "../../../secret.js";
import checkUserExists from "../../helper/checkUserExists.js";

const protectedRoute = async (request, response, next) => {
  try {
    const token = request.cookies.token;
    // If no token is provided, return Unauthorized (401)

    if (!token) {
      return response.status(401).json({
        message:
          "Unauthorized - Authorization token is missing. Please log in.",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    if (!decoded) {
      return response.status(404).json({
        message: "Token is invalid!",
        error: true,
        success: false,
      });
    }

    // console.log(decoded);
    const userExists = await checkUserExists(decoded.email);
    // console.log(userExists);
    if (!userExists) {
      return response.status(404).json({
        message: "User does not exists. Please register ",
        error: true,
        success: false,
      });
    }

    request.user = userExists;
    next();
  } catch (error) {
    console.log("Error in protected route", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { protectedRoute };
