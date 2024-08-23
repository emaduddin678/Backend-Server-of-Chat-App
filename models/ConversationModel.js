// const mongoose = require("mongoose");
import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  } 
);

const conversationModel = mongoose.model("User", conversationSchema);

export default conversationModel;
 