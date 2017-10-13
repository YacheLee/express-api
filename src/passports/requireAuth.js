const TokenUtil = require("../utils/TokenUtil");
const tokenService = require("../services/tokenService");

module.exports = (req, res, next)=> {
    const token = TokenUtil.getTokenByReq(req);
    tokenService.findUserByToken(token).then((user)=>{
        delete user.password;
        req.user = user;
        next();
    }).catch(next);
};