let legacyModule = module,
  legacyExports = exports;
var r = require("./reactIsLegacyEntry.js"),
  i = {
    childContextTypes: !0,
    contextType: !0,
    contextTypes: !0,
    defaultProps: !0,
    displayName: !0,
    getDefaultProps: !0,
    getDerivedStateFromError: !0,
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
  a = {
    $$typeof: !0,
    render: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0
  },
  s = {
    $$typeof: !0,
    compare: !0,
    defaultProps: !0,
    displayName: !0,
    propTypes: !0,
    type: !0
  },
  l = {};
function c(e) {
  return r.isMemo(e) ? s : l[e["$$typeof"]] || i;
}
l[r.ForwardRef] = a, l[r.Memo] = s;
var u = Object.defineProperty,
  h = Object.getOwnPropertyNames,
  f = Object.getOwnPropertySymbols,
  d = Object.getOwnPropertyDescriptor,
  p = Object.getPrototypeOf,
  m = Object.prototype;
function g(e, t, n) {
  if ("string" !== typeof t) {
    if (m) {
      var r = p(t);
      r && r !== m && g(e, r, n);
    }
    var i = h(t);
    f && (i = i.concat(f(t)));
    for (var a = c(e), s = c(t), l = 0; l < i.length; ++l) {
      var v = i[l];
      if (!o[v] && (!n || !n[v]) && (!s || !s[v]) && (!a || !a[v])) {
        var y = d(t, v);
        try {
          u(e, v, y);
        } catch (e) {}
      }
    }
  }
  return e;
}
legacyModule.exports = g;
