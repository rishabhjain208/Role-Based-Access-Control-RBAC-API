const User = require("../models/User");

const authorize = (requiredPermissions) => async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("role");
    if (!user) return res.status(404).json({ message: "User not found" });

    const hasPermission = requiredPermissions.every((perm) =>
      user.role.permissions.includes(perm)
    );
    if (!hasPermission)
      return res.status(403).json({ message: "Access denied" });

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = authorize;
