import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";


import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
import testingRouter from "./routers/testingRouter.js";
import { serverPort } from "./secret.js";
// connectDB();

const PORT = serverPort;
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
  })
);
// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.json({ message: "Server is Working fine!" });
});

// Api route for crud function of user 
app.use("/api/user/", userRouter);

// Api route for Authentication 
app.use("/api/auth/", authRouter);

// Api route for Testing Route
app.use("/api/testing/", testingRouter);


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });
});
