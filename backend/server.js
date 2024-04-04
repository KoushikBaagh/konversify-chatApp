const express = require("express");
//const { chats } = require("./dummyData/data");
const chatRoutes = require("./routes/chatRoutes");
const dotenv = require("dotenv");
//const { connect } = require("mongoose");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config(); // dotenv is used to read .env file, but the important thing here is that it must be kept above all the code in the server.js file. Otherwise, it won't work connectDB();
connectDB();
const app = express();

app.use(express.json()); // to accept json data

app.get("/", (req, res) => {
  res.send("API is running successfully");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat", (req, res) => {
//   res.send(chats);
// });

const PORT = process.env.PORT || 5000;

// app.listen(3000, console.log("Server Running Koushik on PORT " + "${PORT}"));

app.listen(5000, () =>
  console.log("Server Running Koushik on PORT " + `${PORT}`)
);
