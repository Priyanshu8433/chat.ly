require("dotenv").config();
const app = require("./app");
const { Server } = require("socket.io");

const mongoose = require("mongoose");

const DB_URI = process.env.MONGO_URI.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    console.log("sending message");
    
    if (!chat.users) return console.log("chat.users not defined");
    
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      
      console.log("message sent");
      socket.in(user._id).emit("message received", newMessageRecieved);
    });
  });
});
