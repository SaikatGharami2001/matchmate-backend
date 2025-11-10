const mongoose = require("mongoose");

const URL =
  "mongodb+srv://saikatgharami2_db_user:HzXJpjYiPBileMnD@matchmate-backend.zc5oji1.mongodb.net/";

const db = async () => await mongoose.connect(URL);

module.exports = db;
