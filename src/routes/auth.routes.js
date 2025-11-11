const express = require("express");
const bcrypt = require("bcrypt");
const authRoutes = express.Router();
const UserModel = require("../models/User.model");

const validateSignupData = require("../utils/validateSignupData");

authRoutes.post("/signup", async (req, res) => {
  try {
    const error = await validateSignupData(req.body);

    if (error) return res.status(400).json({ Message: error });

    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    newUser.password = undefined;

    res
      .status(200)
      .json({ Message: "User Signed Up Successfully!", data: newUser });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Logged Up Successfully!" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

authRoutes.patch("/changePassword", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Changed Password Up Successfully!" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

authRoutes.post("/forgotPassword", async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

authRoutes.post("/resetPassword", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Reset Password Successfully!" });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

authRoutes.post("/logout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ Message: "Logged Out Successfully!" });
});

module.exports = authRoutes;
