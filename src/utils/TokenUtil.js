const _ = require("lodash");
const jwt = require("jsonwebtoken");
const uuid = require("node-uuid");
const {token_last_for_day, jwtSecret} = require("../config");
const DateUtil = require("../utils/DateUtil");
const CryptUtil = require("../utils/CryptUtil");
const {Token} = require("../models");
const JSONError = require("../errors/JSONError");
const {user_does_not_exist} = require("../consts/Exception");

const TokenUtil = {
    encode: function (user) {
        return new Promise((resolve, reject)=>{
            if(_.isEmpty(user) || _.isEmpty(user._id)){
                reject(new JSONError(user_does_not_exist));
            }
            else{
                const now = DateUtil.now();
                const exp = DateUtil.addDay(now,token_last_for_day);
                const payload = {
                    _id: CryptUtil.ObjectId(),
                    user_id: user._id,
                    user_email: user.email,
                    sub:user._id,
                    iat:now.getTime(),
                    exp:exp.getTime(),
                    jti: uuid.v4()
                };
                new Token(payload).save().then(()=>{
                    const token = jwt.sign(payload, jwtSecret);
                    resolve(token);
                }).catch(reject);
            }
        });
    },
    decode: function (token) {
        try{
            return jwt.verify(token, jwtSecret);
        }
        catch(e){
            return false;
        }
    },
    getTokenByReq: function (req) {
        const {query={}} = req;
        return query.token || req.get('token');
    },
    isExpired: function (payload) {
        return !DateUtil.isFuture(payload.exp);
    },
    genVipToken: function () {
        return uuid.v4();
    }
};
module.exports = TokenUtil;