import dotenv from "dotenv";
dotenv.config();

const appName = process.env.APP_NAME || "Chit Chat Application";
const serverPort = process.env.SERVER_PORT || 8080;
const frontendUrl = process.env.FRONTEND_URL ;

const mongodbURL =
  process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/ecommerceMernsDB";
const jwtSecret = process.env.JWT_SECRET || "I$CREATED_THIS@SECRET@PRO%KEY%";
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
const cookieSecret = process.env.COOKIE_SECRET || "aslkdaldskfja234";
const nodeEnv = process.env.NODE_ENV || "development";
const cloudinarApiSecret = process.env.CLOUDINARY_API_SECRET;

export {
  appName,
  serverPort,
  mongodbURL,
  jwtActivationKey,
  smtpUsername,
  smtpPassword,
  clientURL,
  jwtSecret,
  jwtAccessKey,
  jwtRefreshKey,
  jwtResetPasswordKey,
  cookieSecret,
  frontendUrl,
  nodeEnv,
  cloudinarApiSecret,
};
