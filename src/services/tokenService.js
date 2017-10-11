const _ = require("lodash");
const {Token, User} = require("../models");
const JSONError = require("../errors/JSONError");
const {user_does_not_exist, login_failed} = require("../consts/Exception");
const TokenUtil = require("../utils/TokenUtil");
const CheckUtil = require("../utils/CheckUtil");
const {testing_token} = require("../config");

function findUserByToken(token){
    if(token===testing_token){
        return User.findOne({email:"test@dentaltw.com"});
    }
    else{
        const token_payload = TokenUtil.decode(token);
        if(!token_payload){
            return Promise.reject(new JSONError(login_failed));
        }
        else{
            const {_id, user_id} = token_payload;
            return Token.findOneJson({_id}).then((token)=> {
                if (_.isEmpty(token)) {
                    return Promise.reject(new JSONError(login_failed));
                }
                else{
                    const isExpired = TokenUtil.isExpired(token);
                    if(isExpired){
                        return Promise.reject(new JSONError(login_failed));
                    }
                    else{
                        return User.findOneJson({_id: user_id})
                            .then(user=>CheckUtil.check_empty(user, user_does_not_exist));
                    }
                }
            });
        }
    }
}

module.exports = {findUserByToken};