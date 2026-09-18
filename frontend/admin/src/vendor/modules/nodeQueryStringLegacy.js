"use strict";

const decode = require("./queryStringDecodeLegacy.js");
const encode = require("./queryStringEncodeLegacy.js");

exports.decode = decode;
exports.parse = decode;
exports.encode = encode;
exports.stringify = encode;
