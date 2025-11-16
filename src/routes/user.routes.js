const express = require("express");
const userRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");
const ConnectionRequestModel = require("../models/ConnectionRequestModel");

userRoutes.get("/user/requests/pending", userAuth, async (req, res) => {
  try {
    const requests = await ConnectionRequestModel.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");

    const pendingRequests = requests.map((field) => field.fromUserId);

    res.status(200).json({ Message: "Connections", data: pendingRequests });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = userRoutes;
