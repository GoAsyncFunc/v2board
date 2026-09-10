let legacyModule = module,
  legacyExports = exports;
var r = require("./544f7756.js"),
  o = {
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
  i = {
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
  c = {};
function u(e) {
  return r.isMemo(e) ? s : c[e["$$typeof"]] || o;
}
c[r.ForwardRef] = a, c[r.Memo] = s;
var l = Object.defineProperty,
  f = Object.getOwnPropertyNames,
  p = Object.getOwnPropertySymbols,
  d = Object.getOwnPropertyDescriptor,
  h = Object.getPrototypeOf,
  m = Object.prototype;
function v(e, t, n) {
  if ("string" !== typeof t) {
    if (m) {
      var r = h(t);
      r && r !== m && v(e, r, n);
    }
    var o = f(t);
    p && (o = o.concat(p(t)));
    for (var a = u(e), s = u(t), c = 0; c < o.length; ++c) {
      var y = o[c];
      if (!i[y] && (!n || !n[y]) && (!s || !s[y]) && (!a || !a[y])) {
        var g = d(t, y);
        try {
          l(e, y, g);
        } catch (e) {}
      }
    }
  }
  return e;
}
legacyModule.exports = v;
