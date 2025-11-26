require("dotenv").config();
const mongoose = require("mongoose");
// cons t bcrypt = require("bcrypt");
// co nst jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
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
      validate: {
        validator: validator.isEmail,
        message: "Enter a valid Email",
      },
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
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
  },
  { timestamps: true }
);

// Indexing for better performance

userSchema.index({ firstName: 1, lastName: 1 });

// Comparing Password

// userSchema.methods.comparingPassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Generating Token

// userSchema.methods.generateJWT = function () {
//   return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// Hashing Password

// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
