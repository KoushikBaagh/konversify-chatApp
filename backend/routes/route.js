const express = require("express");
const { uploadFile, getImage } = require("../controllers/imageController.js");
const upload = require("../middleware/upload.js");

const route = express.Router();

route.post("/api/upload", upload.single("file"), uploadFile);
route.get("/api/file/:filename", getImage); // this getting the file bascially

module.exports = route;
