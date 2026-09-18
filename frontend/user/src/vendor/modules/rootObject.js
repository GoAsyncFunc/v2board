var nodeGlobalObject = require("./nodeGlobalObject.js");
var browserGlobalObject = typeof self === "object" &&
  self &&
  self.Object === Object &&
  self;

module.exports = nodeGlobalObject || browserGlobalObject || Function("return this")();
