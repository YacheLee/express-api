/**
 * Created by Scott on 2016/10/13.
 */
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
};
module.exports = DateUtil;