const validator = require("validator");
const UserModel = require("../models/User.model");

const validateSignupData = async (body) => {
  const { firstName, lastName, email, password, age, gender } = body;

  for (let key in body) {
    if (!body[key]) return `Enter valid ${key}`;
  }

  if (!validator.isEmail(email)) return "Enter a valid email";

  if (age < 18) return "Only 18+ allowed";
  if (password.length < 6) return "Password must be 6+ characters";

  const allowedGender = ["Male", "Female", "Others"];
  if (!allowedGender.includes(gender)) return "Enter valid gender";

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) return "User already registered";

  return null;
  // Code will still work because JS returns undefined by default.
};

module.exports = validateSignupData;
