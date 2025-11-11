const express = require("express");
const bcrypt = require("bcrypt");
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
    const error = await validateLoginData(req.body);
    if (error) return res.status(400).json({ Message: error });

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ Message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ Message: "Invalid email or password" });

    const token = jwt.sign({ _id: user._id }, "secret", {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // wont store cookies in postman
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, Message: "Login Successful!" });
  } catch (err) {
    res.status(500).json({ success: false, Error: err.message });
  }
});

authRoutes.patch("/changePassword", userAuth, async (req, res) => {
  try {
    const error = await validateChangePassData(req.body);
    if (error) return res.status(400).json({ Message: error });

    const { oldPassword, newPassword } = req.body;

    const checkPassword = await bcrypt.compare(oldPassword, req.user.password);

    if (!checkPassword)
      return res.status(400).json({ Message: "Wrong Password" });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updatePassword = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        password: newHashedPassword,
      },
      { new: true }
    );

    res.status(200).json({ Message: "Password Changed!" });
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
