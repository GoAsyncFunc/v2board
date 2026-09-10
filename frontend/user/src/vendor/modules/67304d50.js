let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./47422b74.js"),
  o = interopDefault(r),
  i = require("./514c6150.js"),
  a = interopDefault(i),
  s = require("./2f516879.js"),
  c = require("./62726455.js"),
  u = function (e) {
    return "/" === e.charAt(0) ? e : "/" + e;
  },
  l = function (e) {
    return "/" === e.charAt(0) ? e.substr(1) : e;
  },
  f = function (e, t) {
    return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e);
  },
  p = function (e, t) {
    return f(e, t) ? e.substr(t.length) : e;
  },
  d = function (e) {
    return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
  },
  h = function (e) {
    var t = e || "/",
      n = "",
      r = "",
      o = t.indexOf("#");
    -1 !== o && (r = t.substr(o), t = t.substr(0, o));
    var i = t.indexOf("?");
    return -1 !== i && (n = t.substr(i), t = t.substr(0, i)), {
      pathname: t,
      search: "?" === n ? "" : n,
      hash: "#" === r ? "" : r
    };
  },
  m = function (e) {
    var t = e.pathname,
      n = e.search,
      r = e.hash,
      o = t || "/";
    return n && "?" !== n && (o += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (o += "#" === r.charAt(0) ? r : "#" + r), o;
  },
  v = require("./636b3973.js"),
  y = interopDefault(v),
  g = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  b = function (e, t, n, r) {
    var o = void 0;
    "string" === typeof e ? (o = h(e), o.query = o.search ? y.a.parse(o.search) : {}, o.state = t) : (o = g({}, e), void 0 === o.pathname && (o.pathname = ""), o.search ? ("?" !== o.search.charAt(0) && (o.search = "?" + o.search), o.query = y.a.parse(o.search)) : (o.search = o.query ? y.a.stringify(o.query) : "", o.query = o.query || {}), o.hash ? "#" !== o.hash.charAt(0) && (o.hash = "#" + o.hash) : o.hash = "", void 0 !== t && void 0 === o.state && (o.state = t));
    try {
      o.pathname = decodeURI(o.pathname);
    } catch (e) {
      throw e instanceof URIError ? new URIError('Pathname "' + o.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e;
    }
    return n && (o.key = n), r ? o.pathname ? "/" !== o.pathname.charAt(0) && (o.pathname = Object(s["default"])(o.pathname, r.pathname)) : o.pathname = r.pathname : o.pathname || (o.pathname = "/"), o;
  },
  w = function (e, t) {
    return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(c["default"])(e.state, t.state);
  },
  x = function () {
    var e = null,
      t = function (t) {
        return o()(null == e, "A history supports only one prompt at a time"), e = t, function () {
          e === t && (e = null);
        };
      },
      n = function (t, n, r, i) {
        if (null != e) {
          var a = "function" === typeof e ? e(t, n) : e;
          "string" === typeof a ? "function" === typeof r ? r(a, i) : (o()(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), i(!0)) : i(!1 !== a);
        } else i(!0);
      },
      r = [],
      i = function (e) {
        var t = !0,
          n = function () {
            t && e.apply(void 0, arguments);
          };
        return r.push(n), function () {
          t = !1, r = r.filter(function (e) {
            return e !== n;
          });
        };
      },
      a = function () {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        r.forEach(function (e) {
          return e.apply(void 0, t);
        });
      };
    return {
      setPrompt: t,
      confirmTransitionTo: n,
      appendListener: i,
      notifyListeners: a
    };
  },
  O = x,
  E = !("undefined" === typeof window || !window.document || !window.document.createElement),
  _ = function (e, t) {
    return t(window.confirm(e));
  },
  k = function () {
    var e = window.navigator.userAgent;
    return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && window.history && "pushState" in window.history;
  },
  S = function () {
    return -1 === window.navigator.userAgent.indexOf("Trident");
  },
  C = function () {
    return -1 === window.navigator.userAgent.indexOf("Firefox");
  },
  j = function (e) {
    return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS");
  },
  P = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  T = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  L = "popstate",
  N = "hashchange",
  M = function () {
    try {
      return window.history.state || {};
    } catch (e) {
      return {};
    }
  },
  A = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a()(E, "Browser history needs a DOM");
    var t = window.history,
      n = k(),
      r = !S(),
      i = e.forceRefresh,
      s = void 0 !== i && i,
      c = e.getUserConfirmation,
      l = void 0 === c ? _ : c,
      h = e.keyLength,
      v = void 0 === h ? 6 : h,
      y = e.basename ? d(u(e.basename)) : "",
      g = function (e) {
        var t = e || {},
          n = t.key,
          r = t.state,
          i = window.location,
          a = i.pathname,
          s = i.search,
          c = i.hash,
          u = a + s + c;
        return o()(!y || f(u, y), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + u + '" to begin with "' + y + '".'), y && (u = p(u, y)), b(u, r, n);
      },
      w = function () {
        return Math.random().toString(36).substr(2, v);
      },
      x = O(),
      C = function (e) {
        T(J, e), J.length = t.length, x.notifyListeners(J.location, J.action);
      },
      A = function (e) {
        j(e) || R(g(e.state));
      },
      D = function () {
        R(g(M()));
      },
      I = !1,
      R = function (e) {
        if (I) I = !1, C();else {
          var t = "POP";
          x.confirmTransitionTo(e, t, l, function (n) {
            n ? C({
              action: t,
              location: e
            }) : F(e);
          });
        }
      },
      F = function (e) {
        var t = J.location,
          n = z.indexOf(t.key);
        -1 === n && (n = 0);
        var r = z.indexOf(e.key);
        -1 === r && (r = 0);
        var o = n - r;
        o && (I = !0, q(o));
      },
      V = g(M()),
      z = [V.key],
      B = function (e) {
        return y + m(e);
      },
      W = function (e, r) {
        o()(!("object" === ("undefined" === typeof e ? "undefined" : P(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
        var i = "PUSH",
          a = b(e, r, w(), J.location);
        x.confirmTransitionTo(a, i, l, function (e) {
          if (e) {
            var r = B(a),
              c = a.key,
              u = a.state;
            if (n) {
              if (t.pushState({
                key: c,
                state: u
              }, null, r), s) window.location.href = r;else {
                var l = z.indexOf(J.location.key),
                  f = z.slice(0, -1 === l ? 0 : l + 1);
                f.push(a.key), z = f, C({
                  action: i,
                  location: a
                });
              }
            } else o()(void 0 === u, "Browser history cannot push state in browsers that do not support HTML5 history"), window.location.href = r;
          }
        });
      },
      U = function (e, r) {
        o()(!("object" === ("undefined" === typeof e ? "undefined" : P(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
        var i = "REPLACE",
          a = b(e, r, w(), J.location);
        x.confirmTransitionTo(a, i, l, function (e) {
          if (e) {
            var r = B(a),
              c = a.key,
              u = a.state;
            if (n) {
              if (t.replaceState({
                key: c,
                state: u
              }, null, r), s) window.location.replace(r);else {
                var l = z.indexOf(J.location.key);
                -1 !== l && (z[l] = a.key), C({
                  action: i,
                  location: a
                });
              }
            } else o()(void 0 === u, "Browser history cannot replace state in browsers that do not support HTML5 history"), window.location.replace(r);
          }
        });
      },
      q = function (e) {
        t.go(e);
      },
      H = function () {
        return q(-1);
      },
      Y = function () {
        return q(1);
      },
      G = 0,
      K = function (e) {
        G += e, 1 === G ? (window.addEventListener(L, A), r && window.addEventListener(N, D)) : 0 === G && (window.removeEventListener(L, A), r && window.removeEventListener(N, D));
      },
      Z = !1,
      Q = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = x.setPrompt(e);
        return Z || (K(1), Z = !0), function () {
          return Z && (Z = !1, K(-1)), t();
        };
      },
      X = function (e) {
        var t = x.appendListener(e);
        return K(1), function () {
          K(-1), t();
        };
      },
      J = {
        length: t.length,
        action: "POP",
        location: V,
        createHref: B,
        push: W,
        replace: U,
        go: q,
        goBack: H,
        goForward: Y,
        block: Q,
        listen: X
      };
    return J;
  },
  D = A,
  I = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  R = "hashchange",
  F = {
    hashbang: {
      encodePath: function (e) {
        return "!" === e.charAt(0) ? e : "!/" + l(e);
      },
      decodePath: function (e) {
        return "!" === e.charAt(0) ? e.substr(1) : e;
      }
    },
    noslash: {
      encodePath: l,
      decodePath: u
    },
    slash: {
      encodePath: u,
      decodePath: u
    }
  },
  V = function () {
    var e = window.location.href,
      t = e.indexOf("#");
    return -1 === t ? "" : e.substring(t + 1);
  },
  z = function (e) {
    return window.location.hash = e;
  },
  B = function (e) {
    var t = window.location.href.indexOf("#");
    window.location.replace(window.location.href.slice(0, t >= 0 ? t : 0) + "#" + e);
  },
  W = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a()(E, "Hash history needs a DOM");
    var t = window.history,
      n = C(),
      r = e.getUserConfirmation,
      i = void 0 === r ? _ : r,
      s = e.hashType,
      c = void 0 === s ? "slash" : s,
      l = e.basename ? d(u(e.basename)) : "",
      h = F[c],
      v = h.encodePath,
      y = h.decodePath,
      g = function () {
        var e = y(V());
        return o()(!l || f(e, l), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + l + '".'), l && (e = p(e, l)), b(e);
      },
      x = O(),
      k = function (e) {
        I($, e), $.length = t.length, x.notifyListeners($.location, $.action);
      },
      S = !1,
      j = null,
      P = function () {
        var e = V(),
          t = v(e);
        if (e !== t) B(t);else {
          var n = g(),
            r = $.location;
          if (!S && w(r, n)) return;
          if (j === m(n)) return;
          j = null, T(n);
        }
      },
      T = function (e) {
        if (S) S = !1, k();else {
          var t = "POP";
          x.confirmTransitionTo(e, t, i, function (n) {
            n ? k({
              action: t,
              location: e
            }) : L(e);
          });
        }
      },
      L = function (e) {
        var t = $.location,
          n = D.lastIndexOf(m(t));
        -1 === n && (n = 0);
        var r = D.lastIndexOf(m(e));
        -1 === r && (r = 0);
        var o = n - r;
        o && (S = !0, H(o));
      },
      N = V(),
      M = v(N);
    N !== M && B(M);
    var A = g(),
      D = [m(A)],
      W = function (e) {
        return "#" + v(l + m(e));
      },
      U = function (e, t) {
        o()(void 0 === t, "Hash history cannot push state; it is ignored");
        var n = "PUSH",
          r = b(e, void 0, void 0, $.location);
        x.confirmTransitionTo(r, n, i, function (e) {
          if (e) {
            var t = m(r),
              i = v(l + t),
              a = V() !== i;
            if (a) {
              j = t, z(i);
              var s = D.lastIndexOf(m($.location)),
                c = D.slice(0, -1 === s ? 0 : s + 1);
              c.push(t), D = c, k({
                action: n,
                location: r
              });
            } else o()(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), k();
          }
        });
      },
      q = function (e, t) {
        o()(void 0 === t, "Hash history cannot replace state; it is ignored");
        var n = "REPLACE",
          r = b(e, void 0, void 0, $.location);
        x.confirmTransitionTo(r, n, i, function (e) {
          if (e) {
            var t = m(r),
              o = v(l + t),
              i = V() !== o;
            i && (j = t, B(o));
            var a = D.indexOf(m($.location));
            -1 !== a && (D[a] = t), k({
              action: n,
              location: r
            });
          }
        });
      },
      H = function (e) {
        o()(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e);
      },
      Y = function () {
        return H(-1);
      },
      G = function () {
        return H(1);
      },
      K = 0,
      Z = function (e) {
        K += e, 1 === K ? window.addEventListener(R, P) : 0 === K && window.removeEventListener(R, P);
      },
      Q = !1,
      X = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = x.setPrompt(e);
        return Q || (Z(1), Q = !0), function () {
          return Q && (Q = !1, Z(-1)), t();
        };
      },
      J = function (e) {
        var t = x.appendListener(e);
        return Z(1), function () {
          Z(-1), t();
        };
      },
      $ = {
        length: t.length,
        action: "POP",
        location: A,
        createHref: W,
        push: U,
        replace: q,
        go: H,
        goBack: Y,
        goForward: G,
        block: X,
        listen: J
      };
    return $;
  },
  U = W,
  q = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  H = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  Y = function (e, t, n) {
    return Math.min(Math.max(e, t), n);
  },
  G = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.getUserConfirmation,
      n = e.initialEntries,
      r = void 0 === n ? ["/"] : n,
      i = e.initialIndex,
      a = void 0 === i ? 0 : i,
      s = e.keyLength,
      c = void 0 === s ? 6 : s,
      u = O(),
      l = function (e) {
        H(S, e), S.length = S.entries.length, u.notifyListeners(S.location, S.action);
      },
      f = function () {
        return Math.random().toString(36).substr(2, c);
      },
      p = Y(a, 0, r.length - 1),
      d = r.map(function (e) {
        return b(e, void 0, "string" === typeof e ? f() : e.key || f());
      }),
      h = m,
      v = function (e, n) {
        o()(!("object" === ("undefined" === typeof e ? "undefined" : q(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
        var r = "PUSH",
          i = b(e, n, f(), S.location);
        u.confirmTransitionTo(i, r, t, function (e) {
          if (e) {
            var t = S.index,
              n = t + 1,
              o = S.entries.slice(0);
            o.length > n ? o.splice(n, o.length - n, i) : o.push(i), l({
              action: r,
              location: i,
              index: n,
              entries: o
            });
          }
        });
      },
      y = function (e, n) {
        o()(!("object" === ("undefined" === typeof e ? "undefined" : q(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
        var r = "REPLACE",
          i = b(e, n, f(), S.location);
        u.confirmTransitionTo(i, r, t, function (e) {
          e && (S.entries[S.index] = i, l({
            action: r,
            location: i
          }));
        });
      },
      g = function (e) {
        var n = Y(S.index + e, 0, S.entries.length - 1),
          r = "POP",
          o = S.entries[n];
        u.confirmTransitionTo(o, r, t, function (e) {
          e ? l({
            action: r,
            location: o,
            index: n
          }) : l();
        });
      },
      w = function () {
        return g(-1);
      },
      x = function () {
        return g(1);
      },
      E = function (e) {
        var t = S.index + e;
        return t >= 0 && t < S.entries.length;
      },
      _ = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return u.setPrompt(e);
      },
      k = function (e) {
        return u.appendListener(e);
      },
      S = {
        length: d.length,
        action: "POP",
        location: d[p],
        index: p,
        entries: d,
        createHref: h,
        push: v,
        replace: y,
        go: g,
        goBack: w,
        goForward: x,
        canGo: E,
        block: _,
        listen: k
      };
    return S;
  },
  K = G;
defineExport(legacyExports, "a", function () {
  return D;
}), defineExport(legacyExports, "b", function () {
  return U;
}), defineExport(legacyExports, "d", function () {
  return K;
}), defineExport(legacyExports, "c", function () {
  return b;
}), defineExport(legacyExports, "f", function () {
  return w;
}), defineExport(legacyExports, "e", function () {
  return m;
});
