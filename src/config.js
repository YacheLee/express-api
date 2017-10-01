"use strict";
const env = process.env.NODE_ENV;
let exported_config = {};
switch(env){
    case "development":
        exported_config = require("./config_dev");
        break;
    case "test":
        exported_config = require("./config_test");
        break;
    case "production":
        exported_config = require("./config_prod");
        break;
    default:
        exported_config = require("./config_dev");
        break;
}
module.exports = exported_config;