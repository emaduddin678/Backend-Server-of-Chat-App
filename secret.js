import dotenv from "dotenv";
dotenv.config();

const serverPort = process.env.SERVER_PORT || 8080;
const mongodbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernsDB";

  

const jwtActivationKey =
  process.env.JWT_ACTIVATION_KEY || "I$CREATED_THIS@ACTIVATION%KEY%";
const jwtAccessKey = process.env.JWT_ACCESS_KEY || "I$CREATED_THIS@ACCESS%KEY%";
const jwtRefreshKey =
  process.env.JWT_REFRESH_KEY || "I$CREATED_THIS@REFRESH%KEY%";
const jwtResetPasswordKey =
  process.env.JWT_RESET_PASSWORD_KEY || "I$CREATED_THIS@ResetPassword%KEY%";

const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";
const clientURL = process.env.CLIENT_URL || "";

export {
  serverPort,
  mongodbURL,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtAccessKey,
  jwtRefreshKey,
  jwtResetPasswordKey,
};
