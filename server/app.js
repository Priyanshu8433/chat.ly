const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./utils/notFound");
const globalErrorHandler = require("./utils/globalErrorHandler");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

const chats = require("./data/data");

const app = express();
app.use(morgan("dev"));

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.json({
    message: "Response from the server",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

app.use(notFound);
app.use(globalErrorHandler);

module.exports = app;
