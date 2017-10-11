const mongoose = require("mongoose");
const CryptUtil = require("../utils/CryptUtil");
const DataUtil = require("../utils/DataUtil");

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
    findOneJson(query={}, projection={}, options={}){
        return DataUtil.findOneJson(this, query, projection, options);
    },
    findJson(query={}, projection={}, options={}){
        return DataUtil.findJson(this, query, projection, options);
    }
};
if(!mongoose.models.Token){
    mongoose.model('Token', Token);
}
module.exports = mongoose.model('Token');