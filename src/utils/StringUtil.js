const _ = require("lodash");

const UNDEFINED = "undefined";
const NULL = "null";

const StringUtil = {
    is_undefined_str: function(str=""){
        return str === UNDEFINED;
    },
    is_null_str: function(str=""){
        return str === NULL;
    },
    sterilize: function(str=""){
        if(!_.isString(str)){
            return str;
        }
        else if(_.isEmpty(str)){
            return null;
        }
        else if(StringUtil.is_undefined_str(str) || StringUtil.is_null_str(str)){
            return null;
        }
        else{
            return str;
        }
    },
    sterilizeOrder: function(order){
        if(_.isEmpty(order)){
            return order;
        }
        else{
            _.keys(order).forEach((key) => {
                const value = order[key];
                order[key] = this.sterilize(value);
            });
            return order;
        }
    },
    nullify_user: function(user){
        if(_.isEmpty(user)){
            return user;
        }
        else{
            _.keys(user).forEach((key) => {
                const value = user[key];
                if(StringUtil.is_undefined_str(value)){
                    user[key] = null;
                }
            });
            return user;
        }
    },
    is_true_str: function(str){
        if(!_.isString(str)){
            return false;
        }
        else{
            return str === "true";
        }
    },
    is_false_str: function(str){
        if(!_.isString(str)){
            return false;
        }
        else{
            return str === "false";
        }
    },
    compile: function(str, model){
        if(_.isEmpty(str)){
            return false;
        }
        else if(_.isEmpty(model) || !_.isObject(model)){
            return false;
        }
        else{
            _.keys(model).forEach((key) => {
                const val = model[key];
                str = str.replace(`{${key}}`, val);
            });
            return str;
        }
    },
    contains: function(str, str2, lower_case=true){
        if(_.isEmpty(str) || _.isEmpty(str2)){
            return false;
        }
        else{
            str = str.trim();
            str2 = str2.trim();
            if(_.isEmpty(str) || _.isEmpty(str2)){
                return false;
            }
            else if(lower_case){
                return str.toLowerCase().indexOf(str2.toLowerCase()) !== -1;
            }
            else{
                return str===str2;
            }
        }
    }
};
module.exports = StringUtil;