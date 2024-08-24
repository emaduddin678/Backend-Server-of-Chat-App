import UserModel from "../models/UserModel.js";

const checkUserExists = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export default checkUserExists;
