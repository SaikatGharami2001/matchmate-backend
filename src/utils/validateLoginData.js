const validator = require("validator");

const validateLoginData = async (body) => {
  const { email, password } = body;

  if (!email || !password) {
    return "Email and password are required";
  }

  if (!validator.isEmail(email)) {
    return "Enter a valid email address";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
};

module.exports = validateLoginData;
