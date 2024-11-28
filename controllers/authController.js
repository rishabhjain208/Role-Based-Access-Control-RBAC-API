const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const username = req.body.username;
    const role = req.body.role;
    const already_user = await User.findOne({ username });

    if (already_user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username,
      role,
      password: hash,
    });

    const saved_user = newUser.save();
    const token = jwt.sign({ id: saved_user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Successfull created", newUser, token });
  } catch (error) {
    // console.log("error");
    // console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).populate("role");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not Found" });
    }

    const checkpassword = await bcrypt.compare(password, user.password);
    if (!checkpassword) {
      return res
        .status(403)
        .json({ success: false, message: "Password is Incorrect!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Login Successfull !", token });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "Some error", error });
  }
};
