import checkUserExists from "../helper/checkUserExists.js";

const checkEmail = async (request, response) => {
  try {
    const { email } = request.body;

    // Handle empty or undefined email and password
    if (!email) {
      return response.status(401).json({
        message: "Email is empty, Please provide a valid email!!",
        error: true,
      });
    }

    const user = await checkUserExists(email);
    if (!user) {
      return response.status(404).json({
        message: "User does not exist with this email. Please register first!",
        error: true,
      });
    }
    // user without password
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    return response.status(200).json({
      message: "Email verified!!",
      success: true,
      payload: {
        userWithoutPassword,
      },
      error: false,
    });
  } catch (error) {
    return response.status(404).json({
      message: "Failed to verify your email!!",
      error: true,
    });
  }
};

export { checkEmail };
