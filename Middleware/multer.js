const multer = require("multer");
const path = require("path");
const fs = require("fs");
const createMulterInstance = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = `public/images/${folderName}`;
      fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const originalName = path.parse(file.originalname);
      cb(null, `${originalName.name}_${Date.now()}${originalName.ext}`);
    },
  });
  return multer({ storage });
};
module.exports = createMulterInstance;
