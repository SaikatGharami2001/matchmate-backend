const express = require("express");
const authRoutes = express.Router();

const UserModel = require("../models/User.model");

authRoutes.post("/signup", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Signed Up Successfully!" });
  } catch (err) {}
});

authRoutes.post("/login", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Logged Up Successfully!" });
  } catch (err) {}
});

authRoutes.patch("/changePassword", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Changed Password Up Successfully!" });
  } catch (err) {}
});

authRoutes.post("/forgotPassword", async (req, res) => {
  try {
  } catch (err) {}
});

authRoutes.post("/resetPassword", async (req, res) => {
  try {
    res.status(200).json({ Message: "User Reset Password Successfully!" });
  } catch (err) {}
});

authRoutes.post("/logout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ Message: "Logged Out Successfully!" });
});

module.exports = authRoutes;
