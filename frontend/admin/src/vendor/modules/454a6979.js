let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = require("./462b326f.js"),
  i = l(r),
  o = require("./2b4a504c.js"),
  a = l(o),
  s = "function" === typeof a.default && "symbol" === typeof i.default ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof a.default && e.constructor === a.default && e !== a.default.prototype ? "symbol" : typeof e;
  };
function l(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
legacyExports.default = "function" === typeof a.default && "symbol" === s(i.default) ? function (e) {
  return "undefined" === typeof e ? "undefined" : s(e);
} : function (e) {
  return e && "function" === typeof a.default && e.constructor === a.default && e !== a.default.prototype ? "symbol" : "undefined" === typeof e ? "undefined" : s(e);
};
