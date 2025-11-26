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
      const loggedInUser = req.user;
      const fromUserId = loggedInUser._id;
      const { status, toUserId } = req.params;

      // Check if the toUserId is a valid mongoDb ID or not
      if (!mongoose.Types.ObjectId.isValid(toUserId))
        return res.status(400).json({ Message: "Invalid userId" });

      // Checking the status is valid or not
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status))
        return res.status(400).json({ Message: "Enter valid status" });

      // Checking if the user exist on our DB or not
      const isUserExists = await UserModel.findById(toUserId);
      if (!isUserExists)
        return res.status(404).json({ Message: "User not exist" });

      // Validating that user can't send connection to himself
      if (fromUserId.toString() === toUserId)
        return res
          .status(400)
          .json({ Message: "Can't send request to yourself" });

      // Checking if the request already exists
      const duplicateRequest = await ConnectionRequestModel.findOne({
        $or: [
          { toUserId: toUserId, fromUserId: fromUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });

      if (duplicateRequest)
        return res.status(400).json({ Message: "Connect already exists" });

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

requestRoutes.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        return res.status(400).json({ Message: "Wrong status" });

      const connections = await ConnectionRequestModel.findOne({
        _id: requestId,
        toUserId: req.user._id,
        status: "interested",
      });

      if (!connections)
        return res
          .status(400)
          .json({ Message: "No such request or already handled" });

      connections.status = status;
      await connections.save();

      res.status(200).json(connections);
    } catch (err) {
      res.status(500).json({ Error: err.message });
    }
  }
);

module.exports = requestRoutes;
