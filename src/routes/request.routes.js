const express = require("express");
const mongoose = require("mongoose");
const requestRoutes = express.Router();

const ConnectionRequestModel = require("../models/ConnectionRequestModel");

const UserModel = require("../models/User.model");
const userAuth = require("../middlewares/userAuth.middleware");

requestRoutes.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(toUserId))
        return res.status(400).json({ Message: "Invalid userId" });

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status))
        return res
          .status(400)
          .json({ Message: "Status must be 'ignored' or 'interested'" });

      const isUserExists = await UserModel.findById(toUserId);
      if (!isUserExists)
        return res.status(404).json({ Message: "User not exist" });

      if (fromUserId.toString() === toUserId)
        return res
          .status(400)
          .json({ Message: "Can't send request to yourself" });

      const duplicateRequest = await ConnectionRequestModel.findOne({
        $or: [
          { toUserId, fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });

      if (duplicateRequest)
        return res.status(400).json({ Message: "Connection already exists" });

      const request = await ConnectionRequestModel.create({
        fromUserId,
        toUserId,
        status,
      });

      res.status(201).json(request);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
);

requestRoutes.get("/requests/pending", userAuth, async (req, res) => {
  try {
    const requests = await ConnectionRequestModel.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId"); // populate entire user object

    const pendingRequests = requests.map((field) => ({
      requestId: field._id,
      fromUserId: field.fromUserId, // FULL USER DATA
    }));

    res.status(200).json({ pendingRequests });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

requestRoutes.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(requestId))
        return res.status(400).json({ Message: "Invalid requestId" });

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        return res
          .status(400)
          .json({ Message: "Status must be 'accepted' or 'rejected'" });

      const connections = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });

      if (!connections)
        return res.status(400).json({ Message: "No such pending request" });

      connections.status = status;
      await connections.save();

      res.status(200).json(connections);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
);

module.exports = requestRoutes;
