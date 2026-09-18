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
  o = require("./noopLegacy.js"),
  i = d(o),
  a = require("./invariant.js"),
  s = d(a),
  c = require("./locationRuntime.js"),
  u = require("./historyPathUtils.js"),
  l = require("./5236342b.js"),
  f = d(l),
  p = require("./79566c61.js");
function d(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
var h = "hashchange",
  m = {
    hashbang: {
      encodePath: function (e) {
        return "!" === e.charAt(0) ? e : "!/" + (0, u.stripLeadingSlash)(e);
      },
      decodePath: function (e) {
        return "!" === e.charAt(0) ? e.substr(1) : e;
      }
    },
    noslash: {
      encodePath: u.stripLeadingSlash,
      decodePath: u.addLeadingSlash
    },
    slash: {
      encodePath: u.addLeadingSlash,
      decodePath: u.addLeadingSlash
    }
  },
  v = function () {
    var e = window.location.href,
      t = e.indexOf("#");
    return -1 === t ? "" : e.substring(t + 1);
  },
  y = function (e) {
    return window.location.hash = e;
  },
  g = function (e) {
    var t = window.location.href.indexOf("#");
    window.location.replace(window.location.href.slice(0, t >= 0 ? t : 0) + "#" + e);
  },
  b = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    (0, s.default)(p.canUseDOM, "Hash history needs a DOM");
    var t = window.history,
      n = (0, p.supportsGoWithoutReloadUsingHash)(),
      o = e.getUserConfirmation,
      a = void 0 === o ? p.getConfirmation : o,
      l = e.hashType,
      d = void 0 === l ? "slash" : l,
      b = e.basename ? (0, u.stripTrailingSlash)((0, u.addLeadingSlash)(e.basename)) : "",
      w = m[d],
      x = w.encodePath,
      O = w.decodePath,
      E = function () {
        var e = O(v());
        return (0, i.default)(!b || (0, u.hasBasename)(e, b), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + b + '".'), b && (e = (0, u.stripBasename)(e, b)), (0, c.createLocation)(e);
      },
      _ = (0, f.default)(),
      k = function (e) {
        r(Y, e), Y.length = t.length, _.notifyListeners(Y.location, Y.action);
      },
      S = !1,
      C = null,
      j = function () {
        var e = v(),
          t = x(e);
        if (e !== t) g(t);else {
          var n = E(),
            r = Y.location;
          if (!S && (0, c.locationsAreEqual)(r, n)) return;
          if (C === (0, u.createPath)(n)) return;
          C = null, P(n);
        }
      },
      P = function (e) {
        if (S) S = !1, k();else {
          var t = "POP";
          _.confirmTransitionTo(e, t, a, function (n) {
            n ? k({
              action: t,
              location: e
            }) : T(e);
          });
        }
      },
      T = function (e) {
        var t = Y.location,
          n = A.lastIndexOf((0, u.createPath)(t));
        -1 === n && (n = 0);
        var r = A.lastIndexOf((0, u.createPath)(e));
        -1 === r && (r = 0);
        var o = n - r;
        o && (S = !0, F(o));
      },
      L = v(),
      N = x(L);
    L !== N && g(N);
    var M = E(),
      A = [(0, u.createPath)(M)],
      D = function (e) {
        return "#" + x(b + (0, u.createPath)(e));
      },
      I = function (e, t) {
        (0, i.default)(void 0 === t, "Hash history cannot push state; it is ignored");
        var n = "PUSH",
          r = (0, c.createLocation)(e, void 0, void 0, Y.location);
        _.confirmTransitionTo(r, n, a, function (e) {
          if (e) {
            var t = (0, u.createPath)(r),
              o = x(b + t),
              a = v() !== o;
            if (a) {
              C = t, y(o);
              var s = A.lastIndexOf((0, u.createPath)(Y.location)),
                c = A.slice(0, -1 === s ? 0 : s + 1);
              c.push(t), A = c, k({
                action: n,
                location: r
              });
            } else (0, i.default)(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), k();
          }
        });
      },
      R = function (e, t) {
        (0, i.default)(void 0 === t, "Hash history cannot replace state; it is ignored");
        var n = "REPLACE",
          r = (0, c.createLocation)(e, void 0, void 0, Y.location);
        _.confirmTransitionTo(r, n, a, function (e) {
          if (e) {
            var t = (0, u.createPath)(r),
              o = x(b + t),
              i = v() !== o;
            i && (C = t, g(o));
            var a = A.indexOf((0, u.createPath)(Y.location));
            -1 !== a && (A[a] = t), k({
              action: n,
              location: r
            });
          }
        });
      },
      F = function (e) {
        (0, i.default)(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e);
      },
      V = function () {
        return F(-1);
      },
      z = function () {
        return F(1);
      },
      B = 0,
      W = function (e) {
        B += e, 1 === B ? window.addEventListener(h, j) : 0 === B && window.removeEventListener(h, j);
      },
      U = !1,
      q = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = _.setPrompt(e);
        return U || (W(1), U = !0), function () {
          return U && (U = !1, W(-1)), t();
        };
      },
      H = function (e) {
        var t = _.appendListener(e);
        return W(1), function () {
          W(-1), t();
        };
      },
      Y = {
        length: t.length,
        action: "POP",
        location: M,
        createHref: D,
        push: I,
        replace: R,
        go: F,
        goBack: V,
        goForward: z,
        block: q,
        listen: H
      };
    return Y;
  };
legacyExports.default = b;
