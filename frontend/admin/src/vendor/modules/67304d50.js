let legacyModule = module,
  legacyExports = exports;
const {
  interopDefault,
  defineExport
} = require("../../app/moduleInterop.js");
var r = require("./47422b74.js"),
  i = interopDefault(r),
  o = require("./514c6150.js"),
  a = interopDefault(o),
  s = require("./2f516879.js"),
  l = require("./62726455.js"),
  c = function (e) {
    return "/" === e.charAt(0) ? e : "/" + e;
  },
  u = function (e) {
    return "/" === e.charAt(0) ? e.substr(1) : e;
  },
  h = function (e, t) {
    return new RegExp("^" + t + "(\\/|\\?|#|$)", "i").test(e);
  },
  f = function (e, t) {
    return h(e, t) ? e.substr(t.length) : e;
  },
  d = function (e) {
    return "/" === e.charAt(e.length - 1) ? e.slice(0, -1) : e;
  },
  p = function (e) {
    var t = e || "/",
      n = "",
      r = "",
      i = t.indexOf("#");
    -1 !== i && (r = t.substr(i), t = t.substr(0, i));
    var o = t.indexOf("?");
    return -1 !== o && (n = t.substr(o), t = t.substr(0, o)), {
      pathname: t,
      search: "?" === n ? "" : n,
      hash: "#" === r ? "" : r
    };
  },
  m = function (e) {
    var t = e.pathname,
      n = e.search,
      r = e.hash,
      i = t || "/";
    return n && "?" !== n && (i += "?" === n.charAt(0) ? n : "?" + n), r && "#" !== r && (i += "#" === r.charAt(0) ? r : "#" + r), i;
  },
  g = require("./636b3973.js"),
  v = interopDefault(g),
  y = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  b = function (e, t, n, r) {
    var i = void 0;
    "string" === typeof e ? (i = p(e), i.query = i.search ? v.a.parse(i.search) : {}, i.state = t) : (i = y({}, e), void 0 === i.pathname && (i.pathname = ""), i.search ? ("?" !== i.search.charAt(0) && (i.search = "?" + i.search), i.query = v.a.parse(i.search)) : (i.search = i.query ? v.a.stringify(i.query) : "", i.query = i.query || {}), i.hash ? "#" !== i.hash.charAt(0) && (i.hash = "#" + i.hash) : i.hash = "", void 0 !== t && void 0 === i.state && (i.state = t));
    try {
      i.pathname = decodeURI(i.pathname);
    } catch (e) {
      throw e instanceof URIError ? new URIError('Pathname "' + i.pathname + '" could not be decoded. This is likely caused by an invalid percent-encoding.') : e;
    }
    return n && (i.key = n), r ? i.pathname ? "/" !== i.pathname.charAt(0) && (i.pathname = Object(s["default"])(i.pathname, r.pathname)) : i.pathname = r.pathname : i.pathname || (i.pathname = "/"), i;
  },
  w = function (e, t) {
    return e.pathname === t.pathname && e.search === t.search && e.hash === t.hash && e.key === t.key && Object(l["default"])(e.state, t.state);
  },
  x = function () {
    var e = null,
      t = function (t) {
        return i()(null == e, "A history supports only one prompt at a time"), e = t, function () {
          e === t && (e = null);
        };
      },
      n = function (t, n, r, o) {
        if (null != e) {
          var a = "function" === typeof e ? e(t, n) : e;
          "string" === typeof a ? "function" === typeof r ? r(a, o) : (i()(!1, "A history needs a getUserConfirmation function in order to use a prompt message"), o(!0)) : o(!1 !== a);
        } else o(!0);
      },
      r = [],
      o = function (e) {
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
      appendListener: o,
      notifyListeners: a
    };
  },
  _ = x,
  E = !("undefined" === typeof window || !window.document || !window.document.createElement),
  S = function (e, t) {
    return t(window.confirm(e));
  },
  k = function () {
    var e = window.navigator.userAgent;
    return (-1 === e.indexOf("Android 2.") && -1 === e.indexOf("Android 4.0") || -1 === e.indexOf("Mobile Safari") || -1 !== e.indexOf("Chrome") || -1 !== e.indexOf("Windows Phone")) && window.history && "pushState" in window.history;
  },
  C = function () {
    return -1 === window.navigator.userAgent.indexOf("Trident");
  },
  O = function () {
    return -1 === window.navigator.userAgent.indexOf("Firefox");
  },
  T = function (e) {
    return void 0 === e.state && -1 === navigator.userAgent.indexOf("CriOS");
  },
  L = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  A = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  P = "popstate",
  j = "hashchange",
  M = function () {
    try {
      return window.history.state || {};
    } catch (e) {
      return {};
    }
  },
  R = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a()(E, "Browser history needs a DOM");
    var t = window.history,
      n = k(),
      r = !C(),
      o = e.forceRefresh,
      s = void 0 !== o && o,
      l = e.getUserConfirmation,
      u = void 0 === l ? S : l,
      p = e.keyLength,
      g = void 0 === p ? 6 : p,
      v = e.basename ? d(c(e.basename)) : "",
      y = function (e) {
        var t = e || {},
          n = t.key,
          r = t.state,
          o = window.location,
          a = o.pathname,
          s = o.search,
          l = o.hash,
          c = a + s + l;
        return i()(!v || h(c, v), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + c + '" to begin with "' + v + '".'), v && (c = f(c, v)), b(c, r, n);
      },
      w = function () {
        return Math.random().toString(36).substr(2, g);
      },
      x = _(),
      O = function (e) {
        A(Z, e), Z.length = t.length, x.notifyListeners(Z.location, Z.action);
      },
      R = function (e) {
        T(e) || I(y(e.state));
      },
      N = function () {
        I(y(M()));
      },
      D = !1,
      I = function (e) {
        if (D) D = !1, O();else {
          var t = "POP";
          x.confirmTransitionTo(e, t, u, function (n) {
            n ? O({
              action: t,
              location: e
            }) : $(e);
          });
        }
      },
      $ = function (e) {
        var t = Z.location,
          n = B.indexOf(t.key);
        -1 === n && (n = 0);
        var r = B.indexOf(e.key);
        -1 === r && (r = 0);
        var i = n - r;
        i && (D = !0, U(i));
      },
      F = y(M()),
      B = [F.key],
      V = function (e) {
        return v + m(e);
      },
      W = function (e, r) {
        i()(!("object" === ("undefined" === typeof e ? "undefined" : L(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
        var o = "PUSH",
          a = b(e, r, w(), Z.location);
        x.confirmTransitionTo(a, o, u, function (e) {
          if (e) {
            var r = V(a),
              l = a.key,
              c = a.state;
            if (n) {
              if (t.pushState({
                key: l,
                state: c
              }, null, r), s) window.location.href = r;else {
                var u = B.indexOf(Z.location.key),
                  h = B.slice(0, -1 === u ? 0 : u + 1);
                h.push(a.key), B = h, O({
                  action: o,
                  location: a
                });
              }
            } else i()(void 0 === c, "Browser history cannot push state in browsers that do not support HTML5 history"), window.location.href = r;
          }
        });
      },
      H = function (e, r) {
        i()(!("object" === ("undefined" === typeof e ? "undefined" : L(e)) && void 0 !== e.state && void 0 !== r), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
        var o = "REPLACE",
          a = b(e, r, w(), Z.location);
        x.confirmTransitionTo(a, o, u, function (e) {
          if (e) {
            var r = V(a),
              l = a.key,
              c = a.state;
            if (n) {
              if (t.replaceState({
                key: l,
                state: c
              }, null, r), s) window.location.replace(r);else {
                var u = B.indexOf(Z.location.key);
                -1 !== u && (B[u] = a.key), O({
                  action: o,
                  location: a
                });
              }
            } else i()(void 0 === c, "Browser history cannot replace state in browsers that do not support HTML5 history"), window.location.replace(r);
          }
        });
      },
      U = function (e) {
        t.go(e);
      },
      z = function () {
        return U(-1);
      },
      G = function () {
        return U(1);
      },
      q = 0,
      K = function (e) {
        q += e, 1 === q ? (window.addEventListener(P, R), r && window.addEventListener(j, N)) : 0 === q && (window.removeEventListener(P, R), r && window.removeEventListener(j, N));
      },
      Y = !1,
      X = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = x.setPrompt(e);
        return Y || (K(1), Y = !0), function () {
          return Y && (Y = !1, K(-1)), t();
        };
      },
      Q = function (e) {
        var t = x.appendListener(e);
        return K(1), function () {
          K(-1), t();
        };
      },
      Z = {
        length: t.length,
        action: "POP",
        location: F,
        createHref: V,
        push: W,
        replace: H,
        go: U,
        goBack: z,
        goForward: G,
        block: X,
        listen: Q
      };
    return Z;
  },
  N = R,
  D = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  I = "hashchange",
  $ = {
    hashbang: {
      encodePath: function (e) {
        return "!" === e.charAt(0) ? e : "!/" + u(e);
      },
      decodePath: function (e) {
        return "!" === e.charAt(0) ? e.substr(1) : e;
      }
    },
    noslash: {
      encodePath: u,
      decodePath: c
    },
    slash: {
      encodePath: c,
      decodePath: c
    }
  },
  F = function () {
    var e = window.location.href,
      t = e.indexOf("#");
    return -1 === t ? "" : e.substring(t + 1);
  },
  B = function (e) {
    return window.location.hash = e;
  },
  V = function (e) {
    var t = window.location.href.indexOf("#");
    window.location.replace(window.location.href.slice(0, t >= 0 ? t : 0) + "#" + e);
  },
  W = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    a()(E, "Hash history needs a DOM");
    var t = window.history,
      n = O(),
      r = e.getUserConfirmation,
      o = void 0 === r ? S : r,
      s = e.hashType,
      l = void 0 === s ? "slash" : s,
      u = e.basename ? d(c(e.basename)) : "",
      p = $[l],
      g = p.encodePath,
      v = p.decodePath,
      y = function () {
        var e = v(F());
        return i()(!u || h(e, u), 'You are attempting to use a basename on a page whose URL path does not begin with the basename. Expected path "' + e + '" to begin with "' + u + '".'), u && (e = f(e, u)), b(e);
      },
      x = _(),
      k = function (e) {
        D(J, e), J.length = t.length, x.notifyListeners(J.location, J.action);
      },
      C = !1,
      T = null,
      L = function () {
        var e = F(),
          t = g(e);
        if (e !== t) V(t);else {
          var n = y(),
            r = J.location;
          if (!C && w(r, n)) return;
          if (T === m(n)) return;
          T = null, A(n);
        }
      },
      A = function (e) {
        if (C) C = !1, k();else {
          var t = "POP";
          x.confirmTransitionTo(e, t, o, function (n) {
            n ? k({
              action: t,
              location: e
            }) : P(e);
          });
        }
      },
      P = function (e) {
        var t = J.location,
          n = N.lastIndexOf(m(t));
        -1 === n && (n = 0);
        var r = N.lastIndexOf(m(e));
        -1 === r && (r = 0);
        var i = n - r;
        i && (C = !0, z(i));
      },
      j = F(),
      M = g(j);
    j !== M && V(M);
    var R = y(),
      N = [m(R)],
      W = function (e) {
        return "#" + g(u + m(e));
      },
      H = function (e, t) {
        i()(void 0 === t, "Hash history cannot push state; it is ignored");
        var n = "PUSH",
          r = b(e, void 0, void 0, J.location);
        x.confirmTransitionTo(r, n, o, function (e) {
          if (e) {
            var t = m(r),
              o = g(u + t),
              a = F() !== o;
            if (a) {
              T = t, B(o);
              var s = N.lastIndexOf(m(J.location)),
                l = N.slice(0, -1 === s ? 0 : s + 1);
              l.push(t), N = l, k({
                action: n,
                location: r
              });
            } else i()(!1, "Hash history cannot PUSH the same path; a new entry will not be added to the history stack"), k();
          }
        });
      },
      U = function (e, t) {
        i()(void 0 === t, "Hash history cannot replace state; it is ignored");
        var n = "REPLACE",
          r = b(e, void 0, void 0, J.location);
        x.confirmTransitionTo(r, n, o, function (e) {
          if (e) {
            var t = m(r),
              i = g(u + t),
              o = F() !== i;
            o && (T = t, V(i));
            var a = N.indexOf(m(J.location));
            -1 !== a && (N[a] = t), k({
              action: n,
              location: r
            });
          }
        });
      },
      z = function (e) {
        i()(n, "Hash history go(n) causes a full page reload in this browser"), t.go(e);
      },
      G = function () {
        return z(-1);
      },
      q = function () {
        return z(1);
      },
      K = 0,
      Y = function (e) {
        K += e, 1 === K ? window.addEventListener(I, L) : 0 === K && window.removeEventListener(I, L);
      },
      X = !1,
      Q = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          t = x.setPrompt(e);
        return X || (Y(1), X = !0), function () {
          return X && (X = !1, Y(-1)), t();
        };
      },
      Z = function (e) {
        var t = x.appendListener(e);
        return Y(1), function () {
          Y(-1), t();
        };
      },
      J = {
        length: t.length,
        action: "POP",
        location: R,
        createHref: W,
        push: H,
        replace: U,
        go: z,
        goBack: G,
        goForward: q,
        block: Q,
        listen: Z
      };
    return J;
  },
  H = W,
  U = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  z = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  G = function (e, t, n) {
    return Math.min(Math.max(e, t), n);
  },
  q = function () {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      t = e.getUserConfirmation,
      n = e.initialEntries,
      r = void 0 === n ? ["/"] : n,
      o = e.initialIndex,
      a = void 0 === o ? 0 : o,
      s = e.keyLength,
      l = void 0 === s ? 6 : s,
      c = _(),
      u = function (e) {
        z(C, e), C.length = C.entries.length, c.notifyListeners(C.location, C.action);
      },
      h = function () {
        return Math.random().toString(36).substr(2, l);
      },
      f = G(a, 0, r.length - 1),
      d = r.map(function (e) {
        return b(e, void 0, "string" === typeof e ? h() : e.key || h());
      }),
      p = m,
      g = function (e, n) {
        i()(!("object" === ("undefined" === typeof e ? "undefined" : U(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to push when the 1st argument is a location-like object that already has state; it is ignored");
        var r = "PUSH",
          o = b(e, n, h(), C.location);
        c.confirmTransitionTo(o, r, t, function (e) {
          if (e) {
            var t = C.index,
              n = t + 1,
              i = C.entries.slice(0);
            i.length > n ? i.splice(n, i.length - n, o) : i.push(o), u({
              action: r,
              location: o,
              index: n,
              entries: i
            });
          }
        });
      },
      v = function (e, n) {
        i()(!("object" === ("undefined" === typeof e ? "undefined" : U(e)) && void 0 !== e.state && void 0 !== n), "You should avoid providing a 2nd state argument to replace when the 1st argument is a location-like object that already has state; it is ignored");
        var r = "REPLACE",
          o = b(e, n, h(), C.location);
        c.confirmTransitionTo(o, r, t, function (e) {
          e && (C.entries[C.index] = o, u({
            action: r,
            location: o
          }));
        });
      },
      y = function (e) {
        var n = G(C.index + e, 0, C.entries.length - 1),
          r = "POP",
          i = C.entries[n];
        c.confirmTransitionTo(i, r, t, function (e) {
          e ? u({
            action: r,
            location: i,
            index: n
          }) : u();
        });
      },
      w = function () {
        return y(-1);
      },
      x = function () {
        return y(1);
      },
      E = function (e) {
        var t = C.index + e;
        return t >= 0 && t < C.entries.length;
      },
      S = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        return c.setPrompt(e);
      },
      k = function (e) {
        return c.appendListener(e);
      },
      C = {
        length: d.length,
        action: "POP",
        location: d[f],
        index: f,
        entries: d,
        createHref: p,
        push: g,
        replace: v,
        go: y,
        goBack: w,
        goForward: x,
        canGo: E,
        block: S,
        listen: k
      };
    return C;
  },
  K = q;
defineExport(legacyExports, "a", function () {
  return N;
}), defineExport(legacyExports, "b", function () {
  return H;
}), defineExport(legacyExports, "d", function () {
  return K;
}), defineExport(legacyExports, "c", function () {
  return b;
}), defineExport(legacyExports, "f", function () {
  return w;
}), defineExport(legacyExports, "e", function () {
  return m;
});
