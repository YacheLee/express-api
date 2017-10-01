const _ = require("lodash");
const express = require("express");
const authRoute = require("./authRoute");
const homeRoute = require("./homeRoute");
const postRoute = require("./postRoute");

const router = express.Router();
router.use(authRoute);
router.use(homeRoute);
router.use(postRoute);

module.exports = router;