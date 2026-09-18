let legacyModule = module,
  legacyExports = exports;
var r = require("./6c534344.js"),
  i = require("./45326a68.js"),
  o = require("./isObjectValue.js"),
  a = require("./sourceFunctionToString.js"),
  s = /[\\^$.*+?()[\]{}|]/g,
  l = /^\[object .+?Constructor\]$/,
  u = Function.prototype,
  c = Object.prototype,
  f = u.toString,
  d = c.hasOwnProperty,
  h = RegExp("^" + f.call(d).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function p(e) {
  if (!o(e) || i(e)) return !1;
  var t = r(e) ? h : l;
  return t.test(a(e));
}
legacyModule.exports = p;
