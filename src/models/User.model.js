require("dotenv").config();
require("dotenv").config();

const mongoose = require("mongoose");
const validator = require("validator");
// const jwt = require("jsonwebtoken");
// cons t bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [20, "First name cannot exceed 20 characters"],
      trim: true,
      validate: {
        validator: (v) => /^[A-Za-z]+$/.test(v),
        message: "First name must contain only letters",
      },
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [20, "Last name cannot exceed 20 characters"],
      trim: true,
      validate: {
        validator: (v) => /^[A-Za-z]+$/.test(v),
        message: "Last name must contain only letters",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (v) =>
          validator.isStrongPassword(v, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol",
      },
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [18, "You must be at least 18 years old"],
      max: [60, "Age must not exceed 60 years"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      trim: true,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Gender must be Male, Female, or Other",
      },
    },

    job: {
      type: String,
      required: [true, "Job field is required"],
      trim: true,
      minlength: [2, "Job must be at least 2 characters"],
      maxlength: [30, "Job cannot exceed 30 characters"],
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
