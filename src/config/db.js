const mongoose = require("mongoose");

const URL =
  "mongodb+srv://saikatgharami2_db_user:Saikat%40123@cluster0.ibu5mor.mongodb.net/newUsers";

const db = async () => await mongoose.connect(URL);

module.exports = db;
