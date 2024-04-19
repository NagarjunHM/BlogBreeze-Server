import multer from "multer";
import fs from "fs/promises";
import path from "path";
import customError from "./errorHandler.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage: storage });

// helper function to delete the image from the
export const deleteImageFromStorage = async (filePath) => {
  try {
    const imagePath = path.join(filePath);

    console.log("Attempting to delete file:", imagePath);

    // Check if file exists
    await fs.access(imagePath);

    // Delete the file
    await fs.unlink(imagePath);

    console.log(`Image ${filePath} deleted successfully`);
  } catch (err) {
    console.error("Error deleting image:", err);
    // throw new customError(400, "Failed to delete image");
  }
};
