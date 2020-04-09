const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function admin(req, res, next) {
  // 403 = Forbidden
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res.status(403).send("This is Forbidden");
  }

  next();
};
