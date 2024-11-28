const User = require("../models/User");
const Role = require("../models/Role");

// Get all users (Admin-only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("role", "name permissions");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single user by ID (Admin or user themselves)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "role",
      "name permissions"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    // Ensure only Admin or the user themselves can access
    if (req.user.id !== user.id && req.user.role.name !== "Admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user details (Admin-only)
exports.updateUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, role },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete user (Admin-only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
