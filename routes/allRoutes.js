const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");


const { requireLogin, checkIfLogin } = require("../middleware/middleware");
const { check } = require("express-validator");

//get data from Mongo DB
router.get("*", checkIfLogin);

//welcome page
router.get("", userControllers.user_welcome_get);
//signup page
router.get("/signup", userControllers.user_signup_get);
router.post(
  "/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  userControllers.user_signup_post
);
//login
router.get("/login", userControllers.user_login_get);
router.post(
  "/login",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  userControllers.user_login_post
);


// home page
router.get("/home", requireLogin, userControllers.user_index_get);

// search page
router.post("/search", requireLogin, userControllers.user_search_post);

//view page
router.get("/view/:id", requireLogin, userControllers.user_view_get);

//sign out
router.get("/signout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
});

module.exports = router;
