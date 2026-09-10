let legacyModule = module,
  legacyExports = exports;
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = Object.prototype.hasOwnProperty,
  i = Object.prototype.toString,
  o = function () {
    try {
      return !!Object.defineProperty({}, "a", {});
    } catch (e) {
      return !1;
    }
  }(),
  a = (!o && Object.prototype.__defineGetter__, o ? Object.defineProperty : function (e, t, n) {
    "get" in n && e.__defineGetter__ ? e.__defineGetter__(t, n.get) : (!r.call(e, t) || "value" in n) && (e[t] = n.value);
  });
legacyExports.defineProperty = a;
var s = Object.create || function (e, t) {
  var n, i;
  function o() {}
  for (i in o.prototype = e, n = new o(), t) r.call(t, i) && a(n, i, t[i]);
  return n;
};
legacyExports.objCreate = s;
var l = Array.prototype.indexOf || function (e, t) {
  var n = this;
  if (!n.length) return -1;
  for (var r = t || 0, i = n.length; r < i; r++) if (n[r] === e) return r;
  return -1;
};
legacyExports.arrIndexOf = l;
var c = Array.isArray || function (e) {
  return "[object Array]" === i.call(e);
};
legacyExports.isArray = c;
var u = Date.now || function () {
  return new Date().getTime();
};
legacyExports.dateNow = u;
