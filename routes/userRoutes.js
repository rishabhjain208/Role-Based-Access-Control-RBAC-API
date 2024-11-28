const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/rbacMiddleware");

const router = express.Router();

// Route: Get all users (Admin-only)
router.get("/", authenticate, authorize(["admin-access"]), getAllUsers);

// Route: Get a single user by ID (Admin or user themselves)
router.get("/:id", authenticate, getUserById);

// Route: Update user details (Admin-only)
router.put("/:id", authenticate, authorize(["admin-access"]), updateUser);

// Route: Delete a user (Admin-only)
router.delete("/:id", authenticate, authorize(["admin-access"]), deleteUser);

module.exports = router;
