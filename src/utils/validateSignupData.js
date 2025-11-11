const validator = require("validator");
const UserModel = require("../models/User.model");

const validateSignupData = async (body) => {
  const { firstName, lastName, email, password, age, gender } = body;

  if (!firstName || !lastName) return "Enter your full name";
  if (!email) return "Enter your email";
  if (!validator.isEmail(email)) return "Enter a valid email";
  if (!password) return "Enter your password";
  if (password.length < 6) return "Password must be 6+ characters";
  if (!age) return "Enter your age";
  if (age < 18) return "Only 18+ allowed";
  if (!gender) return "Enter your gender";

  const allowedGender = ["Male", "Female", "Others"];
  if (!allowedGender.includes(gender)) return "Enter valid gender";

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return "User already registered";

  return null;
  // Code will still work because JS returns undefined by default.
};

module.exports = validateSignupData;
