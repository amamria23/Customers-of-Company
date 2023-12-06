const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")
var jwt = require("jsonwebtoken");
const {requireLogin} =require("../middleware/middleware")

//get one data from Mongo DB
router.get("/:id", requireLogin, userControllers.user_edit_get);

//delete data from Mongo DB
router.delete("/:id", requireLogin,  userControllers.user_delete);

// update data from DB
router.put("/:id", requireLogin, userControllers.user_put);

module.exports = router