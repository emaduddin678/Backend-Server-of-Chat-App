import express from "express";
import {
  getAllUser,
  handleProcessRegister,
  handleActivateUserAccount,
  handleGetUserById,
} from "../controller/userController.js";

const userRouter = express.Router();

// base api is   /api/user/

// registration api
userRouter.post("/", handleProcessRegister);
// registration api
userRouter.get("/activate/:token", handleActivateUserAccount);
// get all user
userRouter.get("/", getAllUser);
// get user by id
userRouter.get("/:id([0-9a-fA-F]{24})", handleGetUserById);

export default userRouter;
