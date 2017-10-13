const _ = require("lodash");
const DateUtil = require("./DateUtil");
const StringUtil = require("./StringUtil");
const number_sign = "$__";
const period_sign = "_$";

const QueryUtil = {
    filter: function(query={}, is_remove_type=true){
        delete query.token;
        delete query.count;
        delete query.page;
        if(is_remove_type){
            delete query.type;
        }
        const _query = {};

        const period_date_map = {};
        _.keys(query).forEach((key)=> {
            if(key.indexOf(period_sign)!==-1){
                const value = query[key];
                period_date_map[key] = value;
                delete query[key];
            }
        });

        _.keys(query).forEach((key)=> {
            const value = query[key];
            if(!_.isEmpty(value)){
                if(_.isObject(value)){
                    _query[key] = value;
                }
                else if (!_.isEmpty(value) && !StringUtil.contains(value,"*")) {
                    const isDate = value.indexOf("GMT")!==-1;
                    const isRange = value.indexOf(" - ")!==-1;
                    const isAbsolute = value.indexOf("|")===0;
                    const isNumber = value.indexOf(number_sign)===0;
                    let _value = {
                        $regex: new RegExp(value, "ig")
                    };
                    if(key==="_id" || key==="user_id"){
                        _value = value;
                    }
                    else if(isAbsolute){
                        _value = value.split("|")[1];
                    }
                    else if(isNumber){
                        _value = parseFloat(value.split(number_sign)[1]);
                    }
                    else if(value==="true" || value==="false"){
                        _value = value === "true";
                    }
                    else if(isDate){
                        const date = new Date(value);
                        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                        const to = new Date(date.getFullYear(), date.getMonth(), date.getDate(),23,59,59);
                        _value = {
                            $gte: from,
                            $lt: to
                        };
                    }
                    else if(isRange){
                        _value = DateUtil.str_to_range(value);
                    }
                    if(value==="null"){
                        _value = null;
                    }
                    else if(value==="!=null"){
                        _value = {
                            $ne: null
                        };
                    }
                    _query[key] = _value;
                }
            }
        });

        _.keys(period_date_map).forEach((key) => {
            const root_key = key.split(period_sign)[0];
            const value = period_date_map[key];
            const isDate = value.indexOf("GMT")!==-1;
            if(isDate){
                const date = new Date(value);
                const is_gte = key.indexOf("$gte")!==-1;
                const is_lt = key.indexOf("$lt")!==-1;
                if(!_query[root_key]){
                    _query[root_key] = {};
                }
                if(is_gte){
                    const $gte = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    _query[root_key].$gte = $gte;
                }
                else if(is_lt) {
                    const $lt = new Date(date.getFullYear(), date.getMonth(), date.getDate(),23,59,59);
                    _query[root_key].$lt = $lt;
                }
            }
        });
        return _query;
    }
};
module.exports = QueryUtil;