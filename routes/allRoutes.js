const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const UserAuth = require("../models/userauth");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const stateLogin =require("../middleware/middleware")



//get data from Mongo DB
router.get("*", stateLogin.checkIfLogin)

//welcome page
router.get("", (req, res) => {
  res.render("welcome", { mytitle: "Welcome", currentPage: "welcome" });
});
//signin page
router.get("/signup", (req, res) => {
  res.render("signup", { mytitle: "Sign up", currentPage: "signup" });
});
router.post("/signup", async (req, res) => {
  try {
    const result = await UserAuth.create(req.body);
    console.log(result);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
  }
});
//login
router.get("/login", (req, res) => {
  res.render("login", { mytitle: "Log in", currentPage: "login" });
});
router.post("/login", async (req, res) => {
  const result = await UserAuth.findOne({ email: req.body.email });
  if (result == null) {
    console.log("wrong email");
  } else {
    const match = await bcrypt.compare(req.body.password, result.password);
    if (match) {
      console.log("email and password are true");
      var token = jwt.sign({ id: result._id }, "shhhhh");
      res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });
      res.redirect("/home");
    } else {
      console.log("wrong password");
    }
  }
});

// home page
router.get("/home", stateLogin.requireLogin, userControllers.user_index_get);

// search page
router.post("/search", stateLogin.requireLogin,  userControllers.user_search_post);

//view page
router.get("/view/:id", stateLogin.requireLogin, userControllers.user_view_get);

//sign out
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = router;
