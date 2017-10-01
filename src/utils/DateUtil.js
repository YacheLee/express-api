/**
 * Created by Scott on 2016/10/13.
 */
const _ = require("lodash");
const moment = require("moment-timezone");
const dateTime = require('node-datetime');
const {time_zone} = require('../config');

const DateUtil = {
    now: function (){
        return moment(new Date()).tz(time_zone).toDate();
    },
    format:function (date,format='Ymd') {
        return dateTime.create(date).format(format);
    },
    toString: function (date) {
        return date !== null ? moment(date).tz(time_zone).format() : null;
    },
    addDay:function(date, day=10){
        return moment(moment(date).add(day, 'days')).tz("Asia/Taipei").toDate();
    },
};
module.exports = DateUtil;