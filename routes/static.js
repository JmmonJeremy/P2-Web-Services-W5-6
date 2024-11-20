const express = require('express');
const routes = express.Router();

// Static Routes (this routes the css,js,& images)
// Set up "public" folder / subfolders for static files
routes.use(express.static("public"));
routes.use("/css", express.static(__dirname + "public/css"));
routes.use("/js", express.static(__dirname + "public/js"));
routes.use("/images", express.static(__dirname + "public/images"));

module.exports = routes;