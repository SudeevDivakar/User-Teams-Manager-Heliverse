//Requiring models
const User = require("../models/userSchema.js");
const asyncHandler = require("express-async-handler");

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find(req.query);
  res.json(users);
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const singleUser = await User.find({ id: id });
  if (singleUser.length === 0) {
    res.status(404);
    throw new Error("USER NOT FOUND");
  } else {
    res.json(singleUser);
  }
});

const addUser = asyncHandler(async (req, res) => {
  const {
    id,
    email,
    first_name,
    last_name,
    gender,
    domain,
    available,
    avatar,
  } = req.body;

  const isId = await User.find({ id: id });
  const isEmail = await User.find({ email: email });
  if (isId.length !== 0) {
    res.status(400);
    throw new Error("ID ALREADY EXISTS");
  }
  if (isEmail.length !== 0) {
    res.status(400);
    throw new Error("EMAIL ALREADY USED");
  }

  const user = await User.create({
    id,
    email,
    first_name,
    last_name,
    gender,
    domain,
    available,
    avatar: avatar || undefined,
  });

  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("FAILED TO ADD USER");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ id: id });
  if (user.length === 0) {
    res.status(404);
    throw new Error("USER NOT FOUND");
  }
  if (user[0].email === req.body.email) {
    await User.updateOne({ id: id }, req.body);
  } else {
    const isEmailTaken = await User.find({ email: req.body.email });
    if (isEmailTaken.length !== 0) {
      res.status(400);
      throw new Error("EMAIL ALREADY TAKEN");
    } else {
      await User.updateOne({ id: id }, req.body);
    }
  }
  const updatedUser = await User.findOne({ id: id });
  res.status(200).json(updatedUser);
});

const removeUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.find({ id: id });
  if (user.length === 0) {
    res.status(404);
    throw new Error("USER NOT FOUND");
  }
  const deletionResult = await User.deleteOne({ id: id });
  if (deletionResult.deletedCount === 1) {
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(500);
    throw new Error("Failed to delete user");
  }
});

module.exports = { getAllUsers, getUser, addUser, updateUser, removeUser };
