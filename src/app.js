const express = require("express");
const db = require("./config/db");
const app = express();

db();

module.exports = app;
