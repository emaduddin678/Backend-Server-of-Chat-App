import express from "express";
import {
  getUsersForSidebar,
  // handleProcessRegister,
  // handleActivateUserAccount,
  handleGetUserById,
} from "../controller/userController.js";
import { protectedRoute } from "../middleware/protect/protectedRoute.js";

const userRouter = express.Router();

// base api is   /api/user/

// registration api
// userRouter.post("/", handleProcessRegister);
// registration api
// userRouter.get("/activate/:token", handleActivateUserAccount);
// get all user
userRouter.get("/", protectedRoute, getUsersForSidebar);
// get user by id
userRouter.get("/:id([0-9a-fA-F]{24})", handleGetUserById);

export default userRouter;
