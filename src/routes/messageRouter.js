import express from "express";
import { protectedRoute } from "../middleware/protect/protectedRoute.js";
import { getMessages, sendMessages } from "../controller/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/:id([0-9a-fA-F]{24})", protectedRoute, getMessages);
messageRouter.post("/send/:id([0-9a-fA-F]{24})", protectedRoute, sendMessages);

export default messageRouter;
