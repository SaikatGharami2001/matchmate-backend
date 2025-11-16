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

userRoutes.get("/user/connections", userAuth, async (req, res) => {
  try {
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: req.user._id, status: "accepted" },
        { fromUserId: req.user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const allConnection = connectionRequests.map((field) => {
      if (field.fromUserId.toString() === req.user._id.toString()) {
        return field.toUserId;
      }
      return field.fromUserId;
    });

    res.status(200).json({ Message: "Connections", data: allConnection });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = userRoutes;
