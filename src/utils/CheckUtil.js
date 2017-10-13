const _ = require("lodash");
const JSONError = require("../errors/JSONError");
const isEmail = require("isemail");
const CryptUtil = require("./CryptUtil");
const {unauthenticated, password_length_is_not_valid, server_error, password_is_empty, email_is_empty, email_format_is_not_valid ,user_does_not_exist} = require("../consts/Exception");

const CheckUtil = {
    check_empty: function(obj, error=server_error){
        return new Promise((resolve, reject)=>{
            if (_.isEmpty(obj)) {
                reject(new JSONError(error));
            }
            else {
                resolve(obj);
            }
        });
    },
    is_user_empty: function (user) {
        return _.isEmpty(user) || _.isEmpty(user._id);
    },
    check_user: function(user){
        return new Promise((resolve, reject)=>{
            if(CheckUtil.is_user_empty(user)){
                reject(new JSONError(user_does_not_exist));
            }
            else{
                resolve(user);
            }
        });
    },
    check_email_empty: function(email){
        return CheckUtil.check_empty(email, email_is_empty);
    },
    check_email_format: function(email){
        if(!isEmail.validate(email)){
            return Promise.reject(new JSONError(email_format_is_not_valid));
        }
        else{
            return Promise.resolve(email);
        }
    },
    check_email_empty_and_format: function(email){
        return CheckUtil.check_email_empty(email)
            .then(CheckUtil.check_email_format);
    },
    check_password_empty:function(password){
        return CheckUtil.check_empty(password, password_is_empty);
    },
    check_password_length: function(password){
        if (password.length < 6) {
            return Promise.reject(new JSONError(password_length_is_not_valid, 6));
        }
        else{
            return Promise.resolve(password);
        }
    },
    check_password_empty_and_length: function(password){
        return CheckUtil.check_password_empty(password)
            .then(CheckUtil.check_password_length);
    },
    check_is_match_password_with_db_password: function(password, db_user_password){
        if (!CryptUtil.isMatchPasswordWithDbPassword(password, db_user_password)) {
            return Promise.reject(new JSONError(unauthenticated));
        }
        else {
            return Promise.resolve({password, db_user_password});
        }
    }
};
module.exports = CheckUtil;