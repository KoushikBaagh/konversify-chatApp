const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const dotenv = require("dotenv");
dotenv.config();
/* url = process.env.MONGO_URI; */

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    const match = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "plain/text",
      "text/plain",
    ];

    if (match.indexOf(file.mimetype) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }

    return {
      bucketName: "files",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
