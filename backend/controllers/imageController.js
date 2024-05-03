var grid = require("gridfs-stream");
const mongoose = require("mongoose");

const url = "http://localhost:5000";
const conn = mongoose.connection;

let gfs, gridfsBucket;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "files",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("files");
});

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(404).json("File not found");
  }

  const imageUrl = `${url}/api/file/${req.file.filename}`;

  return res.status(200).json(imageUrl);
};

const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      filename: req.params.filename,
    }); // findOne query in mongodb

    if (!file || file.length === 0) {
      return res.status(404).json("No file exists");
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res); // important concept in node.js, matlab pipe ke saath , streams ko kaise use kiya jata hai ?
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
module.exports = { uploadFile, getImage }; // export { uploadImage };
