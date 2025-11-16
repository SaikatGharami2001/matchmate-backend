const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGO_URL;

const db = async () => await mongoose.connect(URL);

module.exports = db;
