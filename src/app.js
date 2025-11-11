const express = require("express");
const cookieParser = require("cookie-parser");

const db = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

db();

module.exports = app;
