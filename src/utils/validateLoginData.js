const validator = require("validator");

const validateLoginData = async (body) => {
  const { email, password } = body;

  if (!email || !password) return "Email and password are required";
  if (!validator.isEmail(email)) return "Enter a valid email";

  return null;
};

module.exports = validateLoginData;
