import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import dotenv from "dotenv";
import userRouter from "./routers/userRouter.js";
import authRouter from "./routers/authRouter.js";
dotenv.config();
// connectDB();

const PORT = process.env.PORT || 8080;
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


connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });
});
