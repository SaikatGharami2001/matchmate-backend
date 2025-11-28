require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();
const UserModel = require("../models/User.model");
const userAuth = require("../middlewares/userAuth.middleware");

const validateSignupData = require("../utils/validateSignupData");
const validateLoginData = require("../utils/validateLoginData");
const validateChangePassData = require("../utils/validateChangePassData");

authRoutes.post("/signup", async (req, res) => {
  try {
    const error = await validateSignupData(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        Message: error,
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createdUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const newUser = await UserModel.findById(createdUser._id).select(
      "-password"
    );

    return res.status(201).json({
      success: true,
      Message: "Account created successfully!",
      user: newUser,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({
      success: false,
      Message: "Internal server error. Please try again later.",
    });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const error = await validateLoginData(req.body);
    if (error) return res.status(400).json({ Message: error });

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ Message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ Message: "Invalid email or password" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ success: false, Error: err.message });
  }
});

authRoutes.post("/change-password", async (req, res) => {
  try {
    const error = await validateChangePassData(req.body);
    if (error) return res.status(400).json({ Message: error });

    const { email, oldPassword, newPassword } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        Message: "Email not registered. Please check again.",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        Message: "Incorrect old password.",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findByIdAndUpdate(
      user._id,
      { password: newHashedPassword },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      Message: "Password updated successfully!",
    });
  } catch (err) {
    console.error("Change Password Error:", err);
    return res.status(500).json({
      success: false,
      Message: "Internal server error. Please try again later.",
    });
  }
});

authRoutes.post("/forgotPassword", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ Message: "Email not registered" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    return res.status(200).json({ Message: "Reset link generated!", token });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
});

authRoutes.post("/logout", async (req, res) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ Message: "Logged Out Successfully!" });
});

module.exports = authRoutes;
