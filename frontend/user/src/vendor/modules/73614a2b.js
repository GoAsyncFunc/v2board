let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function o(e, t) {
  "function" === typeof e ? e(t) : "object" === r(e) && e && "current" in e && (e.current = t);
}
function i() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return function (e) {
    t.forEach(function (t) {
      o(t, e);
    });
  };
}
function a(e) {
  return !(e.type && e.type.prototype && !e.type.prototype.render) && !("function" === typeof e && e.prototype && !e.prototype.render);
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports.fillRef = o, legacyExports.composeRef = i, legacyExports.supportRef = a;
