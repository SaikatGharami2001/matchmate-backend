require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ Error: "token not found" });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = verifyToken;
    const loggedInUser = await UserModel.findById(_id).select("-password");

    if (!loggedInUser) return res.status(401).json({ Error: "User not found" });

    req.user = loggedInUser;
    next();
  } catch (err) {
    res.status(401).json({ Error: err.message });
  }
};

module.exports = userAuth;
