import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";

import dotenv from "dotenv"; 
dotenv.config();
// connectDB();



const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
  });
});
