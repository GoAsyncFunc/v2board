let legacyModule = module,
  legacyExports = exports;
var r,
  o,
  i,
  a = require("./77487272.js"),
  s = require("./72725739.js"),
  c = require("./documentElement.js"),
  u = require("./53664447.js"),
  l = require("./globalObject.js"),
  f = l.process,
  p = l.setImmediate,
  d = l.clearImmediate,
  h = l.MessageChannel,
  m = l.Dispatch,
  v = 0,
  y = {},
  g = "onreadystatechange",
  b = function () {
    var e = +this;
    if (y.hasOwnProperty(e)) {
      var t = y[e];
      delete y[e], t();
    }
  },
  w = function (e) {
    b.call(e.data);
  };
p && d || (p = function (e) {
  var t = [],
    n = 1;
  while (arguments.length > n) t.push(arguments[n++]);
  return y[++v] = function () {
    s("function" == typeof e ? e : Function(e), t);
  }, r(v), v;
}, d = function (e) {
  delete y[e];
}, "process" == require("./rawClassNameLegacy.js")(f) ? r = function (e) {
  f.nextTick(a(b, e, 1));
} : m && m.now ? r = function (e) {
  m.now(a(b, e, 1));
} : h ? (o = new h(), i = o.port2, o.port1.onmessage = w, r = a(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function (e) {
  l.postMessage(e + "", "*");
}, l.addEventListener("message", w, !1)) : r = g in u("script") ? function (e) {
  c.appendChild(u("script"))[g] = function () {
    c.removeChild(this), b.call(e);
  };
} : function (e) {
  setTimeout(a(b, e, 1), 0);
}), legacyModule.exports = {
  set: p,
  clear: d
};
