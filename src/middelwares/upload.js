import multer from "multer";
import CustomError from "../utils/customError.js";

// Multer storage configuration to keep files in memory
const multerStorage = multer.memoryStorage();

// Filter to only allow image files
const multerFilterImage = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb( new CustomError("Not an image, please upload only images.", 400), false);
  }
};

// Multer upload configuration
const uploadStorage = multer({
  storage: multerStorage,
  fileFilter: multerFilterImage,
  limits: {
    fileSize: 20 * 1024 * 1024, // 5 MB limit
  },
});

export default uploadStorage
