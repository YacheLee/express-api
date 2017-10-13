const mongoose = require("mongoose");
const CryptUtil = require("../utils/CryptUtil");
const DataUtil = require("../utils/DataUtil");

const Post = new mongoose.Schema({
    _id: {
        type: String,
        default: CryptUtil.ObjectId()
    },
    title: String,
    body: String
});

Post.method({});
Post.statics = {
    findOneJson(query={}, projection={}, options={}){
        return DataUtil.findOneJson(this, query, projection, options);
    },
    findJson(query={}, projection={}, options={}){
        return DataUtil.findJson(this, query, projection, options);
    }
};

if(!mongoose.models.Post){
    mongoose.model('Post', Post);
}
module.exports = mongoose.model('Post');