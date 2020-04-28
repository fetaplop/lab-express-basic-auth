const express = require("express");
const siteRouter = express.Router();
const loginCheck = require("./../middleware/loginCheck");

// GET CAT MAIN
siteRouter.get("/main", loginCheck, (req, res, next) => {
    res.render("main")
})

// GET private something+?

module.exports = siteRouter