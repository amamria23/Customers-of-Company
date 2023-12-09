const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");


const { requireLogin, checkIfLogin } = require("../middleware/middleware");
const { check} = require("express-validator");

//get data from Mongo DB
router.get("*", checkIfLogin);
router.get("/home", checkIfLogin);
router.post("*", checkIfLogin);

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
router.get("/signout", userControllers.user_signout_get);


//upload img to cloudinary and mongodb

const multer  = require('multer')
const upload = multer({storage: multer.diskStorage({})});

router.post('/profile', upload.single('avatar'),  userControllers.user_profile_post)

module.exports = router;
