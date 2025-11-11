const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    required: true,
  },

  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    validate: { validator: validator.isEmail, message: "Enter a valid Email" },
    trim: true,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    validate: {
      validator: validator.isStrongPassword,
      message: "Enter a strong password",
    },
    required: true,
  },

  age: { type: Number, min: 18, max: 40, required: true },

  gender: {
    type: String,
    trim: true,
    enum: {
      values: ["Male", "Female", "Others"],
      message: "Gender must be Male, Female, or Others",
    },
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
