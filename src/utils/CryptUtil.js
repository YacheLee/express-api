const crypto = require("crypto");
const uuid = require("node-uuid");
const bson = require("bson");
const {salt} = require("../config");

const CryptUtil = {
    encodePassword: function(password){
        if (password) {
            return CryptUtil.md5(password + salt);
        }
    },
    isMatchPasswordWithDbPassword: function(plainPassword, dbPassword){
        return CryptUtil.md5(plainPassword + salt) === dbPassword;
    },
    md5: function(str){
        if (str) {
            return crypto.createHash('md5').update(str).digest("hex");
        }
        else {
            return new Error();
        }
    },
    ObjectId: function(){
        return new bson.ObjectID().toString();
    }
};
module.exports = CryptUtil;