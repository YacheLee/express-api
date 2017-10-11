const _ = require("lodash");
const {server_error} = require("../consts/Exception");
const JSONError = require("../errors/JSONError");

const DataUtil = {
    findOneJson:function(model, query={}, projection={}, options={}){
        if(!model){
            return Promise.reject(new JSONError(server_error));
        }else{
            return model.findOne(query, projection, options).lean().execAsync();
        }
    },
    findJson: function(model, query={}, projection={}, options={}){
        if(!model){
            return Promise.reject(new JSONError(server_error));
        }
        else{
            const _query = model.find(query, projection, options);
            const {page, count} = options;
            if(_.isNumber(page) && _.isNumber(count)){
                _query.paginate(page, count);
            }
            return _query.lean().execAsync();
        }
    }
};
module.exports = DataUtil;