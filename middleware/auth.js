const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function authorization(req, res, next) {
  console.log("I am in auth.js ");
  const token = req.header("x-auth-token");
  console.log("TOKEN IS", req.header("x-auth-token"));
  if (!token) return res.status(401).send("You donot have authorization");

  try {
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    console.log("The decoded token is", decodedToken);
    req.user = decodedToken;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token");
  }
};
