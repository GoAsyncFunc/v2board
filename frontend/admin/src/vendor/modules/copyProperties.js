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
  i = {
    name: !0,
    length: !0,
    prototype: !0,
    caller: !0,
    callee: !0,
    arguments: !0,
    arity: !0
  },
  o = Object.defineProperty,
  a = Object.getOwnPropertyNames,
  s = Object.getOwnPropertySymbols,
  l = Object.getOwnPropertyDescriptor,
  c = Object.getPrototypeOf,
  u = c && c(Object);
function h(e, t, n) {
  if ("string" !== typeof t) {
    if (u) {
      var f = c(t);
      f && f !== u && h(e, f, n);
    }
    var d = a(t);
    s && (d = d.concat(s(t)));
    for (var p = 0; p < d.length; ++p) {
      var m = d[p];
      if (!r[m] && !i[m] && (!n || !n[m])) {
        var g = l(t, m);
        try {
          o(e, m, g);
        } catch (e) {}
      }
    }
    return e;
  }
  return e;
}
legacyModule.exports = h;
