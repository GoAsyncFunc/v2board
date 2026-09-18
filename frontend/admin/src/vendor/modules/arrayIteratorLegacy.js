let legacyModule = module,
  legacyExports = exports;
var r = require("./noop.js"),
  i = require("./iteratorResult.js"),
  o = require("./53427545.js"),
  a = require("./toArray.js");
legacyModule.exports = require("./4d504670.js")(Array, "Array", function (e, t) {
  this._t = a(e), this._i = 0, this._k = t;
}, function () {
  var e = this._t,
    t = this._k,
    n = this._i++;
  return !e || n >= e.length ? (this._t = void 0, i(1)) : i(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]]);
}, "values"), o.Arguments = o.Array, r("keys"), r("values"), r("entries");
