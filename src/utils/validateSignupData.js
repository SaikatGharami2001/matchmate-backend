const validator = require("validator");
const UserModel = require("../models/User.model");

const validateSignupData = async (body) => {
  const { firstName, lastName, email, password, age, gender, job } = body;

  const requiredFields = {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
    job,
  };

  for (const field in requiredFields) {
    if (
      !requiredFields[field] ||
      requiredFields[field].toString().trim() === ""
    ) {
      return `${field} is required`;
    }
  }

  if (!validator.isEmail(email)) {
    return "Invalid email format";
  }

  if (!validator.isStrongPassword(password)) {
    return "Password must be strong (uppercase, number, symbol required)";
  }

  if (age < 18 || age > 60) {
    return "Age must be between 18 and 60";
  }

  const allowedGender = ["Male", "Female", "Others"];
  if (!allowedGender.includes(gender)) {
    return "Gender must be Male, Female, or Others";
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return "Email already registered";
  }

  return null;
};

module.exports = validateSignupData;
