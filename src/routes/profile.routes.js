const express = require("express");
const profileRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");

const UserModel = require("../models/User.model");

profileRoutes.get("/viewProfile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    const loggedInUser = await UserModel.findById({ _id: user._id });

    const userInfo = loggedInUser.toObject();
    delete userInfo.password;

    res.status(200).json({
      Message: [
        `Logged In User is : ${userInfo.firstName} ${userInfo.lastName}`,
      ],
      data: userInfo,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = profileRoutes;
