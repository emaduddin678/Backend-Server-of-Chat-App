import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    
  },
  {
    timestamps: true,
  }
);

const MessageModel = model("Message", messageSchema);

export default MessageModel;
