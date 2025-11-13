const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  resetToken: { type: String },

  resetTokenExpires: { type: Date },
});

// Hashing Password

userSchema.methods.hashingPassword = async function () {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
};

// Comparing Password

userSchema.methods.comparingPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Token

userSchema.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, "secret", { expiresIn: "7d" });
};

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
