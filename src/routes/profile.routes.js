const express = require("express");
const profileRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");

const UserModel = require("../models/User.model");

profileRoutes.get("/profile/viewProfile", userAuth, async (req, res) => {
  try {
    const loggedInUser = await UserModel.findById();
    res.status(200).json({
      Message: [
        `Logged In User is : ${loggedInUser.firstName} + ${loggedInUser.lastName}`,
      ],
      data: loggedInUser,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = profileRoutes;
