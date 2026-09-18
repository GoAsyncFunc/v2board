let legacyModule = module,
  legacyExports = exports;
var r, i, o, a, s;
if ("undefined" === typeof window || "function" !== typeof MessageChannel) {
  var l = null,
    c = null,
    u = function () {
      if (null !== l) try {
        var e = legacyExports.unstable_now();
        l(!0, e), l = null;
      } catch (e) {
        throw setTimeout(u, 0), e;
      }
    },
    h = Date.now();
  legacyExports.unstable_now = function () {
    return Date.now() - h;
  }, r = function (e) {
    null !== l ? setTimeout(r, 0, e) : (l = e, setTimeout(u, 0));
  }, i = function (e, t) {
    c = setTimeout(e, t);
  }, o = function () {
    clearTimeout(c);
  }, a = function () {
    return !1;
  }, s = legacyExports.unstable_forceFrameRate = function () {};
} else {
  var f = window.performance,
    d = window.Date,
    p = window.setTimeout,
    m = window.clearTimeout;
  if ("undefined" !== typeof console) {
    var g = window.cancelAnimationFrame;
    "function" !== typeof window.requestAnimationFrame && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"), "function" !== typeof g && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");
  }
  if ("object" === typeof f && "function" === typeof f.now) legacyExports.unstable_now = function () {
    return f.now();
  };else {
    var v = d.now();
    legacyExports.unstable_now = function () {
      return d.now() - v;
    };
  }
  var y = !1,
    b = null,
    w = -1,
    x = 5,
    _ = 0;
  a = function () {
    return legacyExports.unstable_now() >= _;
  }, s = function () {}, legacyExports.unstable_forceFrameRate = function (e) {
    0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported") : x = 0 < e ? Math.floor(1e3 / e) : 5;
  };
  var E = new MessageChannel(),
    S = E.port2;
  E.port1.onmessage = function () {
    if (null !== b) {
      var e = legacyExports.unstable_now();
      _ = e + x;
      try {
        b(!0, e) ? S.postMessage(null) : (y = !1, b = null);
      } catch (e) {
        throw S.postMessage(null), e;
      }
    } else y = !1;
  }, r = function (e) {
    b = e, y || (y = !0, S.postMessage(null));
  }, i = function (e, n) {
    w = p(function () {
      e(legacyExports.unstable_now());
    }, n);
  }, o = function () {
    m(w), w = -1;
  };
}
function k(e, t) {
  var n = e.length;
  e.push(t);
  e: for (;;) {
    var r = n - 1 >>> 1,
      i = e[r];
    if (!(void 0 !== i && 0 < T(i, t))) break e;
    e[r] = t, e[n] = i, n = r;
  }
}
function C(e) {
  return e = e[0], void 0 === e ? null : e;
}
function O(e) {
  var t = e[0];
  if (void 0 !== t) {
    var n = e.pop();
    if (n !== t) {
      e[0] = n;
      e: for (var r = 0, i = e.length; r < i;) {
        var o = 2 * (r + 1) - 1,
          a = e[o],
          s = o + 1,
          l = e[s];
        if (void 0 !== a && 0 > T(a, n)) void 0 !== l && 0 > T(l, a) ? (e[r] = l, e[s] = n, r = s) : (e[r] = a, e[o] = n, r = o);else {
          if (!(void 0 !== l && 0 > T(l, n))) break e;
          e[r] = l, e[s] = n, r = s;
        }
      }
    }
    return t;
  }
  return null;
}
function T(e, t) {
  var n = e.sortIndex - t.sortIndex;
  return 0 !== n ? n : e.id - t.id;
}
var L = [],
  A = [],
  P = 1,
  j = null,
  M = 3,
  R = !1,
  N = !1,
  D = !1;
function I(e) {
  for (var t = C(A); null !== t;) {
    if (null === t.callback) O(A);else {
      if (!(t.startTime <= e)) break;
      O(A), t.sortIndex = t.expirationTime, k(L, t);
    }
    t = C(A);
  }
}
function $(e) {
  if (D = !1, I(e), !N) if (null !== C(L)) N = !0, r(F);else {
    var t = C(A);
    null !== t && i($, t.startTime - e);
  }
}
function F(e, n) {
  N = !1, D && (D = !1, o()), R = !0;
  var r = M;
  try {
    for (I(n), j = C(L); null !== j && (!(j.expirationTime > n) || e && !a());) {
      var s = j.callback;
      if (null !== s) {
        j.callback = null, M = j.priorityLevel;
        var l = s(j.expirationTime <= n);
        n = legacyExports.unstable_now(), "function" === typeof l ? j.callback = l : j === C(L) && O(L), I(n);
      } else O(L);
      j = C(L);
    }
    if (null !== j) var c = !0;else {
      var u = C(A);
      null !== u && i($, u.startTime - n), c = !1;
    }
    return c;
  } finally {
    j = null, M = r, R = !1;
  }
}
function B(e) {
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
var V = s;
legacyExports.unstable_IdlePriority = 5, legacyExports.unstable_ImmediatePriority = 1, legacyExports.unstable_LowPriority = 4, legacyExports.unstable_NormalPriority = 3, legacyExports.unstable_Profiling = null, legacyExports.unstable_UserBlockingPriority = 2, legacyExports.unstable_cancelCallback = function (e) {
  e.callback = null;
}, legacyExports.unstable_continueExecution = function () {
  N || R || (N = !0, r(F));
}, legacyExports.unstable_getCurrentPriorityLevel = function () {
  return M;
}, legacyExports.unstable_getFirstCallbackNode = function () {
  return C(L);
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
}, legacyExports.unstable_pauseExecution = function () {}, legacyExports.unstable_requestPaint = V, legacyExports.unstable_runWithPriority = function (e, t) {
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
    var l = a.delay;
    l = "number" === typeof l && 0 < l ? s + l : s, a = "number" === typeof a.timeout ? a.timeout : B(e);
  } else a = B(e), l = s;
  return a = l + a, e = {
    id: P++,
    callback: n,
    priorityLevel: e,
    startTime: l,
    expirationTime: a,
    sortIndex: -1
  }, l > s ? (e.sortIndex = l, k(A, e), null === C(L) && e === C(A) && (D ? o() : D = !0, i($, l - s))) : (e.sortIndex = a, k(L, e), N || R || (N = !0, r(F))), e;
}, legacyExports.unstable_shouldYield = function () {
  var e = legacyExports.unstable_now();
  I(e);
  var n = C(L);
  return n !== j && null !== j && null !== n && null !== n.callback && n.startTime <= e && n.expirationTime < j.expirationTime || a();
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
