let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
var r = {};
markEsModule(r), defineExport(r, "take", function () {
  return Me;
}), defineExport(r, "takem", function () {
  return Ce;
}), defineExport(r, "put", function () {
  return Oe;
}), defineExport(r, "all", function () {
  return De;
}), defineExport(r, "race", function () {
  return Pe;
}), defineExport(r, "call", function () {
  return Le;
}), defineExport(r, "apply", function () {
  return Ye;
}), defineExport(r, "cps", function () {
  return Re;
}), defineExport(r, "fork", function () {
  return je;
}), defineExport(r, "spawn", function () {
  return Ae;
}), defineExport(r, "join", function () {
  return Ve;
}), defineExport(r, "cancel", function () {
  return Fe;
}), defineExport(r, "select", function () {
  return ze;
}), defineExport(r, "actionChannel", function () {
  return Ie;
}), defineExport(r, "cancelled", function () {
  return Ue;
}), defineExport(r, "flush", function () {
  return We;
}), defineExport(r, "getContext", function () {
  return He;
}), defineExport(r, "setContext", function () {
  return Be;
}), defineExport(r, "takeEvery", function () {
  return yt;
}), defineExport(r, "takeLatest", function () {
  return bt;
}), defineExport(r, "throttle", function () {
  return _t;
});
var i = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  a = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  o = function (e) {
    return "@@redux-saga/" + e;
  },
  u = o("TASK"),
  l = o("HELPER"),
  s = o("MATCH"),
  c = o("CANCEL_PROMISE"),
  f = o("SAGA_ACTION"),
  d = o("SELF_CANCELLATION"),
  h = function (e) {
    return function () {
      return e;
    };
  },
  p = h(!0),
  m = function () {},
  v = function (e) {
    return e;
  };
function g(e, t, n) {
  if (!t(e)) throw P("error", "uncaught at check", n), new Error(n);
}
var y = Object.prototype.hasOwnProperty;
function b(e, t) {
  return _.notUndef(e) && y.call(e, t);
}
var _ = {
    undef: function (e) {
      return null === e || void 0 === e;
    },
    notUndef: function (e) {
      return null !== e && void 0 !== e;
    },
    func: function (e) {
      return "function" === typeof e;
    },
    number: function (e) {
      return "number" === typeof e;
    },
    string: function (e) {
      return "string" === typeof e;
    },
    array: Array.isArray,
    object: function (e) {
      return e && !_.array(e) && "object" === ("undefined" === typeof e ? "undefined" : a(e));
    },
    promise: function (e) {
      return e && _.func(e.then);
    },
    iterator: function (e) {
      return e && _.func(e.next) && _.func(e.throw);
    },
    iterable: function (e) {
      return e && _.func(Symbol) ? _.func(e[Symbol.iterator]) : _.array(e);
    },
    task: function (e) {
      return e && e[u];
    },
    observable: function (e) {
      return e && _.func(e.subscribe);
    },
    buffer: function (e) {
      return e && _.func(e.isEmpty) && _.func(e.take) && _.func(e.put);
    },
    pattern: function (e) {
      return e && (_.string(e) || "symbol" === ("undefined" === typeof e ? "undefined" : a(e)) || _.func(e) || _.array(e));
    },
    channel: function (e) {
      return e && _.func(e.take) && _.func(e.close);
    },
    helper: function (e) {
      return e && e[l];
    },
    stringableFunc: function (e) {
      return _.func(e) && b(e, "toString");
    }
  },
  w = {
    assign: function (e, t) {
      for (var n in t) b(t, n) && (e[n] = t[n]);
    }
  };
function k(e, t) {
  var n = e.indexOf(t);
  n >= 0 && e.splice(n, 1);
}
var S = {
  from: function (e) {
    var t = Array(e.length);
    for (var n in e) b(e, n) && (t[n] = e[n]);
    return t;
  }
};
function x() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = i({}, e),
    n = new Promise(function (e, n) {
      t.resolve = e, t.reject = n;
    });
  return t.promise = n, t;
}
function T(e) {
  var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
    n = void 0,
    r = new Promise(function (r) {
      n = setTimeout(function () {
        return r(t);
      }, e);
    });
  return r[c] = function () {
    return clearTimeout(n);
  }, r;
}
function E() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
  return function () {
    return ++e;
  };
}
var M = E(),
  C = function (e) {
    throw e;
  },
  O = function (e) {
    return {
      value: e,
      done: !0
    };
  };
function D(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C,
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
    r = arguments[3],
    i = {
      name: n,
      next: e,
      throw: t,
      return: O
    };
  return r && (i[l] = !0), "undefined" !== typeof Symbol && (i[Symbol.iterator] = function () {
    return i;
  }), i;
}
function P(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
  "undefined" === typeof window ? console.log("redux-saga " + e + ": " + t + "\n" + (n && n.stack || n)) : console[e](t, n);
}
function N(e, t) {
  return function () {
    return e.apply(void 0, arguments);
  };
}
var L = function (e, t) {
    return e + " has been deprecated in favor of " + t + ", please update your code";
  },
  Y = function (e) {
    return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + e + "\n");
  },
  R = function (e, t) {
    return (e ? e + "." : "") + "setContext(props): argument " + t + " is not a plain object";
  },
  j = function (e) {
    return function (t) {
      return e(Object.defineProperty(t, f, {
        value: !0
      }));
    };
  },
  A = "Channel's Buffer overflow!",
  V = 1,
  F = 2,
  z = 3,
  I = 4,
  U = {
    isEmpty: p,
    put: m,
    take: m
  };
function W() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
    t = arguments[1],
    n = new Array(e),
    r = 0,
    i = 0,
    a = 0,
    o = function (t) {
      n[i] = t, i = (i + 1) % e, r++;
    },
    u = function () {
      if (0 != r) {
        var t = n[a];
        return n[a] = null, r--, a = (a + 1) % e, t;
      }
    },
    l = function () {
      var e = [];
      while (r) e.push(u());
      return e;
    };
  return {
    isEmpty: function () {
      return 0 == r;
    },
    put: function (u) {
      if (r < e) o(u);else {
        var s = void 0;
        switch (t) {
          case V:
            throw new Error(A);
          case z:
            n[i] = u, i = (i + 1) % e, a = i;
            break;
          case I:
            s = 2 * e, n = l(), r = n.length, i = n.length, a = 0, n.length = s, e = s, o(u);
            break;
          default:
        }
      }
    },
    take: u,
    flush: l
  };
}
var H = {
    none: function () {
      return U;
    },
    fixed: function (e) {
      return W(e, V);
    },
    dropping: function (e) {
      return W(e, F);
    },
    sliding: function (e) {
      return W(e, z);
    },
    expanding: function (e) {
      return W(e, I);
    }
  },
  B = [],
  q = 0;
function G(e) {
  try {
    $(), e();
  } finally {
    K();
  }
}
function Q(e) {
  B.push(e), q || ($(), Z());
}
function $() {
  q++;
}
function K() {
  q--;
}
function Z() {
  K();
  var e = void 0;
  while (!q && void 0 !== (e = B.shift())) G(e);
}
var X = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  J = "@@redux-saga/CHANNEL_END",
  ee = {
    type: J
  },
  te = function (e) {
    return e && e.type === J;
  };
function ne() {
  var e = [];
  function t(t) {
    return e.push(t), function () {
      return k(e, t);
    };
  }
  function n(t) {
    for (var n = e.slice(), r = 0, i = n.length; r < i; r++) n[r](t);
  }
  return {
    subscribe: t,
    emit: n
  };
}
var re = "invalid buffer passed to channel factory function",
  ie = "Saga was provided with an undefined action";
function ae() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : H.fixed(),
    t = !1,
    n = [];
  function r() {
    if (t && n.length) throw Y("Cannot have a closed channel with pending takers");
    if (n.length && !e.isEmpty()) throw Y("Cannot have pending takers with non empty buffer");
  }
  function i(i) {
    if (r(), g(i, _.notUndef, ie), !t) {
      if (!n.length) return e.put(i);
      for (var a = 0; a < n.length; a++) {
        var o = n[a];
        if (!o[s] || o[s](i)) return n.splice(a, 1), o(i);
      }
    }
  }
  function a(i) {
    r(), g(i, _.func, "channel.take's callback must be a function"), t && e.isEmpty() ? i(ee) : e.isEmpty() ? (n.push(i), i.cancel = function () {
      return k(n, i);
    }) : i(e.take());
  }
  function o(n) {
    r(), g(n, _.func, "channel.flush' callback must be a function"), t && e.isEmpty() ? n(ee) : n(e.flush());
  }
  function u() {
    if (r(), !t && (t = !0, n.length)) {
      var e = n;
      n = [];
      for (var i = 0, a = e.length; i < a; i++) e[i](ee);
    }
  }
  return g(e, _.buffer, re), {
    take: a,
    put: i,
    flush: o,
    close: u,
    get __takers__() {
      return n;
    },
    get __closed__() {
      return t;
    }
  };
}
function oe(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : H.none(),
    n = arguments[2];
  arguments.length > 2 && g(n, _.func, "Invalid match function passed to eventChannel");
  var r = ae(t),
    i = function () {
      r.__closed__ || (a && a(), r.close());
    },
    a = e(function (e) {
      te(e) ? i() : n && !n(e) || r.put(e);
    });
  if (r.__closed__ && a(), !_.func(a)) throw new Error("in eventChannel: subscribe should return a function to unsubscribe");
  return {
    take: r.take,
    flush: r.flush,
    close: i
  };
}
function ue(e) {
  var t = oe(function (t) {
    return e(function (e) {
      e[f] ? t(e) : Q(function () {
        return t(e);
      });
    });
  });
  return X({}, t, {
    take: function (e, n) {
      arguments.length > 1 && (g(n, _.func, "channel.take's matcher argument must be a function"), e[s] = n), t.take(e);
    }
  });
}
var le = o("IO"),
  se = "TAKE",
  ce = "PUT",
  fe = "ALL",
  de = "RACE",
  he = "CALL",
  pe = "CPS",
  me = "FORK",
  ve = "JOIN",
  ge = "CANCEL",
  ye = "SELECT",
  be = "ACTION_CHANNEL",
  _e = "CANCELLED",
  we = "FLUSH",
  ke = "GET_CONTEXT",
  Se = "SET_CONTEXT",
  xe = "\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)",
  Te = function (e, t) {
    var n;
    return n = {}, n[le] = !0, n[e] = t, n;
  },
  Ee = function (e) {
    return g(Ge.fork(e), _.object, "detach(eff): argument must be a fork effect"), e[me].detached = !0, e;
  };
function Me() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "*";
  if (arguments.length && g(arguments[0], _.notUndef, "take(patternOrChannel): patternOrChannel is undefined"), _.pattern(e)) return Te(se, {
    pattern: e
  });
  if (_.channel(e)) return Te(se, {
    channel: e
  });
  throw new Error("take(patternOrChannel): argument " + String(e) + " is not valid channel or a valid pattern");
}
Me.maybe = function () {
  var e = Me.apply(void 0, arguments);
  return e[se].maybe = !0, e;
};
var Ce = N(Me.maybe, L("takem", "take.maybe"));
function Oe(e, t) {
  return arguments.length > 1 ? (g(e, _.notUndef, "put(channel, action): argument channel is undefined"), g(e, _.channel, "put(channel, action): argument " + e + " is not a valid channel"), g(t, _.notUndef, "put(channel, action): argument action is undefined")) : (g(e, _.notUndef, "put(action): argument action is undefined"), t = e, e = null), Te(ce, {
    channel: e,
    action: t
  });
}
function De(e) {
  return Te(fe, e);
}
function Pe(e) {
  return Te(de, e);
}
function Ne(e, t, n) {
  g(t, _.notUndef, e + ": argument fn is undefined");
  var r = null;
  if (_.array(t)) {
    var i = t;
    r = i[0], t = i[1];
  } else if (t.fn) {
    var a = t;
    r = a.context, t = a.fn;
  }
  return r && _.string(t) && _.func(r[t]) && (t = r[t]), g(t, _.func, e + ": argument " + t + " is not a function"), {
    context: r,
    fn: t,
    args: n
  };
}
function Le(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return Te(he, Ne("call", e, n));
}
function Ye(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
  return Te(he, Ne("apply", {
    context: e,
    fn: t
  }, n));
}
function Re(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return Te(pe, Ne("cps", e, n));
}
function je(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return Te(me, Ne("fork", e, n));
}
function Ae(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return Ee(je.apply(void 0, [e].concat(n)));
}
function Ve() {
  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (t.length > 1) return De(t.map(function (e) {
    return Ve(e);
  }));
  var r = t[0];
  return g(r, _.notUndef, "join(task): argument task is undefined"), g(r, _.task, "join(task): argument " + r + " is not a valid Task object " + xe), Te(ve, r);
}
function Fe() {
  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (t.length > 1) return De(t.map(function (e) {
    return Fe(e);
  }));
  var r = t[0];
  return 1 === t.length && (g(r, _.notUndef, "cancel(task): argument task is undefined"), g(r, _.task, "cancel(task): argument " + r + " is not a valid Task object " + xe)), Te(ge, r || d);
}
function ze(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return 0 === arguments.length ? e = v : (g(e, _.notUndef, "select(selector,[...]): argument selector is undefined"), g(e, _.func, "select(selector,[...]): argument " + e + " is not a function")), Te(ye, {
    selector: e,
    args: n
  });
}
function Ie(e, t) {
  return g(e, _.notUndef, "actionChannel(pattern,...): argument pattern is undefined"), arguments.length > 1 && (g(t, _.notUndef, "actionChannel(pattern, buffer): argument buffer is undefined"), g(t, _.buffer, "actionChannel(pattern, buffer): argument " + t + " is not a valid buffer")), Te(be, {
    pattern: e,
    buffer: t
  });
}
function Ue() {
  return Te(_e, {});
}
function We(e) {
  return g(e, _.channel, "flush(channel): argument " + e + " is not valid channel"), Te(we, e);
}
function He(e) {
  return g(e, _.string, "getContext(prop): argument " + e + " is not a string"), Te(ke, e);
}
function Be(e) {
  return g(e, _.object, R(null, e)), Te(Se, e);
}
Oe.resolve = function () {
  var e = Oe.apply(void 0, arguments);
  return e[ce].resolve = !0, e;
}, Oe.sync = N(Oe.resolve, L("put.sync", "put.resolve"));
var qe = function (e) {
    return function (t) {
      return t && t[le] && t[e];
    };
  },
  Ge = {
    take: qe(se),
    put: qe(ce),
    all: qe(fe),
    race: qe(de),
    call: qe(he),
    cps: qe(pe),
    fork: qe(me),
    join: qe(ve),
    cancel: qe(ge),
    select: qe(ye),
    actionChannel: qe(be),
    cancelled: qe(_e),
    flush: qe(we),
    getContext: qe(ke),
    setContext: qe(Se)
  },
  Qe = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  $e = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  };
function Ke(e, t) {
  for (var n in t) {
    var r = t[n];
    r.configurable = r.enumerable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, n, r);
  }
  return e;
}
var Ze = "proc first argument (Saga function result) must be an iterator",
  Xe = {
    toString: function () {
      return "@@redux-saga/CHANNEL_END";
    }
  },
  Je = {
    toString: function () {
      return "@@redux-saga/TASK_CANCEL";
    }
  },
  et = {
    wildcard: function () {
      return p;
    },
    default: function (e) {
      return "symbol" === ("undefined" === typeof e ? "undefined" : $e(e)) ? function (t) {
        return t.type === e;
      } : function (t) {
        return t.type === String(e);
      };
    },
    array: function (e) {
      return function (t) {
        return e.some(function (e) {
          return tt(e)(t);
        });
      };
    },
    predicate: function (e) {
      return function (t) {
        return e(t);
      };
    }
  };
function tt(e) {
  return ("*" === e ? et.wildcard : _.array(e) ? et.array : _.stringableFunc(e) ? et.default : _.func(e) ? et.predicate : et.default)(e);
}
function nt(e, t, n) {
  var r = [],
    i = void 0,
    a = !1;
  function o(e) {
    l(), n(e, !0);
  }
  function u(e) {
    r.push(e), e.cont = function (u, l) {
      a || (k(r, e), e.cont = m, l ? o(u) : (e === t && (i = u), r.length || (a = !0, n(i))));
    };
  }
  function l() {
    a || (a = !0, r.forEach(function (e) {
      e.cont = m, e.cancel();
    }), r = []);
  }
  return u(t), {
    addTask: u,
    cancelAll: l,
    abort: o,
    getTasks: function () {
      return r;
    },
    taskNames: function () {
      return r.map(function (e) {
        return e.name;
      });
    }
  };
}
function rt(e) {
  var t = e.context,
    n = e.fn,
    r = e.args;
  if (_.iterator(n)) return n;
  var i = void 0,
    a = void 0;
  try {
    i = n.apply(t, r);
  } catch (e) {
    a = e;
  }
  return _.iterator(i) ? i : D(a ? function () {
    throw a;
  } : function () {
    var e = void 0,
      t = {
        done: !1,
        value: i
      },
      n = function (e) {
        return {
          done: !0,
          value: e
        };
      };
    return function (r) {
      return e ? n(r) : (e = !0, t);
    };
  }());
}
var it = function (e) {
  return {
    fn: e
  };
};
function at(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
      return m;
    },
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : m,
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : m,
    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    a = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
    o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
    l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "anonymous",
    s = arguments[8];
  g(e, _.iterator, Ze);
  var f = "[...effects]",
    h = N(ee, L(f, "all(" + f + ")")),
    p = a.sagaMonitor,
    v = a.logger,
    y = a.onError,
    b = v || P,
    T = function (e) {
      var t = e.sagaStack;
      !t && e.stack && (t = -1 !== e.stack.split("\n")[0].indexOf(e.message) ? e.stack : "Error: " + e.message + "\n" + e.stack), b("error", "uncaught at " + l, t || e.message || e);
    },
    E = ue(t),
    C = Object.create(i);
  V.cancel = m;
  var O = fe(o, l, e, s),
    D = {
      name: l,
      cancel: j,
      isRunning: !0
    },
    Y = nt(l, D, F);
  function j() {
    D.isRunning && !D.isCancelled && (D.isCancelled = !0, V(Je));
  }
  function A() {
    e._isRunning && !e._isCancelled && (e._isCancelled = !0, Y.cancelAll(), F(Je));
  }
  return s && (s.cancel = A), e._isRunning = !0, V(), O;
  function V(t, n) {
    if (!D.isRunning) throw new Error("Trying to resume an already finished generator");
    try {
      var r = void 0;
      n ? r = e.throw(t) : t === Je ? (D.isCancelled = !0, V.cancel(), r = _.func(e.return) ? e.return(Je) : {
        done: !0,
        value: Je
      }) : r = t === Xe ? _.func(e.return) ? e.return() : {
        done: !0
      } : e.next(t), r.done ? (D.isMainRunning = !1, D.cont && D.cont(r.value)) : z(r.value, o, "", V);
    } catch (e) {
      D.isCancelled && T(e), D.isMainRunning = !1, D.cont(e, !0);
    }
  }
  function F(t, n) {
    e._isRunning = !1, E.close(), n ? (t instanceof Error && Object.defineProperty(t, "sagaStack", {
      value: "at " + l + " \n " + (t.sagaStack || t.stack),
      configurable: !0
    }), O.cont || (t instanceof Error && y ? y(t) : T(t)), e._error = t, e._isAborted = !0, e._deferredEnd && e._deferredEnd.reject(t)) : (e._result = t, e._deferredEnd && e._deferredEnd.resolve(t)), O.cont && O.cont(t, n), O.joiners.forEach(function (e) {
      return e.cb(t, n);
    }), O.joiners = null;
  }
  function z(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
      r = arguments[3],
      i = M();
    p && p.effectTriggered({
      effectId: i,
      parentEffectId: t,
      label: n,
      effect: e
    });
    var a = void 0;
    function o(e, t) {
      a || (a = !0, r.cancel = m, p && (t ? p.effectRejected(i, e) : p.effectResolved(i, e)), r(e, t));
    }
    o.cancel = m, r.cancel = function () {
      if (!a) {
        a = !0;
        try {
          o.cancel();
        } catch (e) {
          T(e);
        }
        o.cancel = m, p && p.effectCancelled(i);
      }
    };
    var u = void 0;
    return _.promise(e) ? I(e, o) : _.helper(e) ? K(it(e), i, o) : _.iterator(e) ? U(e, i, l, o) : _.array(e) ? h(e, i, o) : (u = Ge.take(e)) ? W(u, o) : (u = Ge.put(e)) ? B(u, o) : (u = Ge.all(e)) ? ee(u, i, o) : (u = Ge.race(e)) ? ne(u, i, o) : (u = Ge.call(e)) ? q(u, i, o) : (u = Ge.cps(e)) ? G(u, o) : (u = Ge.fork(e)) ? K(u, i, o) : (u = Ge.join(e)) ? X(u, o) : (u = Ge.cancel(e)) ? J(u, o) : (u = Ge.select(e)) ? re(u, o) : (u = Ge.actionChannel(e)) ? ie(u, o) : (u = Ge.flush(e)) ? le(u, o) : (u = Ge.cancelled(e)) ? ae(u, o) : (u = Ge.getContext(e)) ? se(u, o) : (u = Ge.setContext(e)) ? ce(u, o) : o(e);
  }
  function I(e, t) {
    var n = e[c];
    _.func(n) ? t.cancel = n : _.func(e.abort) && (t.cancel = function () {
      return e.abort();
    }), e.then(t, function (e) {
      return t(e, !0);
    });
  }
  function U(e, i, o, u) {
    at(e, t, n, r, C, a, i, o, u);
  }
  function W(e, t) {
    var n = e.channel,
      r = e.pattern,
      i = e.maybe;
    n = n || E;
    var a = function (e) {
      return e instanceof Error ? t(e, !0) : te(e) && !i ? t(Xe) : t(e);
    };
    try {
      n.take(a, tt(r));
    } catch (e) {
      return t(e, !0);
    }
    t.cancel = a.cancel;
  }
  function B(e, t) {
    var r = e.channel,
      i = e.action,
      a = e.resolve;
    Q(function () {
      var e = void 0;
      try {
        e = (r ? r.put : n)(i);
      } catch (e) {
        if (r || a) return t(e, !0);
        T(e);
      }
      if (!a || !_.promise(e)) return t(e);
      I(e, t);
    });
  }
  function q(e, t, n) {
    var r = e.context,
      i = e.fn,
      a = e.args,
      o = void 0;
    try {
      o = i.apply(r, a);
    } catch (e) {
      return n(e, !0);
    }
    return _.promise(o) ? I(o, n) : _.iterator(o) ? U(o, t, i.name, n) : n(o);
  }
  function G(e, t) {
    var n = e.context,
      r = e.fn,
      i = e.args;
    try {
      var a = function (e, n) {
        return _.undef(e) ? t(n) : t(e, !0);
      };
      r.apply(n, i.concat(a)), a.cancel && (t.cancel = function () {
        return a.cancel();
      });
    } catch (e) {
      return t(e, !0);
    }
  }
  function K(e, i, o) {
    var u = e.context,
      l = e.fn,
      s = e.args,
      c = e.detached,
      f = rt({
        context: u,
        fn: l,
        args: s
      });
    try {
      $();
      var d = at(f, t, n, r, C, a, i, l.name, c ? null : m);
      c ? o(d) : f._isRunning ? (Y.addTask(d), o(d)) : f._error ? Y.abort(f._error) : o(d);
    } finally {
      Z();
    }
  }
  function X(e, t) {
    if (e.isRunning()) {
      var n = {
        task: O,
        cb: t
      };
      t.cancel = function () {
        return k(e.joiners, n);
      }, e.joiners.push(n);
    } else e.isAborted() ? t(e.error(), !0) : t(e.result());
  }
  function J(e, t) {
    e === d && (e = O), e.isRunning() && e.cancel(), t();
  }
  function ee(e, t, n) {
    var r = Object.keys(e);
    if (!r.length) return n(_.array(e) ? [] : {});
    var i = 0,
      a = void 0,
      o = {},
      u = {};
    function l() {
      i === r.length && (a = !0, n(_.array(e) ? S.from(Qe({}, o, {
        length: r.length
      })) : o));
    }
    r.forEach(function (e) {
      var t = function (t, r) {
        a || (r || te(t) || t === Xe || t === Je ? (n.cancel(), n(t, r)) : (o[e] = t, i++, l()));
      };
      t.cancel = m, u[e] = t;
    }), n.cancel = function () {
      a || (a = !0, r.forEach(function (e) {
        return u[e].cancel();
      }));
    }, r.forEach(function (n) {
      return z(e[n], t, n, u[n]);
    });
  }
  function ne(e, t, n) {
    var r = void 0,
      i = Object.keys(e),
      a = {};
    i.forEach(function (t) {
      var o = function (a, o) {
        if (!r) if (o) n.cancel(), n(a, !0);else if (!te(a) && a !== Xe && a !== Je) {
          var u;
          n.cancel(), r = !0;
          var l = (u = {}, u[t] = a, u);
          n(_.array(e) ? [].slice.call(Qe({}, l, {
            length: i.length
          })) : l);
        }
      };
      o.cancel = m, a[t] = o;
    }), n.cancel = function () {
      r || (r = !0, i.forEach(function (e) {
        return a[e].cancel();
      }));
    }, i.forEach(function (n) {
      r || z(e[n], t, n, a[n]);
    });
  }
  function re(e, t) {
    var n = e.selector,
      i = e.args;
    try {
      var a = n.apply(void 0, [r()].concat(i));
      t(a);
    } catch (e) {
      t(e, !0);
    }
  }
  function ie(e, n) {
    var r = e.pattern,
      i = e.buffer,
      a = tt(r);
    a.pattern = r, n(oe(t, i || H.fixed(), a));
  }
  function ae(e, t) {
    t(!!D.isCancelled);
  }
  function le(e, t) {
    e.flush(t);
  }
  function se(e, t) {
    t(C[e]);
  }
  function ce(e, t) {
    w.assign(C, e), t();
  }
  function fe(e, t, n, r) {
    var i, a, o;
    return n._deferredEnd = null, a = {}, a[u] = !0, a.id = e, a.name = t, i = "done", o = {}, o[i] = o[i] || {}, o[i].get = function () {
      if (n._deferredEnd) return n._deferredEnd.promise;
      var e = x();
      return n._deferredEnd = e, n._isRunning || (n._error ? e.reject(n._error) : e.resolve(n._result)), e.promise;
    }, a.cont = r, a.joiners = [], a.cancel = A, a.isRunning = function () {
      return n._isRunning;
    }, a.isCancelled = function () {
      return n._isCancelled;
    }, a.isAborted = function () {
      return n._isAborted;
    }, a.result = function () {
      return n._result;
    }, a.error = function () {
      return n._error;
    }, a.setContext = function (e) {
      g(e, _.object, R("task", e)), w.assign(C, e);
    }, Ke(a, o), a;
  }
}
var ot = "runSaga(storeInterface, saga, ...args)",
  ut = ot + ": saga argument must be a Generator function!";
function lt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var a = void 0;
  _.iterator(e) ? (a = e, e = t) : (g(t, _.func, ut), a = t.apply(void 0, r), g(a, _.iterator, ut));
  var o = e,
    u = o.subscribe,
    l = o.dispatch,
    s = o.getState,
    c = o.context,
    f = o.sagaMonitor,
    d = o.logger,
    h = o.onError,
    p = M();
  f && (f.effectTriggered = f.effectTriggered || m, f.effectResolved = f.effectResolved || m, f.effectRejected = f.effectRejected || m, f.effectCancelled = f.effectCancelled || m, f.actionDispatched = f.actionDispatched || m, f.effectTriggered({
    effectId: p,
    root: !0,
    parentEffectId: 0,
    effect: {
      root: !0,
      saga: t,
      args: r
    }
  }));
  var v = at(a, u, j(l), s, c, {
    sagaMonitor: f,
    logger: d,
    onError: h
  }, p, t.name);
  return f && f.effectResolved(p, v), v;
}
function st(e, t) {
  var n = {};
  for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  return n;
}
function ct() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.context,
    n = void 0 === t ? {} : t,
    r = st(e, ["context"]),
    i = r.sagaMonitor,
    a = r.logger,
    o = r.onError;
  if (_.func(r)) throw new Error("Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead");
  if (a && !_.func(a)) throw new Error("`options.logger` passed to the Saga middleware is not a function!");
  if (o && !_.func(o)) throw new Error("`options.onError` passed to the Saga middleware is not a function!");
  if (r.emitter && !_.func(r.emitter)) throw new Error("`options.emitter` passed to the Saga middleware is not a function!");
  function u(e) {
    var t = e.getState,
      l = e.dispatch,
      s = ne();
    return s.emit = (r.emitter || v)(s.emit), u.run = lt.bind(null, {
      context: n,
      subscribe: s.subscribe,
      dispatch: l,
      getState: t,
      sagaMonitor: i,
      logger: a,
      onError: o
    }), function (e) {
      return function (t) {
        i && i.actionDispatched && i.actionDispatched(t);
        var n = e(t);
        return s.emit(t), n;
      };
    };
  }
  return u.run = function () {
    throw new Error("Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware");
  }, u.setContext = function (e) {
    g(e, _.object, R("sagaMiddleware", e)), w.assign(n, e);
  }, u;
}
var ft = {
    done: !0,
    value: void 0
  },
  dt = {};
function ht(e) {
  return _.channel(e) ? "channel" : Array.isArray(e) ? String(e.map(function (e) {
    return String(e);
  })) : String(e);
}
function pt(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "iterator",
    r = void 0,
    i = t;
  function a(t, n) {
    if (i === dt) return ft;
    if (n) throw i = dt, n;
    r && r(t);
    var a = e[i](),
      o = a[0],
      u = a[1],
      l = a[2];
    return i = o, r = l, i === dt ? ft : u;
  }
  return D(a, function (e) {
    return a(null, e);
  }, n, !0);
}
function mt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var a = {
      done: !1,
      value: Me(e)
    },
    o = function (e) {
      return {
        done: !1,
        value: je.apply(void 0, [t].concat(r, [e]))
      };
    },
    u = void 0,
    l = function (e) {
      return u = e;
    };
  return pt({
    q1: function () {
      return ["q2", a, l];
    },
    q2: function () {
      return u === ee ? [dt] : ["q1", o(u)];
    }
  }, "q1", "takeEvery(" + ht(e) + ", " + t.name + ")");
}
function vt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var a = {
      done: !1,
      value: Me(e)
    },
    o = function (e) {
      return {
        done: !1,
        value: je.apply(void 0, [t].concat(r, [e]))
      };
    },
    u = function (e) {
      return {
        done: !1,
        value: Fe(e)
      };
    },
    l = void 0,
    s = void 0,
    c = function (e) {
      return l = e;
    },
    f = function (e) {
      return s = e;
    };
  return pt({
    q1: function () {
      return ["q2", a, f];
    },
    q2: function () {
      return s === ee ? [dt] : l ? ["q3", u(l)] : ["q1", o(s), c];
    },
    q3: function () {
      return ["q1", o(s), c];
    }
  }, "q1", "takeLatest(" + ht(e) + ", " + t.name + ")");
}
function gt(e, t, n) {
  for (var r = arguments.length, i = Array(r > 3 ? r - 3 : 0), a = 3; a < r; a++) i[a - 3] = arguments[a];
  var o = void 0,
    u = void 0,
    l = {
      done: !1,
      value: Ie(t, H.sliding(1))
    },
    s = function () {
      return {
        done: !1,
        value: Me(u)
      };
    },
    c = function (e) {
      return {
        done: !1,
        value: je.apply(void 0, [n].concat(i, [e]))
      };
    },
    f = {
      done: !1,
      value: Le(T, e)
    },
    d = function (e) {
      return o = e;
    },
    h = function (e) {
      return u = e;
    };
  return pt({
    q1: function () {
      return ["q2", l, h];
    },
    q2: function () {
      return ["q3", s(), d];
    },
    q3: function () {
      return o === ee ? [dt] : ["q4", c(o)];
    },
    q4: function () {
      return ["q2", f];
    }
  }, "q1", "throttle(" + ht(t) + ", " + n.name + ")");
}
function yt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  return je.apply(void 0, [mt, e, t].concat(r));
}
function bt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  return je.apply(void 0, [vt, e, t].concat(r));
}
function _t(e, t, n) {
  for (var r = arguments.length, i = Array(r > 3 ? r - 3 : 0), a = 3; a < r; a++) i[a - 3] = arguments[a];
  return je.apply(void 0, [gt, e, t, n].concat(i));
}
defineExport(legacyExports, "b", function () {
  return r;
});
legacyExports["a"] = ct;
