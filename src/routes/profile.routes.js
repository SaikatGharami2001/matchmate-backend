const express = require("express");
const profileRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");

const UserModel = require("../models/User.model");

profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      Message: `Hello : ${user.firstName}`,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const allowedEdits = ["firstName", "lastName", "password", "age", "gender"];
    const isValid = Object.keys(req.body).every((field) =>
      allowedEdits.includes(field)
    );

    if (!isValid) return res.status(400).json({ Message: `Edit not allowed` });

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({
      Message: [`Hello : ${updatedUser.firstName} `],
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = profileRoutes;
