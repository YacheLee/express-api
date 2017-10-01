const _ = require("lodash");
const {User} = require("../models");
const {email_is_duplicated} = require("../consts/Exception");
const JSONError = require("../errors/JSONError");
const TokenUtil = require("../utils/TokenUtil");
const CheckUtil = require("../utils/CheckUtil");
const CryptUtil = require("../utils/CryptUtil");

function login_by_email_and_password(email, password) {
    return CheckUtil.check_email_empty_and_format(email)
        .then(e=>CheckUtil.check_password_empty_and_length(password))
        .then(e=>User.findOne({email}))
        .then(CheckUtil.check_user)
        .then((user)=>{
            return CheckUtil.check_is_match_password_with_db_password(password, user.password)
                .then(e=>TokenUtil.encode(user));
        })
}

function register(email, password){
    return CheckUtil.check_email_empty_and_format(email)
        .then(e => CheckUtil.check_password_empty_and_length(password))
        .then(e => User.findOne({email}))
        .then((user) => {
            if(!_.isEmpty(user)){
                return Promise.reject(new JSONError(email_is_duplicated));
            }
            else{
                const encoded_password = CryptUtil.encodePassword(password);
                const name = email;
                user = {
                    _id: CryptUtil.ObjectId(),
                    email,
                    name,
                    password:encoded_password,
                };
                return User.create(user).then(e=>TokenUtil.encode(user));
            }
        })
}

const authService = module.exports = {login_by_email_and_password, register};