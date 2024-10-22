import mongoose from "mongoose";
import { mongodbURL } from "../secret.js";

const connectDB = async () => {
  try {
    const connection = mongoose.connection;
    
    connection.on("connected", () => {
      console.log("Connected to DB"); 
    });
    
    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb, as", error);
    });
    await mongoose.connect(mongodbURL);
  } catch (error) {
    console.log("Something is wrong in connectDB", error);
  }
};

export default connectDB;
