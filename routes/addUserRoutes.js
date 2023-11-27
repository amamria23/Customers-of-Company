const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")

//render add page
router.get("/add.html", userControllers.user_add_get);

//send data to MongoDB
router.post("/add.html", userControllers.user_post);

module.exports = router