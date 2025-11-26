const express = require("express");
const profileRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");

const UserModel = require("../models/User.model");

profileRoutes.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

profileRoutes.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!req.body.password || req.body.password.trim() === "")
      delete req.body.password;
    const allowedEdits = ["firstName", "lastName", "password", "age", "gender"];
    const isValid = Object.keys(req.body).every((field) =>
      allowedEdits.includes(field)
    );

    if (!isValid) return res.status(400).json({ updatedUser });

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = profileRoutes;
