"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let dbURL;
if (process.env.NODE_ENV == 'production')
    dbURL = require('./prod');
else
    dbURL = require('./dev');
exports.default = {
    dbURL,
};
