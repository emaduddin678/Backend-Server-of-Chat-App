import express from "express";
import cors from "cors";
import { cookieSecret, frontendUrl, serverPort } from "./secret.js";
import cookieParser from "cookie-parser";

import connectDB from "./config/connectDB.js";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import testingRouter from "./routers/testingRouter.js";

const PORT = serverPort;

// initial  server app
const app = express();

// if database is not connected in production then connect it in the top of the app.
// connectDB();

// cors setup
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

// Middleware to request parse
app.use(express.json());
// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies
app.use(cookieParser(cookieSecret));

// routing setup
app.get("/", (req, res) => {
  res.json({ message: "Server is Working fine!" });
});

// Api route for crud function of user
app.use("/api/user/", userRouter);

// Api route for Authentication
app.use("/api/auth/", authRouter);

// Api route for Testing Route
app.use("/api/testing/", testingRouter);

// database connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });
});
