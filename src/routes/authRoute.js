const express = require("express");
const authService = require("../services/authService");
const TokenUtil = require("../utils/TokenUtil");

const router = express.Router();

router.post('/auth/login', (req, res, next)=>{
    const {body={}} = req;
    const {email=null, password=null} = body;
    authService.login_by_email_and_password(email, password).then((token)=>{
        res.json({token});
    }).catch(next);
});

router.post('/auth/register', (req, res, next)=>{
    const {body={}} = req;
    const {email=null, password=null} = body;
    authService.register(email, password).then((token)=>{
        res.json({token});
    }).catch(next);
});

module.exports = router;