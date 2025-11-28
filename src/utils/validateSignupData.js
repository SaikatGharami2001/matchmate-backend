const validator = require("validator");
const UserModel = require("../models/User.model");

const validateSignupData = async (body) => {
  const { firstName, lastName, email, password, age, gender, job } = body;

  // 1. Required Field Validation
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
      return `${formatFieldName(field)} is required`;
    }
  }

  // 2. Email Format Validation
  if (!validator.isEmail(email)) {
    return "Please enter a valid email address";
  }

  // 3. Strong Password (customize as per your preference)
  if (!validator.isStrongPassword(password, { minSymbols: 1 })) {
    return "Password must be strong (at least one uppercase, one number, and one symbol)";
  }

  // 4. Age Validation
  if (age < 18 || age > 60) {
    return "Age must be between 18 and 60 years";
  }

  // 5. Gender Validation
  const allowedGender = ["Male", "Female", "Other"];
  if (!allowedGender.includes(gender)) {
    return "Gender must be Male, Female, or Other";
  }

  // 6. Duplicate Email Check
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return "This email is already registered. Try logging in instead.";
  }

  return null;
};

// Helper to format field names:
const formatFieldName = (field) => {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
};

module.exports = validateSignupData;
