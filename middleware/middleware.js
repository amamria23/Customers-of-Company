var jwt = require("jsonwebtoken");
const UserAuth = require("../models/userauth");

const requireLogin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.user_secret, (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkIfLogin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.user_secret, async (err, decoded) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const currentUser = await UserAuth.findById(decoded.id);
        res.locals.user = currentUser;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
}

module.exports = {requireLogin, checkIfLogin};
