const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUser = async (req, res) => {
  const { uniqueId, password } = req.body;

  const userExists = await User.findOne({ uniqueId });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    uniqueId,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      uniqueId: user.uniqueId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const authUser = async (req, res) => {
  const { uniqueId, password } = req.body;

  const user = await User.findOne({ uniqueId });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      uniqueId: user.uniqueId,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid unique ID or password");
  }
};

module.exports = { registerUser, authUser };
