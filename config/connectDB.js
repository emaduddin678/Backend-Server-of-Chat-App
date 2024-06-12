const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to DB");
    });

    connection.on("error", (error) => {
      console.log("Something is wrong in mongodb", error);
    });
  } catch (error) {
    console.log("Something is wrong in connectDB", error);
  }
};

module.exports = connectDB;
