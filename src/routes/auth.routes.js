const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const authRoutes = express.Router();
const UserModel = require("../models/User.model");

const validateSignupData = require("../utils/validateSignupData");

authRoutes.post("/signup", async (req, res) => {
  try {
    const error = await validateSignupData(req.body);
    if (error) return res.status(400).json({ Message: error });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      Message: "Signup Successful!",
      data: userResponse,
    });
  } catch (err) {
    res.status(500).json({ success: false, Error: err.message });
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ Message: "Email and password are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ Message: "Enter a valid email" });

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ Message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ Message: "Invalid email or password" });

    const token = jwt.sign({ _id: user._id }, "secret", { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, Message: "Login Successful!" });
  } catch (err) {
    res.status(500).json({ success: false, Error: err.message });
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
