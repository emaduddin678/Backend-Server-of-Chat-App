import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = model("Message", messageSchema);

export default MessageModel;
