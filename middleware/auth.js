const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if no token
  if (!token) {
    return res.status(401).json({ msg: "no token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // decoded has the user id in the payload
    req.user = decoded.user;
    next(); // move on from this middleware
  } catch {
    res.status(401).json({ msg: "token is not valid" });
  }
};
