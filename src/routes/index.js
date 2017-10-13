const _ = require("lodash");
const express = require("express");
const authRoute = require("./authRoute");
const homeRoute = require("./homeRoute");
const postRoute = require("./postRoute");
const meRoute = require("./meRoute");

const router = express.Router();
router.use(authRoute);
router.use(homeRoute);
router.use(postRoute);
router.use(meRoute);

module.exports = router;