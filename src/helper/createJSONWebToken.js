import jwt from "jsonwebtoken";
import { nodeEnv } from "../../secret.js";

const createJSONWebToken = (payload, secretKey, response, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object!");
  }

  if (typeof secretKey !== "string" || secretKey === "") {
    throw new Error("Secret key must be a non-empty string");
  }

  try {
    // console.log("Helloasdf",payload);
    const token = jwt.sign(payload, secretKey, { expiresIn });
    // console.log("Hello");
    response.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: nodeEnv !== "development",
    });
    // console.log("Hell2");
    return token;
  } catch (error) { 
    // console.log("Hell3");
    console.error("Failed to sign the JWT emad:", error);
    throw error;
  }
};

export default createJSONWebToken;
