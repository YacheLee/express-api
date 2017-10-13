const _ = require("lodash");
const moment = require("moment-timezone");
const {time_zone} = require('../config');

const DateUtil = {
    now: function (){
        return moment(new Date()).tz(time_zone).toDate();
    },
    isFuture:function(date){
        return moment(date).tz(time_zone).toDate()>=new Date();
    },
    addDay:function(date, day=10){
        return moment(moment(date).add(day, 'days')).tz("Asia/Taipei").toDate();
    },
    str_to_range: function(str){
        if (!_.isEmpty(str) && str.split(" - ").length === 2) {
            const arr = str.split(" - ");
            const start_str = arr[0];
            const end_str = arr[1];
            const start_date = new Date(start_str);
            const end_date = new Date(end_str);
            const $gte = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
            const $lt = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate(),23,59,59);
            return { $gte, $lt };
        }
        return null;
    }
};
module.exports = DateUtil;