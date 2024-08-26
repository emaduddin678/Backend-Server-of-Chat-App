import express from "express";
import {
  getAllUser,
  handleProcessRegister,
  handleActivateUserAccount,
} from "../controller/userController.js";

const userRouter = express.Router();

// registration api
userRouter.post("/", handleProcessRegister);
// registration api
userRouter.get("/activate/:token", handleActivateUserAccount);

// get all user 
userRouter.get("/", getAllUser)

export default userRouter;
