const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const allRoutes = require("./routes/allRoutes");
const editRoutes = require("./routes/editRoutes");
const addUserRoutes = require("./routes/addUserRoutes");
var cookieParser = require("cookie-parser");
app.use(cookieParser());
require('dotenv').config()

//Auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//connect to MongoDB
mongoose
  .connect(
    process.env.user_mongo_connect
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use("/", allRoutes);
app.use("/edit/", editRoutes);
app.use("/user/", addUserRoutes);
