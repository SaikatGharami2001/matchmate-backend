const express = require("express");
const userRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");

userRoutes.get("", userAuth, async (req, res) => {
  try {
    const connections = 1;
    res.status(200).json({ Message: "Connections", data: connections });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});
