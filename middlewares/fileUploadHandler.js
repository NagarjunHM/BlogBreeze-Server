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

    await fs.access(imagePath);
    await fs.unlink(imagePath);
    console.log(`Image ${filePath} deleted successfully`);
  } catch (err) {
    console.log(err);
    throw new customError(400, "image failed to delete");
  }
};
