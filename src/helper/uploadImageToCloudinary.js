import cloudinary from "../lib/cloudinary.js";

const uploadImage = async (pic) => {
  return await cloudinary.uploader.upload(pic).secure_url;
};

export { uploadImage };
