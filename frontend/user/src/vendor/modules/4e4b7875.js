let legacyModule = module,
  legacyExports = exports;
var r = require("./isFunction.js"),
  i = require("./isMasked.js"),
  a = require("./isObjectValue.js"),
  o = require("./sourceFunctionToString.js"),
  u = /[\\^$.*+?()[\]{}|]/g,
  l = /^\[object .+?Constructor\]$/,
  s = Function.prototype,
  c = Object.prototype,
  f = s.toString,
  d = c.hasOwnProperty,
  h = RegExp("^" + f.call(d).replace(u, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function p(e) {
  if (!a(e) || i(e)) return !1;
  var t = r(e) ? h : l;
  return t.test(o(e));
}
legacyModule.exports = p;
