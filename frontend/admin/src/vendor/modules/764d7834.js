let legacyModule = module,
  legacyExports = exports;
var r,
  i,
  o,
  a = require("./77487272.js"),
  s = require("./72725739.js"),
  l = require("./58493664.js"),
  c = require("./53664447.js"),
  u = require("./63304f79.js"),
  h = u.process,
  f = u.setImmediate,
  d = u.clearImmediate,
  p = u.MessageChannel,
  m = u.Dispatch,
  g = 0,
  v = {},
  y = "onreadystatechange",
  b = function () {
    var e = +this;
    if (v.hasOwnProperty(e)) {
      var t = v[e];
      delete v[e], t();
    }
  },
  w = function (e) {
    b.call(e.data);
  };
f && d || (f = function (e) {
  var t = [],
    n = 1;
  while (arguments.length > n) t.push(arguments[n++]);
  return v[++g] = function () {
    s("function" == typeof e ? e : Function(e), t);
  }, r(g), g;
}, d = function (e) {
  delete v[e];
}, "process" == require("./32776532.js")(h) ? r = function (e) {
  h.nextTick(a(b, e, 1));
} : m && m.now ? r = function (e) {
  m.now(a(b, e, 1));
} : p ? (i = new p(), o = i.port2, i.port1.onmessage = w, r = a(o.postMessage, o, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (r = function (e) {
  u.postMessage(e + "", "*");
}, u.addEventListener("message", w, !1)) : r = y in c("script") ? function (e) {
  l.appendChild(c("script"))[y] = function () {
    l.removeChild(this), b.call(e);
  };
} : function (e) {
  setTimeout(a(b, e, 1), 0);
}), legacyModule.exports = {
  set: f,
  clear: d
};
