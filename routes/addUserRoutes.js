const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")
var jwt = require("jsonwebtoken");
const {requireLogin} =require("../middleware/middleware")

//render add page
router.get("/add.html", requireLogin,  userControllers.user_add_get);

//send data to MongoDB
router.post("/add.html", requireLogin, userControllers.user_post);

module.exports = router