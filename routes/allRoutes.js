const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController")


//get data from Mongo DB

// home page
router.get("", userControllers.user_index_get);

// search page
router.post("/search", userControllers.user_search_post);

//view page
router.get("/view/:id", userControllers.user_view_get);

module.exports = router;
