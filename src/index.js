"use strict";
const db = require("./db");
const config = require("./config");
const DateUtil = require("./utils/DateUtil");
const http = require('http');

console.log(config.env);
console.log(DateUtil.now().toLocaleString());
const port = config.port;
db.init()
    .then(() => {
        const app = require("./express");
        const server = http.Server(app);
        server.listen(port, () => {
            console.log(port, 'ok');
        });
    });