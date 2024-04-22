import multer from "multer";
import fs from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

export const upload = multer({ storage: multer.memoryStorage() });

// Middleware for uploading images to Cloudinary
export const uploadToCloudinary = async (file) => {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "Home",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    // throw new Error("Error uploading file to Cloudinary");
  }
};

// Middleware for deleting images from Cloudinary
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    // Extract public ID with folder from Cloudinary URL
    const parts = imageUrl.split("/upload/");
    const publicId = parts[1]
      .split("/")
      .slice(1)
      .join("/")
      .replace(/\.[^.]+$/, "");

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary:", result);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    // throw new Error("Error deleting image from Cloudinary");
  }
};
