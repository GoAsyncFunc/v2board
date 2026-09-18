let legacyModule = module,
  legacyExports = exports;
legacyExports.__esModule = !0;
var r = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  i = require("./noopLegacy.js"),
  o = d(i),
  a = require("./514c6150.js"),
  s = d(a),
  l = require("./locationRuntime.js"),
  c = require("./4677725a.js"),
  u = require("./5236342b.js"),
  h = d(u),
  f = require("./79566c61.js");
function d(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var p = "hashchange",
  m = {
    hashbang: {
      encodePath: function (e) {
        return "!" === e.charAt(0) ? e : "!/" + (0, c.stripLeadingSlash)(e);
      },
      decodePath: function (e) {
        return "!" === e.charAt(0) ? e.substr(1) : e;
      }
    },
    noslash: {
      encodePath: c.stripLeadingSlash,
      decodePath: c.addLeadingSlash
    },
    slash: {
      encodePath: c.addLeadingSlash,
      decodePath: c.addLeadingSlash
    }
  },
  g = function () {
    var e = window.location.href,
      t = e.indexOf("#");
    return -1 === t ? "" : e.substring(t + 1);
  },
  v = function (e) {
    return window.location.hash = e;
  },
  y = function (e) {
    var t = window.location.href.indexOf("#");
    window.location.replace(window.location.href.slice(0, t >= 0 ? t : 0) + "#" + e);
  },
  b = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    (0, s.default)(f.canUseDOM, "Hash history needs a DOM");
    var t = window.history,
      n = (0, f.supportsGoWithoutReloadUsingHash)(),
      i = e.getUserConfirmation,
      a = void 0 === i ? f.getConfirmation : i,
      u = e.hashType,
      d = void 0 === u ? "slash" : u,
      b = e.basename ? (0, c.stripTrailingSlash)((0, c.addLeadingSlash)(e.basename)) : "",
      w = m[d],
      x = w.encodePath,
      _ = w.decodePath,
      E = function () {
        var e = _(g());
        return (0, o.default)(!b || (0, c.hasBasename)(e, b), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + b + '".'), b && (e = (0, c.stripBasename)(e, b)), (0, l.createLocation)(e);
      },
      S = (0, h.default)(),
      k = function (e) {
        r(G, e), G.length = t.length, S.notifyListeners(G.location, G.action);
      },
      C = !1,
      O = null,
      T = function () {
        var e = g(),
          t = x(e);
        if (e !== t) y(t);else {
          var n = E(),
            r = G.location;
          if (!C && (0, l.locationsAreEqual)(r, n)) return;
          if (O === (0, c.createPath)(n)) return;
          O = null, L(n);
        }
      },
      L = function (e) {
        if (C) C = !1, k();else {
          var t = "POP";
          S.confirmTransitionTo(e, t, a, function (n) {
            n ? k({
              action: t,
              location: e
            }) : A(e);
          });
        }
      },
      A = function (e) {
        var t = G.location,
          n = R.lastIndexOf((0, c.createPath)(t));
        -1 === n && (n = 0);
        var r = R.lastIndexOf((0, c.createPath)(e));
        -1 === r && (r = 0);
        var i = n - r;
        i && (C = !0, $(i));
      },
      P = g(),
      j = x(P);
    P !== j && y(j);
    var M = E(),
      R = [(0, c.createPath)(M)],
      N = function (e) {
        return "#" + x(b + (0, c.createPath)(e));
      },
      D = function (e, t) {
        (0, o.default)(void 0 === t, "Hash history cannot push state; it is ignored");
        var n = "PUSH",
          r = (0, l.createLocation)(e, void 0, void 0, G.location);
        S.confirmTransitionTo(r, n, a, function (e) {
          if (e) {
            var t = (0, c.createPath)(r),
              i = x(b + t),
              a = g() !== i;
            if (a) {
              O = t, v(i);
              var s = R.lastIndexOf((0, c.createPath)(G.location)),
                l = R.slice(0, -1 === s ? 0 : s + 1);
              l.push(t), R = l, k({
                action: n,
                location: r
              });
            } else (0, o.default)(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), k();
          }
        });
      },
      I = function (e, t) {
        (0, o.default)(void 0 === t, "Hash history cannot replace state; it is ignored");
        var n = "REPLACE",
          r = (0, l.createLocation)(e, void 0, void 0, G.location);
        S.confirmTransitionTo(r, n, a, function (e) {
          if (e) {
            var t = (0, c.createPath)(r),
              i = x(b + t),
              o = g() !== i;
            o && (O = t, y(i));
            var a = R.indexOf((0, c.createPath)(G.location));
            -1 !== a && (R[a] = t), k({
              action: n,
              location: r
            });
          }
        });
      },
      $ = function (e) {
        (0, o.default)(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e);
      },
      F = function () {
        return $(-1);
      },
      B = function () {
        return $(1);
      },
      V = 0,
      W = function (e) {
        V += e, 1 === V ? window.addEventListener(p, T) : 0 === V && window.removeEventListener(p, T);
      },
      H = !1,
      U = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = S.setPrompt(e);
        return H || (W(1), H = !0), function () {
          return H && (H = !1, W(-1)), t();
        };
      },
      z = function (e) {
        var t = S.appendListener(e);
        return W(1), function () {
          W(-1), t();
        };
      },
      G = {
        length: t.length,
        action: "POP",
        location: M,
        createHref: N,
        push: D,
        replace: I,
        go: $,
        goBack: F,
        goForward: B,
        block: U,
        listen: z
      };
    return G;
  };
legacyExports.default = b;
