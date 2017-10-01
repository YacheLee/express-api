/**
 * Created by Scott on 2016/9/27.
 */
const mongoose = require("mongoose");
const CryptUtil = require("../utils/CryptUtil");

const Token = new mongoose.Schema({
    _id: {
        type: String,
        default: CryptUtil.ObjectId()
    },
    user_id:String,
    sub: String,
    iat: Number,
    exp: Number,
    jti: String
});

Token.method({});

Token.statics = {
};
if(!mongoose.models.Token){
    mongoose.model('Token', Token);
}
module.exports = mongoose.model('Token');