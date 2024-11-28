const jwt = require("jsonwebtoken");

module.exports.auth_middleware = async (req, res, next) => {
  try {
    const auth_header = req.headers.authorization;

    if (!auth_header) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorize" });
    }
    const token = auth_header.split(" ")[1];

    const decoded_value = await jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded_value.id;
    next();
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
