import express from "express";
import { handleLogin, handleLogout, handleSignUp } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", handleSignUp);
authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

export default authRouter;
