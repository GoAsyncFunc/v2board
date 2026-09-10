let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./462b326f.js"),
  o = c(r),
  i = require("./2b4a504c.js"),
  a = c(i),
  s = "function" === typeof a.default && "symbol" === typeof o.default ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof a.default && e.constructor === a.default && e !== a.default.prototype ? "symbol" : typeof e;
  };
function c(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = "function" === typeof a.default && "symbol" === s(o.default) ? function (e) {
  return "undefined" === typeof e ? "undefined" : s(e);
} : function (e) {
  return e && "function" === typeof a.default && e.constructor === a.default && e !== a.default.prototype ? "symbol" : "undefined" === typeof e ? "undefined" : s(e);
};
