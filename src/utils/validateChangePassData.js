const validator = require("validator");

const validateChangePassData = async (body) => {
  const { oldPassword, newPassword } = body;

  if (oldPassword === newPassword) return "You must enter a NEW password";
  if (!newPassword) return "Enter new password characters";
  if (newPassword.length < 6) return "Enter 6+ characters";

  return null;
};

module.exports = validateChangePassData;
