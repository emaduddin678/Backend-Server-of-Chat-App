import bcryptjs from "bcryptjs";

const checkPassword = async (password, userPassword) => {
  const isPasswordMatch = await bcryptjs.compare(password, userPassword);
  if (!isPasswordMatch) {
    return false;
  } else {
    return true;
  }
};

export default checkPassword;
