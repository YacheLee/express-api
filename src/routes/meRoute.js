const express = require("express");
const requireAuth = require("../passports/requireAuth");

const router = express.Router();

router.get('/me', requireAuth, (req, res)=>{
    const {user} = req;
    res.json(user);
});

module.exports = router;