const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")

//get one data from Mongo DB
router.get("/:id", userControllers.user_edit_get);

//delete data from Mongo DB
router.delete("/:id", userControllers.user_delete);

// update data from DB
router.put("/:id", userControllers.user_put);

module.exports = router