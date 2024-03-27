const jwt = require("jsonwebtoken");
const { User } = require("../database");

const authProtection = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")

  ) {
    try {
      // Get token fron header
      token = req.headers.authorization.split(" ")[1];

      //Verify token
      const decoded = jwt.verify(token, "secretKeyForJWT@2024");
      //Get User from the token
      req.user = await User.findByPk(decoded.UserId);
      next();
    } catch (error) {
      res.status(401);
      res.send("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    res.send("Not authorized,no token ");
  }
};
module.exports = authProtection;