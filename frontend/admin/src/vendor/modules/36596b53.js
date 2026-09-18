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
  return O;
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
  o = require("./reactRuntime.js"),
  a = interopDefault(o),
  s = require("./historyRuntime.js"),
  l = require("./45567149.js"),
  u = require("./4d576753.js"),
  c = require("./39523934.js"),
  f = function (e) {
    function t() {
      for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
      return t = e.call.apply(e, [this].concat(r)) || this, t.history = Object(s["a"])(t.props), t;
    }
    Object(i["a"])(t, e);
    var n = t.prototype;
    return n.render = function () {
      return a.a.createElement(r["e"], {
        history: this.history,
        children: this.props.children
      });
    }, t;
  }(a.a.Component);
var d = function (e) {
  function t() {
    for (var t, n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
    return t = e.call.apply(e, [this].concat(r)) || this, t.history = Object(s["b"])(t.props), t;
  }
  Object(i["a"])(t, e);
  var n = t.prototype;
  return n.render = function () {
    return a.a.createElement(r["e"], {
      history: this.history,
      children: this.props.children
    });
  }, t;
}(a.a.Component);
var h = function (e, t) {
    return "function" === typeof e ? e(t) : e;
  },
  p = function (e, t) {
    return "string" === typeof e ? Object(s["c"])(e, null, null, t) : e;
  },
  g = function (e) {
    return e;
  },
  m = a.a.forwardRef;
function v(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
"undefined" === typeof m && (m = g);
var y = m(function (e, t) {
  var n = e.innerRef,
    r = e.navigate,
    i = e.onClick,
    o = Object(u["a"])(e, ["innerRef", "navigate", "onClick"]),
    s = o.target,
    c = Object(l["a"])({}, o, {
      onClick: function (e) {
        try {
          i && i(e);
        } catch (t) {
          throw e.preventDefault(), t;
        }
        e.defaultPrevented || 0 !== e.button || s && "_self" !== s || v(e) || (e.preventDefault(), r());
      }
    });
  return c.ref = g !== m && t || n, a.a.createElement("a", c);
});
var b = m(function (e, t) {
    var n = e.component,
      i = void 0 === n ? y : n,
      o = e.replace,
      s = e.to,
      f = e.innerRef,
      d = Object(u["a"])(e, ["component", "replace", "to", "innerRef"]);
    return a.a.createElement(r["h"].Consumer, null, function (e) {
      e || Object(c["a"])(!1);
      var n = e.history,
        r = p(h(s, e.location), e.location),
        u = r ? n.createHref(r) : "",
        v = Object(l["a"])({}, d, {
          href: u,
          navigate: function () {
            var t = h(s, e.location),
              r = o ? n.replace : n.push;
            r(t);
          }
        });
      return g !== m ? v.ref = t || f : v.innerRef = f, a.a.createElement(i, v);
    });
  }),
  x = function (e) {
    return e;
  },
  _ = a.a.forwardRef;
function w() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  return t.filter(function (e) {
    return e;
  }).join(" ");
}
"undefined" === typeof _ && (_ = x);
var O = _(function (e, t) {
  var n = e["aria-current"],
    i = void 0 === n ? "page" : n,
    o = e.activeClassName,
    s = void 0 === o ? "active" : o,
    f = e.activeStyle,
    d = e.className,
    g = e.exact,
    m = e.isActive,
    v = e.location,
    y = e.strict,
    O = e.style,
    S = e.to,
    k = e.innerRef,
    j = Object(u["a"])(e, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);
  return a.a.createElement(r["h"].Consumer, null, function (e) {
    e || Object(c["a"])(!1);
    var n = v || e.location,
      o = p(h(S, n), n),
      u = o.pathname,
      M = u && u.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1"),
      C = M ? Object(r["j"])(n.pathname, {
        path: M,
        exact: g,
        strict: y
      }) : null,
      T = !!(m ? m(C, n) : C),
      I = T ? w(d, s) : d,
      D = T ? Object(l["a"])({}, O, {}, f) : O,
      A = Object(l["a"])({
        "aria-current": T && i || null,
        className: I,
        style: D,
        to: o
      }, j);
    return x !== _ ? A.ref = t || k : A.innerRef = k, a.a.createElement(b, A);
  });
});
