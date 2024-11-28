const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  permissions: [String],
});

module.exports = mongoose.model("Role", RoleSchema);
