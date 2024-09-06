import createHttpError from "http-errors";
import UserModel from "../models/UserModel.js";

const findUserById = async (id, options = {}) => {
  try {
    const user = await UserModel.findById(id, options);
    if (!user) {
      throw createHttpError(404, "User not found!");
    }
    return user;
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      throw createHttpError(400, "Invalid Id");
    }
    throw error;
  }
};

export { findUserById };
