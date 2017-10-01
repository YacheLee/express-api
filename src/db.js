/**
 * Created by Scott on 2016/10/13.
 */
"use strict";
const Promise  = require("bluebird");
const mongoose  = require("mongoose");
const config  = require("./config");
let isConnected = false;
const init = ()=> {
    return new Promise((resolve)=> {
        if(!isConnected){
            global.Promise = Promise;
            Promise.promisifyAll(mongoose);
            global.mongoose = mongoose;
            mongoose.Promise = Promise;
            mongoose.connect(config.db, {server: {socketOptions: {keepAlive: 1}}},resolve);
            mongoose.connection
                .on("open",()=>{console.log("Connect!"); })
                .on("close",()=>{console.log("Closed!"); isConnected=false;})
                .on('error', () => {
                    throw new Error(`unable to connect to database: ${config.db}`);
                });
            isConnected=true;
        }
        else{
            resolve();
        }
    });
};
const close = ()=> {
    if(isConnected){
        mongoose.models = {};
        mongoose.modelSchemas = {};
        mongoose.connection.close();
    }
};
module.exports = {
    init,
    close
};