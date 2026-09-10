let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "BrowserRouter", function () {
  return f;
}), defineExport(legacyExports, "HashRouter", function () {
  return d;
}), defineExport(legacyExports, "Link", function () {
  return b;
}), defineExport(legacyExports, "NavLink", function () {
  return S;
});
var r = require("./43785865.js");
defineExport(legacyExports, "MemoryRouter", function () {
  return r["a"];
}), defineExport(legacyExports, "Prompt", function () {
  return r["b"];
}), defineExport(legacyExports, "Redirect", function () {
  return r["c"];
}), defineExport(legacyExports, "Route", function () {
  return r["d"];
}), defineExport(legacyExports, "Router", function () {
  return r["e"];
}), defineExport(legacyExports, "StaticRouter", function () {
  return r["f"];
}), defineExport(legacyExports, "Switch", function () {
  return r["g"];
}), defineExport(legacyExports, "__RouterContext", function () {
  return r["h"];
}), defineExport(legacyExports, "generatePath", function () {
  return r["i"];
}), defineExport(legacyExports, "matchPath", function () {
  return r["j"];
}), defineExport(legacyExports, "useHistory", function () {
  return r["k"];
}), defineExport(legacyExports, "useLocation", function () {
  return r["l"];
}), defineExport(legacyExports, "useParams", function () {
  return r["m"];
}), defineExport(legacyExports, "useRouteMatch", function () {
  return r["n"];
}), defineExport(legacyExports, "withRouter", function () {
  return r["o"];
});
var i = require("./6f685056.js"),
  a = require("./71317449.js"),
  o = interopDefault(a),
  u = require("./67304d50.js"),
  l = require("./45567149.js"),
  s = require("./4d576753.js"),
  c = require("./39523934.js"),
  f = function (e) {
    function t() {
      for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      return t = e.call.apply(e, [this].concat(r)) || this, t.history = Object(u["a"])(t.props), t;
    }
    Object(i["a"])(t, e);
    var n = t.prototype;
    return n.render = function () {
      return o.a.createElement(r["e"], {
        history: this.history,
        children: this.props.children
      });
    }, t;
  }(o.a.Component);
var d = function (e) {
  function t() {
    for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
    return t = e.call.apply(e, [this].concat(r)) || this, t.history = Object(u["b"])(t.props), t;
  }
  Object(i["a"])(t, e);
  var n = t.prototype;
  return n.render = function () {
    return o.a.createElement(r["e"], {
      history: this.history,
      children: this.props.children
    });
  }, t;
}(o.a.Component);
var h = function (e, t) {
    return "function" === typeof e ? e(t) : e;
  },
  p = function (e, t) {
    return "string" === typeof e ? Object(u["c"])(e, null, null, t) : e;
  },
  m = function (e) {
    return e;
  },
  v = o.a.forwardRef;
function g(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
"undefined" === typeof v && (v = m);
var y = v(function (e, t) {
  var n = e.innerRef,
    r = e.navigate,
    i = e.onClick,
    a = Object(s["a"])(e, ["innerRef", "navigate", "onClick"]),
    u = a.target,
    c = Object(l["a"])({}, a, {
      onClick: function (e) {
        try {
          i && i(e);
        } catch (t) {
          throw e.preventDefault(), t;
        }
        e.defaultPrevented || 0 !== e.button || u && "_self" !== u || g(e) || (e.preventDefault(), r());
      }
    });
  return c.ref = m !== v && t || n, o.a.createElement("a", c);
});
var b = v(function (e, t) {
    var n = e.component,
      i = void 0 === n ? y : n,
      a = e.replace,
      u = e.to,
      f = e.innerRef,
      d = Object(s["a"])(e, ["component", "replace", "to", "innerRef"]);
    return o.a.createElement(r["h"].Consumer, null, function (e) {
      e || Object(c["a"])(!1);
      var n = e.history,
        r = p(h(u, e.location), e.location),
        s = r ? n.createHref(r) : "",
        g = Object(l["a"])({}, d, {
          href: s,
          navigate: function () {
            var t = h(u, e.location),
              r = a ? n.replace : n.push;
            r(t);
          }
        });
      return m !== v ? g.ref = t || f : g.innerRef = f, o.a.createElement(i, g);
    });
  }),
  _ = function (e) {
    return e;
  },
  w = o.a.forwardRef;
function k() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return t.filter(function (e) {
    return e;
  }).join(" ");
}
"undefined" === typeof w && (w = _);
var S = w(function (e, t) {
  var n = e["aria-current"],
    i = void 0 === n ? "page" : n,
    a = e.activeClassName,
    u = void 0 === a ? "active" : a,
    f = e.activeStyle,
    d = e.className,
    m = e.exact,
    v = e.isActive,
    g = e.location,
    y = e.strict,
    S = e.style,
    x = e.to,
    T = e.innerRef,
    E = Object(s["a"])(e, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);
  return o.a.createElement(r["h"].Consumer, null, function (e) {
    e || Object(c["a"])(!1);
    var n = g || e.location,
      a = p(h(x, n), n),
      s = a.pathname,
      M = s && s.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
      C = M ? Object(r["j"])(n.pathname, {
        path: M,
        exact: m,
        strict: y
      }) : null,
      O = !!(v ? v(C, n) : C),
      D = O ? k(d, u) : d,
      P = O ? Object(l["a"])({}, S, {}, f) : S,
      N = Object(l["a"])({
        "aria-current": O && i || null,
        className: D,
        style: P,
        to: a
      }, E);
    return _ !== w ? N.ref = t || T : N.innerRef = T, o.a.createElement(b, N);
  });
});
