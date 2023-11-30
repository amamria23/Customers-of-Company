const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")
var jwt = require("jsonwebtoken");
const stateLogin =require("../middleware/middleware")

//get one data from Mongo DB
router.get("/:id", stateLogin.requireLogin, userControllers.user_edit_get);

//delete data from Mongo DB
router.delete("/:id", stateLogin.requireLogin,  userControllers.user_delete);

// update data from DB
router.put("/:id", stateLogin.requireLogin, userControllers.user_put);

module.exports = router