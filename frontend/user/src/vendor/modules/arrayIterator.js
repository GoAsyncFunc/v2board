let legacyModule = module,
  legacyExports = exports;
var addToUnscopables = require("./addToUnscopables.js"),
  createIteratorResult = require("./iteratorResultLegacy.js"),
  emptyExports = require("./emptyExports.js"),
  toIndexedObject = require("./toIndexedObject.js");
legacyModule.exports = require("./58645054.js")(Array, "Array", function (iterable, kind) {
  this._t = toIndexedObject(iterable), this._i = 0, this._k = kind;
}, function () {
  var target = this._t,
    kind = this._k,
    index = this._i++;
  return !target || index >= target.length ? (this._t = void 0, createIteratorResult(1)) : createIteratorResult(0, "keys" == kind ? index : "values" == kind ? target[index] : [index, target[index]]);
}, "values"), emptyExports.Arguments = emptyExports.Array, addToUnscopables("keys"), addToUnscopables("values"), addToUnscopables("entries");
