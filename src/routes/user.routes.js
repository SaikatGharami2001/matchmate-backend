const express = require("express");
const userRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");
const ConnectionRequestModel = require("../models/ConnectionRequestModel");
const UserModel = require("../models/User.model");

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

userRoutes.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const connections = await ConnectionRequestModel.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("toUserId fromUserId");

    const hideUsersFromFeed = new Set();

    connections.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const feedUsers = {
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    };

    const totalUsers = await UserModel.countDocuments(feedUsers);

    const paginatedUsers = await UserModel.find(feedUsers)
      .select("firstName lastName")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      Message: "Suggested friends : ",
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      data: paginatedUsers,
    });
  } catch (err) {
    res.status(500).json({ Error: err.message });
  }
});

module.exports = userRoutes;
