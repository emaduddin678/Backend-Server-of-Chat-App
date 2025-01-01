import { uploadImage } from "../helper/uploadImageToCloudinary.js";
import MessageModel from "../models/MessageModel.js";

const getMessages = async (request, response) => {
  try {
    const { id: userToChatId } = request.params;
    const myId = request.user._id;
    const messages = await MessageModel.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    // success response
    return response.status(200).json({
      message: "All message retrived successfully!!",
      payload: { messages: messages },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in getMessage controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

const sendMessages = async (request, response) => {
  try {
    const { id: receiverId } = request.params;
    const senderId = request.user._id;
    console.log(request.user._id);
    const { text, image } = request.body;
    let imageUrl;

    if (image) {
      imageUrl = await uploadImage(image);
    }
    console.log(imageUrl);
    

    const newMessage = new MessageModel({
      senderId,
      receiverId,
      text,
      imageUrl,
    });
    const message = await newMessage.save();

    // todo: realtime functionality is here => socket.io

    // success response
    return response.status(200).json({
      message: "Message send successfully!!",
      payload: { message },
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in sendMessage controller", error.message);
    return response.status(500).json({
      message: "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

export { getMessages, sendMessages };
