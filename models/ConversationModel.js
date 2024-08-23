import  { model, Schema } from "mongoose";


const conversationSchema = new Schema(
  {
    sender: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    receiver: {
      type: Schema.ObjectId,
      required: true,
      ref: "User",
    },
    message: [
      {
        type: Schema.ObjectId,
        ref: "Message"
      },
    ],
  },
  {
    timestamps: true,
  }
);

const conversationModel = model("Conversation", conversationSchema);

export default conversationModel;
