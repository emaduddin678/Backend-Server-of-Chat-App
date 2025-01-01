import express from "express";
import cors from "cors";
import { cookieSecret, frontendUrl, serverPort } from "./secret.js";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/connectDB.js";
import userRouter from "./src/routes/userRouter.js";
import authRouter from "./src/routes/authRouter.js";
import testingRouter from "./src/routes/testingRouter.js";
import messageRouter from "./src/routes/messageRouter.js";

const PORT = serverPort;

// initial  server app
const app = express();

// cors setup
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

// Middleware to request parse
app.use(express.json({ limit: "10mb" }));
// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Middleware to parse cookies
app.use(cookieParser(cookieSecret));

// routing setup
app.get("/", (req, res) => {
  res.json({ message: "Server is Working fine!" });
});

// Api route for crud function of user
app.use("/api/user", userRouter);

// Api route for Authentication
app.use("/api/auth", authRouter);

// Api route for Messages
app.use("/api/messages", messageRouter);

// Api route for Testing Route
app.use("/api/testing", testingRouter);

// error handling

// 404 not found handler

// database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });
});
