"use strict";

var globalObject = require("./globalObjectLegacy.js");

module.exports = typeof globalObject === "object" &&
  globalObject &&
  globalObject.Object === Object &&
  globalObject;
