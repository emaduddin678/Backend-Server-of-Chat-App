import cloudinary from "../lib/cloudinary.js";

const uploadImage = async (pic) => {
    const result = await cloudinary.uploader.upload(pic); // Wait for the upload to resolve
    const a = result.secure_url; // Access secure_url from the result
    console.log(a);
    return a;
};

export { uploadImage };
