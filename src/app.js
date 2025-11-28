const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://matchmate-frontend.vercel.app",
      "https://matchmate-frontend-1smpx3qpz-saikat-gharami.vercel.app",
      "https://matchmate-frontend-4rd6vivrl-saikat-gharammi.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const db = require("./config/db");
db();

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const requestRoutes = require("./routes/request.routes");
const userRoutes = require("./routes/user.routes");

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", requestRoutes);
app.use("/", userRoutes);

module.exports = app;
