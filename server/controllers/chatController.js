const AsyncHandler = require("express-async-handler");
const Chat = require("./../models/chatModel");
const User = require("../models/userModel");

exports.accessChat = AsyncHandler(async (req, res, next) => {
  //current user will send the user id with whom to create a chat

  const { userId } = req.body;
  if (!userId) {
    res.status(400);
    throw new Error(`UserId param not sent with request`);
  }

  let isChat = await Chat.find({
    isGroupChat: false,
    users: { $all: [req.user.id, userId] },
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.status(200).json({
      status: "success",
      data: { Chat: isChat },
    });
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user.id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(201).json({
        status: "success",
        data: {
          Chat: FullChat,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
});

exports.fetchChat = AsyncHandler(async (req, res, next) => {
  try {
    let chats = await Chat.find({
      users: req.user.id,
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    chats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (chats.length <= 0) {
      return;
    }

    res.status(200).json({
      status: "success",
      data: {
        chats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
});

exports.createGroupChat = AsyncHandler(async (req, res, next) => {
  console.log(req.body.users);
  console.log(req.body.chatName);
  if (!req.body.users || !req.body.chatName) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const users = [...req.body.users];
  users.push(req.user._id.toString());

  if (users.length < 2) {
    throw new Error("More than 2 users are required to create a group chat");
  }

  const chat = await Chat.create({
    chatName: req.body.chatName,
    users,
    isGroupChat: true,
    groupAdmin: req.user,
  });

  const groupChat = await Chat.findById(chat._id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(201).json({
    status: "success",
    data: {
      chat: groupChat,
    },
  });
});

exports.renameGroup = AsyncHandler(async (req, res, next) => {
  const { chatId, chatName } = req.body;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  });
});

exports.addToGroup = AsyncHandler(async (req, res, next) => {
  const { chatId, userId } = req.body;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  });
});

exports.removeFromGroup = AsyncHandler(async (req, res, next) => {
  const { chatId, userId } = req.body;

  const chat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json({
    status: "success",
    data: {
      chat,
    },
  });
});
