const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  const verifyToken = jwt.verify(token, "secret");
  const { _id } = verifyToken;
  const loggedInUser = await UserModel.findById(_id);
  if (!loggedInUser) return res.status(401).json({ Error: "User not found" });
  req.user = loggedInUser;
  next();
};

module.exports = userAuth;
