import express from "express";
import { getAllUser, createUser } from "../controller/userController.js";

const userRouter = express.Router();

// registration api
userRouter.post("/", createUser);

// get all user 
userRouter.get("/", getAllUser)

export default userRouter;
