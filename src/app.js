const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

const db = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const requestRoutes = require("./routes/request.routes");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);

db();

module.exports = app;
