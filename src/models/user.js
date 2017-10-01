const mongoose = require("mongoose");
const {MALE, FEMALE} = require("../consts/Gender");
const CryptUtil = require("../utils/CryptUtil");

const User = new mongoose.Schema({
    _id: {
        type: String,
        default: CryptUtil.ObjectId()
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        default: MALE,
        enu: [MALE, FEMALE],
        required: false
    }
});

User.method({});
User.statics = { };

if(!mongoose.models.User){
    mongoose.model('User', User);
}
module.exports = mongoose.model('User');