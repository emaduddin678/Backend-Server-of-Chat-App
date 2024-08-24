import express from "express";
import { handleLogin, handleLogout } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);

export default authRouter;
