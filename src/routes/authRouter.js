import express from "express";
import {
  handleLogin,
  handleLogout,
  handleSignUp,
  updateProfile,
  checkAuth,
} from "../controller/authController.js";
import { protectedRoute } from "../middleware/protect/protectedRoute.js";

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

authRouter.put("/update-profile", protectedRoute, updateProfile);
authRouter.get("/check", protectedRoute, checkAuth);

export default authRouter;
 