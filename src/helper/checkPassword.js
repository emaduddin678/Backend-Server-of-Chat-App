import bcryptjs from "bcryptjs";

const checkPassword = async (password, userPassword) => {
  const isPasswordMatch = await bcryptjs.compare(password, userPassword);
  return isPasswordMatch
};

export default checkPassword;
