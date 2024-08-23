import mongoose from "mongoose";

const connectDB = async (a) => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    const connection = mongoose.connection;
    // console.log(a);
    connection.on("connected", () => {
      console.log("Connected to DB");
    });
    
    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb, as", error);
    });
    
  } catch (error) {
    console.log("Something is wrong in connectDB", error);
  }
};

export default connectDB;
