let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Object.prototype.hasOwnProperty,
  o = Object.prototype.toString,
  i = function () {
    try {
      return !!Object.defineProperty({}, "a", {});
    } catch (e) {
      return !1;
    }
  }(),
  a = (!i && Object.prototype.__defineGetter__, i ? Object.defineProperty : function (e, t, n) {
    "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.call(e, t) || "value" in n) && (e[t] = n.value);
  });
legacyExports.defineProperty = a;
var s = Object.create || function (e, t) {
  var n, o;
  function i() {}
  for (o in i.prototype = e, n = new i(), t) r.call(t, o) && a(n, o, t[o]);
  return n;
};
legacyExports.objCreate = s;
var c = Array.prototype.indexOf || function (e, t) {
  var n = this;
  if (!n.length) return -1;
  for (var r = t || 0, o = n.length; r < o; r++) if (n[r] === e) return r;
  return -1;
};
legacyExports.arrIndexOf = c;
var u = Array.isArray || function (e) {
  return "[object Array]" === o.call(e);
};
legacyExports.isArray = u;
var l = Date.now || function () {
  return new Date().getTime();
};
legacyExports.dateNow = l;
