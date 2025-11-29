const express = require("express");
const userRoutes = express.Router();

const userAuth = require("../middlewares/userAuth.middleware");
const ConnectionRequestModel = require("../models/ConnectionRequestModel");
const UserModel = require("../models/User.model");

userRoutes.get("/connections", userAuth, async (req, res) => {
  try {
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { toUserId: req.user._id, status: "accepted" },
        { fromUserId: req.user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", "firstName lastName age gender job")
      .populate("toUserId", "firstName lastName age gender job");

    const myId = req.user._id.toString();

    const allConnections = connectionRequests.map((item) => {
      const fromUser = item.fromUserId;
      const toUser = item.toUserId;

      if (fromUser._id.toString() === myId) {
        return toUser;
      }

      return fromUser;
    });
    res.status(200).json(allConnections);
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
      .select("firstName lastName age gender job")
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
