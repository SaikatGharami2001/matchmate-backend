const validator = require("validator");

const validateChangePassData = async (body) => {
  const { oldPassword, newPassword } = body;

  if (!oldPassword || !newPassword)
    return "Both old and new passwords are required";

  if (oldPassword === newPassword)
    return "New password can't be the same as old password";

  if (newPassword.length < 6)
    return "New password must be at least 6 characters";

  return null;
};

module.exports = validateChangePassData;
