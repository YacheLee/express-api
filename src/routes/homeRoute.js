const express = require("express");
const msg_ok = require("../consts/msg_ok");

const router = express.Router();

router.get('/', (req, res)=>{
    res.json(msg_ok);
});

module.exports = router;