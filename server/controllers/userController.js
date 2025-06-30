const AsyncHandler = require("express-async-handler");
const User = require("./../models/userModel");
const generateToken = require("./../utils/generateToken");
const jwt = require("jsonwebtoken");

exports.register = AsyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Enter all required details");
  }

  // if (password != confirmPassword) {
  //   return next(new Error("Password and confirm password should be same"));
  // }

  const user = await User.create({ name, email, password });

  const token = generateToken(user._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.login = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Enter all required fields");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Email or password is wrong");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
});

exports.protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorised");
    }
  } else {
    res.status(401);
    throw new Error("Not authorised");
  }
});

exports.getAllUsers = AsyncHandler(async (req, res, next) => {
  const keywords = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keywords).find({
    _id: { $ne: req.user._id },
  });

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});
