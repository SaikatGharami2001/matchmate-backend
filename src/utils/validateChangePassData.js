const validator = require("validator");

const validateChangePassData = async (body) => {
  const { oldPassword, newPassword } = body;

  if (!oldPassword || !newPassword)
    return "Both old and new passwords are required";

  if (oldPassword === newPassword)
    return "New password cannot be the same as the old password.";

  const strongCheck = validator.isStrongPassword(newPassword, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });

  if (!strongCheck) {
    return "New password must be at least 8 characters long and include uppercase, lowercase, number, and symbol.";
  }

  return null;
};

module.exports = validateChangePassData;
