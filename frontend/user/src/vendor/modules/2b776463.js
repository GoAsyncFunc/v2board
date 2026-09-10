let legacyModule = module,
  legacyExports = exports;
var r, o, i, a, s;
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var c = null,
    u = null,
    l = function () {
      if (null !== c) try {
        var e = legacyExports.unstable_now();
        c(!0, e), c = null;
      } catch (e) {
        throw setTimeout(l, 0), e;
      }
    },
    f = Date.now();
  legacyExports.unstable_now = function () {
    return Date.now() - f;
  }, r = function (e) {
    null !== c ? setTimeout(r, 0, e) : (c = e, setTimeout(l, 0));
  }, o = function (e, t) {
    u = setTimeout(e, t);
  }, i = function () {
    clearTimeout(u);
  }, a = function () {
    return !1;
  }, s = legacyExports.unstable_forceFrameRate = function () {};
} else {
  var p = window.performance,
    d = window.Date,
    h = window.setTimeout,
    m = window.clearTimeout;
  if ("undefined" !== typeof console) {
    var v = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof v && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }
  if ("object" === typeof p && "function" === typeof p.now) legacyExports.unstable_now = function () {
    return p.now();
  };else {
    var y = d.now();
    legacyExports.unstable_now = function () {
      return d.now() - y;
    };
  }
  var g = !1,
    b = null,
    w = -1,
    x = 5,
    O = 0;
  a = function () {
    return legacyExports.unstable_now() >= O;
  }, s = function () {}, legacyExports.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : x = 0 < e ? Math.floor(1e3 / e) : 5;
  };
  var E = new MessageChannel(),
    _ = E.port2;
  E.port1.onmessage = function () {
    if (null !== b) {
      var e = legacyExports.unstable_now();
      O = e + x;
      try {
        b(!0, e) ? _.postMessage(null) : (g = !1, b = null);
      } catch (e) {
        throw _.postMessage(null), e;
      }
    } else g = !1;
  }, r = function (e) {
    b = e, g || (g = !0, _.postMessage(null));
  }, o = function (e, n) {
    w = h(function () {
      e(legacyExports.unstable_now());
    }, n);
  }, i = function () {
    m(w), w = -1;
  };
}
function k(e, t) {
  var n = e.length;
  e.push(t);
  e: for (;;) {
    var r = n - 1 >>> 1,
      o = e[r];
    if (!(void 0 !== o && 0 < j(o, t))) break e;
    e[r] = t, e[n] = o, n = r;
  }
}
function S(e) {
  return e = e[0], void 0 === e ? null : e;
}
function C(e) {
  var t = e[0];
  if (void 0 !== t) {
    var n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, o = e.length; r < o;) {
        var i = 2 * (r + 1) - 1,
          a = e[i],
          s = i + 1,
          c = e[s];
        if (void 0 !== a && 0 > j(a, n)) void 0 !== c && 0 > j(c, a) ? (e[r] = c, e[s] = n, r = s) : (e[r] = a, e[i] = n, r = i);else {
          if (!(void 0 !== c && 0 > j(c, n))) break e;
          e[r] = c, e[s] = n, r = s;
        }
      }
    }
    return t;
  }
  return null;
}
function j(e, t) {
  var n = e.sortIndex - t.sortIndex;
  return 0 !== n ? n : e.id - t.id;
}
var P = [],
  T = [],
  L = 1,
  N = null,
  M = 3,
  A = !1,
  D = !1,
  I = !1;
function R(e) {
  for (var t = S(T); null !== t;) {
    if (null === t.callback) C(T);else {
      if (!(t.startTime <= e)) break;
      C(T), t.sortIndex = t.expirationTime, k(P, t);
    }
    t = S(T);
  }
}
function F(e) {
  if (I = !1, R(e), !D) if (null !== S(P)) D = !0, r(V);else {
    var t = S(T);
    null !== t && o(F, t.startTime - e);
  }
}
function V(e, n) {
  D = !1, I && (I = !1, i()), A = !0;
  var r = M;
  try {
    for (R(n), N = S(P); null !== N && (!(N.expirationTime > n) || e && !a());) {
      var s = N.callback;
      if (null !== s) {
        N.callback = null, M = N.priorityLevel;
        var c = s(N.expirationTime <= n);
        n = legacyExports.unstable_now(), "function" === typeof c ? N.callback = c : N === S(P) && C(P), R(n);
      } else C(P);
      N = S(P);
    }
    if (null !== N) var u = !0;else {
      var l = S(T);
      null !== l && o(F, l.startTime - n), u = !1;
    }
    return u;
  } finally {
    N = null, M = r, A = !1;
  }
}
function z(e) {
  switch (e) {
    case 1:
      return -1;
    case 2:
      return 250;
    case 5:
      return 1073741823;
    case 4:
      return 1e4;
    default:
      return 5e3;
  }
}
var B = s;
legacyExports.unstable_IdlePriority = 5, legacyExports.unstable_ImmediatePriority = 1, legacyExports.unstable_LowPriority = 4, legacyExports.unstable_NormalPriority = 3, legacyExports.unstable_Profiling = null, legacyExports.unstable_UserBlockingPriority = 2, legacyExports.unstable_cancelCallback = function (e) {
  e.callback = null;
}, legacyExports.unstable_continueExecution = function () {
  D || A || (D = !0, r(V));
}, legacyExports.unstable_getCurrentPriorityLevel = function () {
  return M;
}, legacyExports.unstable_getFirstCallbackNode = function () {
  return S(P);
}, legacyExports.unstable_next = function (e) {
  switch (M) {
    case 1:
    case 2:
    case 3:
      var t = 3;
      break;
    default:
      t = M;
  }
  var n = M;
  M = t;
  try {
    return e();
  } finally {
    M = n;
  }
}, legacyExports.unstable_pauseExecution = function () {}, legacyExports.unstable_requestPaint = B, legacyExports.unstable_runWithPriority = function (e, t) {
  switch (e) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      break;
    default:
      e = 3;
  }
  var n = M;
  M = e;
  try {
    return t();
  } finally {
    M = n;
  }
}, legacyExports.unstable_scheduleCallback = function (e, n, a) {
  var s = legacyExports.unstable_now();
  if ("object" === typeof a && null !== a) {
    var c = a.delay;
    c = "number" === typeof c && 0 < c ? s + c : s, a = "number" === typeof a.timeout ? a.timeout : z(e);
  } else a = z(e), c = s;
  return a = c + a, e = {
    id: L++,
    callback: n,
    priorityLevel: e,
    startTime: c,
    expirationTime: a,
    sortIndex: -1
  }, c > s ? (e.sortIndex = c, k(T, e), null === S(P) && e === S(T) && (I ? i() : I = !0, o(F, c - s))) : (e.sortIndex = a, k(P, e), D || A || (D = !0, r(V))), e;
}, legacyExports.unstable_shouldYield = function () {
  var e = legacyExports.unstable_now();
  R(e);
  var n = S(P);
  return n !== N && null !== N && null !== n && null !== n.callback && n.startTime <= e && n.expirationTime < N.expirationTime || a();
}, legacyExports.unstable_wrapCallback = function (e) {
  var t = M;
  return function () {
    var n = M;
    M = t;
    try {
      return e.apply(this, arguments);
    } finally {
      M = n;
    }
  };
};
