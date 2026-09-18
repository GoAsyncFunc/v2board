let legacyModule = module,
  legacyExports = exports;
var r = {
    childContextTypes: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromProps: !0,
    mixins: !0,
    propTypes: !0,
    type: !0
  },
  o = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  },
  i = Object.defineProperty,
  a = Object.getOwnPropertyNames,
  s = Object.getOwnPropertySymbols,
  c = Object.getOwnPropertyDescriptor,
  u = Object.getPrototypeOf,
  l = u && u(Object);
function f(e, t, n) {
  if ("string" !== typeof t) {
    if (l) {
      var p = u(t);
      p && p !== l && f(e, p, n);
    }
    var d = a(t);
    s && (d = d.concat(s(t)));
    for (var h = 0; h < d.length; ++h) {
      var m = d[h];
      if (!r[m] && !o[m] && (!n || !n[m])) {
        var v = c(t, m);
        try {
          i(e, m, v);
        } catch (e) {}
      }
    }
    return e;
  }
  return e;
}
legacyModule.exports = f;
