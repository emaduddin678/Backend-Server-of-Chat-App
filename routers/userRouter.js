import express from "express";
import { getAllUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

// registration api
userRouter.post("/", registerUser);

// get all user 
userRouter.get("/", getAllUser)

export default userRouter;
