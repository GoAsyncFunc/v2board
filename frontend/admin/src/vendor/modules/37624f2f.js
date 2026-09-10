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
  return Te;
}), defineExport(r, "all", function () {
  return Ie;
}), defineExport(r, "race", function () {
  return De;
}), defineExport(r, "call", function () {
  return Ee;
}), defineExport(r, "apply", function () {
  return Pe;
}), defineExport(r, "cps", function () {
  return Le;
}), defineExport(r, "fork", function () {
  return Ne;
}), defineExport(r, "spawn", function () {
  return Re;
}), defineExport(r, "join", function () {
  return ze;
}), defineExport(r, "cancel", function () {
  return Fe;
}), defineExport(r, "select", function () {
  return Be;
}), defineExport(r, "actionChannel", function () {
  return Ye;
}), defineExport(r, "cancelled", function () {
  return Ve;
}), defineExport(r, "flush", function () {
  return Ge;
}), defineExport(r, "getContext", function () {
  return We;
}), defineExport(r, "setContext", function () {
  return Ue;
}), defineExport(r, "takeEvery", function () {
  return yt;
}), defineExport(r, "takeLatest", function () {
  return bt;
}), defineExport(r, "throttle", function () {
  return xt;
});
var i = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  o = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  },
  a = function (e) {
    return "@@redux-saga/" + e;
  },
  s = a("TASK"),
  l = a("HELPER"),
  u = a("MATCH"),
  c = a("CANCEL_PROMISE"),
  f = a("SAGA_ACTION"),
  d = a("SELF_CANCELLATION"),
  h = function (e) {
    return function () {
      return e;
    };
  },
  p = h(!0),
  g = function () {},
  m = function (e) {
    return e;
  };
function v(e, t, n) {
  if (!t(e)) throw D("error", "uncaught at check", n), new Error(n);
}
var y = Object.prototype.hasOwnProperty;
function b(e, t) {
  return x.notUndef(e) && y.call(e, t);
}
var x = {
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
      return e && !x.array(e) && "object" === ("undefined" === typeof e ? "undefined" : o(e));
    },
    promise: function (e) {
      return e && x.func(e.then);
    },
    iterator: function (e) {
      return e && x.func(e.next) && x.func(e.throw);
    },
    iterable: function (e) {
      return e && x.func(Symbol) ? x.func(e[Symbol.iterator]) : x.array(e);
    },
    task: function (e) {
      return e && e[s];
    },
    observable: function (e) {
      return e && x.func(e.subscribe);
    },
    buffer: function (e) {
      return e && x.func(e.isEmpty) && x.func(e.take) && x.func(e.put);
    },
    pattern: function (e) {
      return e && (x.string(e) || "symbol" === ("undefined" === typeof e ? "undefined" : o(e)) || x.func(e) || x.array(e));
    },
    channel: function (e) {
      return e && x.func(e.take) && x.func(e.close);
    },
    helper: function (e) {
      return e && e[l];
    },
    stringableFunc: function (e) {
      return x.func(e) && b(e, "toString");
    }
  },
  _ = {
    assign: function (e, t) {
      for (var n in t) b(t, n) && (e[n] = t[n]);
    }
  };
function w(e, t) {
  var n = e.indexOf(t);
  n >= 0 && e.splice(n, 1);
}
var O = {
  from: function (e) {
    var t = Array(e.length);
    for (var n in e) b(e, n) && (t[n] = e[n]);
    return t;
  }
};
function S() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = i({}, e),
    n = new Promise(function (e, n) {
      t.resolve = e, t.reject = n;
    });
  return t.promise = n, t;
}
function k(e) {
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
function j() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
  return function () {
    return ++e;
  };
}
var M = j(),
  C = function (e) {
    throw e;
  },
  T = function (e) {
    return {
      value: e,
      done: !0
    };
  };
function I(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : C,
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
    r = arguments[3],
    i = {
      name: n,
      next: e,
      throw: t,
      return: T
    };
  return r && (i[l] = !0), "undefined" !== typeof Symbol && (i[Symbol.iterator] = function () {
    return i;
  }), i;
}
function D(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
  "undefined" === typeof window ? console.log("redux-saga " + e + ": " + t + "\n" + (n && n.stack || n)) : console[e](t, n);
}
function A(e, t) {
  return function () {
    return e.apply(void 0, arguments);
  };
}
var E = function (e, t) {
    return e + " has been deprecated in favor of " + t + ", please update your code";
  },
  P = function (e) {
    return new Error("\n  redux-saga: Error checking hooks detected an inconsistent state. This is likely a bug\n  in redux-saga code and not yours. Thanks for reporting this in the project's github repo.\n  Error: " + e + "\n");
  },
  L = function (e, t) {
    return (e ? e + "." : "") + "setContext(props): argument " + t + " is not a plain object";
  },
  N = function (e) {
    return function (t) {
      return e(Object.defineProperty(t, f, {
        value: !0
      }));
    };
  },
  R = "Channel's Buffer overflow!",
  z = 1,
  F = 2,
  B = 3,
  Y = 4,
  V = {
    isEmpty: p,
    put: g,
    take: g
  };
function G() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10,
    t = arguments[1],
    n = new Array(e),
    r = 0,
    i = 0,
    o = 0,
    a = function (t) {
      n[i] = t, i = (i + 1) % e, r++;
    },
    s = function () {
      if (0 != r) {
        var t = n[o];
        return n[o] = null, r--, o = (o + 1) % e, t;
      }
    },
    l = function () {
      var e = [];
      while (r) e.push(s());
      return e;
    };
  return {
    isEmpty: function () {
      return 0 == r;
    },
    put: function (s) {
      if (r < e) a(s);else {
        var u = void 0;
        switch (t) {
          case z:
            throw new Error(R);
          case B:
            n[i] = s, i = (i + 1) % e, o = i;
            break;
          case Y:
            u = 2 * e, n = l(), r = n.length, i = n.length, o = 0, n.length = u, e = u, a(s);
            break;
          default:
        }
      }
    },
    take: s,
    flush: l
  };
}
var W = {
    none: function () {
      return V;
    },
    fixed: function (e) {
      return G(e, z);
    },
    dropping: function (e) {
      return G(e, F);
    },
    sliding: function (e) {
      return G(e, B);
    },
    expanding: function (e) {
      return G(e, Y);
    }
  },
  U = [],
  H = 0;
function q(e) {
  try {
    Z(), e();
  } finally {
    X();
  }
}
function K(e) {
  U.push(e), H || (Z(), Q());
}
function Z() {
  H++;
}
function X() {
  H--;
}
function Q() {
  X();
  var e = void 0;
  while (!H && void 0 !== (e = U.shift())) q(e);
}
var $ = Object.assign || function (e) {
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
      return w(e, t);
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
function oe() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : W.fixed(),
    t = !1,
    n = [];
  function r() {
    if (t && n.length) throw P("Cannot have a closed channel with pending takers");
    if (n.length && !e.isEmpty()) throw P("Cannot have pending takers with non empty buffer");
  }
  function i(i) {
    if (r(), v(i, x.notUndef, ie), !t) {
      if (!n.length) return e.put(i);
      for (var o = 0; o < n.length; o++) {
        var a = n[o];
        if (!a[u] || a[u](i)) return n.splice(o, 1), a(i);
      }
    }
  }
  function o(i) {
    r(), v(i, x.func, "channel.take's callback must be a function"), t && e.isEmpty() ? i(ee) : e.isEmpty() ? (n.push(i), i.cancel = function () {
      return w(n, i);
    }) : i(e.take());
  }
  function a(n) {
    r(), v(n, x.func, "channel.flush' callback must be a function"), t && e.isEmpty() ? n(ee) : n(e.flush());
  }
  function s() {
    if (r(), !t && (t = !0, n.length)) {
      var e = n;
      n = [];
      for (var i = 0, o = e.length; i < o; i++) e[i](ee);
    }
  }
  return v(e, x.buffer, re), {
    take: o,
    put: i,
    flush: a,
    close: s,
    get __takers__() {
      return n;
    },
    get __closed__() {
      return t;
    }
  };
}
function ae(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : W.none(),
    n = arguments[2];
  arguments.length > 2 && v(n, x.func, "Invalid match function passed to eventChannel");
  var r = oe(t),
    i = function () {
      r.__closed__ || (o && o(), r.close());
    },
    o = e(function (e) {
      te(e) ? i() : n && !n(e) || r.put(e);
    });
  if (r.__closed__ && o(), !x.func(o)) throw new Error("in eventChannel: subscribe should return a function to unsubscribe");
  return {
    take: r.take,
    flush: r.flush,
    close: i
  };
}
function se(e) {
  var t = ae(function (t) {
    return e(function (e) {
      e[f] ? t(e) : K(function () {
        return t(e);
      });
    });
  });
  return $({}, t, {
    take: function (e, n) {
      arguments.length > 1 && (v(n, x.func, "channel.take's matcher argument must be a function"), e[u] = n), t.take(e);
    }
  });
}
var le = a("IO"),
  ue = "TAKE",
  ce = "PUT",
  fe = "ALL",
  de = "RACE",
  he = "CALL",
  pe = "CPS",
  ge = "FORK",
  me = "JOIN",
  ve = "CANCEL",
  ye = "SELECT",
  be = "ACTION_CHANNEL",
  xe = "CANCELLED",
  _e = "FLUSH",
  we = "GET_CONTEXT",
  Oe = "SET_CONTEXT",
  Se = "\n(HINT: if you are getting this errors in tests, consider using createMockTask from redux-saga/utils)",
  ke = function (e, t) {
    var n;
    return n = {}, n[le] = !0, n[e] = t, n;
  },
  je = function (e) {
    return v(qe.fork(e), x.object, "detach(eff): argument must be a fork effect"), e[ge].detached = !0, e;
  };
function Me() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "*";
  if (arguments.length && v(arguments[0], x.notUndef, "take(patternOrChannel): patternOrChannel is undefined"), x.pattern(e)) return ke(ue, {
    pattern: e
  });
  if (x.channel(e)) return ke(ue, {
    channel: e
  });
  throw new Error("take(patternOrChannel): argument " + String(e) + " is not valid channel or a valid pattern");
}
Me.maybe = function () {
  var e = Me.apply(void 0, arguments);
  return e[ue].maybe = !0, e;
};
var Ce = A(Me.maybe, E("takem", "take.maybe"));
function Te(e, t) {
  return arguments.length > 1 ? (v(e, x.notUndef, "put(channel, action): argument channel is undefined"), v(e, x.channel, "put(channel, action): argument " + e + " is not a valid channel"), v(t, x.notUndef, "put(channel, action): argument action is undefined")) : (v(e, x.notUndef, "put(action): argument action is undefined"), t = e, e = null), ke(ce, {
    channel: e,
    action: t
  });
}
function Ie(e) {
  return ke(fe, e);
}
function De(e) {
  return ke(de, e);
}
function Ae(e, t, n) {
  v(t, x.notUndef, e + ": argument fn is undefined");
  var r = null;
  if (x.array(t)) {
    var i = t;
    r = i[0], t = i[1];
  } else if (t.fn) {
    var o = t;
    r = o.context, t = o.fn;
  }
  return r && x.string(t) && x.func(r[t]) && (t = r[t]), v(t, x.func, e + ": argument " + t + " is not a function"), {
    context: r,
    fn: t,
    args: n
  };
}
function Ee(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return ke(he, Ae("call", e, n));
}
function Pe(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
  return ke(he, Ae("apply", {
    context: e,
    fn: t
  }, n));
}
function Le(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return ke(pe, Ae("cps", e, n));
}
function Ne(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return ke(ge, Ae("fork", e, n));
}
function Re(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return je(Ne.apply(void 0, [e].concat(n)));
}
function ze() {
  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (t.length > 1) return Ie(t.map(function (e) {
    return ze(e);
  }));
  var r = t[0];
  return v(r, x.notUndef, "join(task): argument task is undefined"), v(r, x.task, "join(task): argument " + r + " is not a valid Task object " + Se), ke(me, r);
}
function Fe() {
  for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
  if (t.length > 1) return Ie(t.map(function (e) {
    return Fe(e);
  }));
  var r = t[0];
  return 1 === t.length && (v(r, x.notUndef, "cancel(task): argument task is undefined"), v(r, x.task, "cancel(task): argument " + r + " is not a valid Task object " + Se)), ke(ve, r || d);
}
function Be(e) {
  for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
  return 0 === arguments.length ? e = m : (v(e, x.notUndef, "select(selector,[...]): argument selector is undefined"), v(e, x.func, "select(selector,[...]): argument " + e + " is not a function")), ke(ye, {
    selector: e,
    args: n
  });
}
function Ye(e, t) {
  return v(e, x.notUndef, "actionChannel(pattern,...): argument pattern is undefined"), arguments.length > 1 && (v(t, x.notUndef, "actionChannel(pattern, buffer): argument buffer is undefined"), v(t, x.buffer, "actionChannel(pattern, buffer): argument " + t + " is not a valid buffer")), ke(be, {
    pattern: e,
    buffer: t
  });
}
function Ve() {
  return ke(xe, {});
}
function Ge(e) {
  return v(e, x.channel, "flush(channel): argument " + e + " is not valid channel"), ke(_e, e);
}
function We(e) {
  return v(e, x.string, "getContext(prop): argument " + e + " is not a string"), ke(we, e);
}
function Ue(e) {
  return v(e, x.object, L(null, e)), ke(Oe, e);
}
Te.resolve = function () {
  var e = Te.apply(void 0, arguments);
  return e[ce].resolve = !0, e;
}, Te.sync = A(Te.resolve, E("put.sync", "put.resolve"));
var He = function (e) {
    return function (t) {
      return t && t[le] && t[e];
    };
  },
  qe = {
    take: He(ue),
    put: He(ce),
    all: He(fe),
    race: He(de),
    call: He(he),
    cps: He(pe),
    fork: He(ge),
    join: He(me),
    cancel: He(ve),
    select: He(ye),
    actionChannel: He(be),
    cancelled: He(xe),
    flush: He(_e),
    getContext: He(we),
    setContext: He(Oe)
  },
  Ke = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  },
  Ze = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  };
function Xe(e, t) {
  for (var n in t) {
    var r = t[n];
    r.configurable = r.enumerable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, n, r);
  }
  return e;
}
var Qe = "proc first argument (Saga function result) must be an iterator",
  $e = {
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
      return "symbol" === ("undefined" === typeof e ? "undefined" : Ze(e)) ? function (t) {
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
  return ("*" === e ? et.wildcard : x.array(e) ? et.array : x.stringableFunc(e) ? et.default : x.func(e) ? et.predicate : et.default)(e);
}
function nt(e, t, n) {
  var r = [],
    i = void 0,
    o = !1;
  function a(e) {
    l(), n(e, !0);
  }
  function s(e) {
    r.push(e), e.cont = function (s, l) {
      o || (w(r, e), e.cont = g, l ? a(s) : (e === t && (i = s), r.length || (o = !0, n(i))));
    };
  }
  function l() {
    o || (o = !0, r.forEach(function (e) {
      e.cont = g, e.cancel();
    }), r = []);
  }
  return s(t), {
    addTask: s,
    cancelAll: l,
    abort: a,
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
  if (x.iterator(n)) return n;
  var i = void 0,
    o = void 0;
  try {
    i = n.apply(t, r);
  } catch (e) {
    o = e;
  }
  return x.iterator(i) ? i : I(o ? function () {
    throw o;
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
function ot(e) {
  var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function () {
      return g;
    },
    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : g,
    r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : g,
    i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {},
    o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
    a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
    l = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : "anonymous",
    u = arguments[8];
  v(e, x.iterator, Qe);
  var f = "[...effects]",
    h = A(ee, E(f, "all(" + f + ")")),
    p = o.sagaMonitor,
    m = o.logger,
    y = o.onError,
    b = m || D,
    k = function (e) {
      var t = e.sagaStack;
      !t && e.stack && (t = -1 !== e.stack.split("\n")[0].indexOf(e.message) ? e.stack : "Error: " + e.message + "\n" + e.stack), b("error", "uncaught at " + l, t || e.message || e);
    },
    j = se(t),
    C = Object.create(i);
  z.cancel = g;
  var T = fe(a, l, e, u),
    I = {
      name: l,
      cancel: N,
      isRunning: !0
    },
    P = nt(l, I, F);
  function N() {
    I.isRunning && !I.isCancelled && (I.isCancelled = !0, z(Je));
  }
  function R() {
    e._isRunning && !e._isCancelled && (e._isCancelled = !0, P.cancelAll(), F(Je));
  }
  return u && (u.cancel = R), e._isRunning = !0, z(), T;
  function z(t, n) {
    if (!I.isRunning) throw new Error("Trying to resume an already finished generator");
    try {
      var r = void 0;
      n ? r = e.throw(t) : t === Je ? (I.isCancelled = !0, z.cancel(), r = x.func(e.return) ? e.return(Je) : {
        done: !0,
        value: Je
      }) : r = t === $e ? x.func(e.return) ? e.return() : {
        done: !0
      } : e.next(t), r.done ? (I.isMainRunning = !1, I.cont && I.cont(r.value)) : B(r.value, a, "", z);
    } catch (e) {
      I.isCancelled && k(e), I.isMainRunning = !1, I.cont(e, !0);
    }
  }
  function F(t, n) {
    e._isRunning = !1, j.close(), n ? (t instanceof Error && Object.defineProperty(t, "sagaStack", {
      value: "at " + l + " \n " + (t.sagaStack || t.stack),
      configurable: !0
    }), T.cont || (t instanceof Error && y ? y(t) : k(t)), e._error = t, e._isAborted = !0, e._deferredEnd && e._deferredEnd.reject(t)) : (e._result = t, e._deferredEnd && e._deferredEnd.resolve(t)), T.cont && T.cont(t, n), T.joiners.forEach(function (e) {
      return e.cb(t, n);
    }), T.joiners = null;
  }
  function B(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
      r = arguments[3],
      i = M();
    p && p.effectTriggered({
      effectId: i,
      parentEffectId: t,
      label: n,
      effect: e
    });
    var o = void 0;
    function a(e, t) {
      o || (o = !0, r.cancel = g, p && (t ? p.effectRejected(i, e) : p.effectResolved(i, e)), r(e, t));
    }
    a.cancel = g, r.cancel = function () {
      if (!o) {
        o = !0;
        try {
          a.cancel();
        } catch (e) {
          k(e);
        }
        a.cancel = g, p && p.effectCancelled(i);
      }
    };
    var s = void 0;
    return x.promise(e) ? Y(e, a) : x.helper(e) ? X(it(e), i, a) : x.iterator(e) ? V(e, i, l, a) : x.array(e) ? h(e, i, a) : (s = qe.take(e)) ? G(s, a) : (s = qe.put(e)) ? U(s, a) : (s = qe.all(e)) ? ee(s, i, a) : (s = qe.race(e)) ? ne(s, i, a) : (s = qe.call(e)) ? H(s, i, a) : (s = qe.cps(e)) ? q(s, a) : (s = qe.fork(e)) ? X(s, i, a) : (s = qe.join(e)) ? $(s, a) : (s = qe.cancel(e)) ? J(s, a) : (s = qe.select(e)) ? re(s, a) : (s = qe.actionChannel(e)) ? ie(s, a) : (s = qe.flush(e)) ? le(s, a) : (s = qe.cancelled(e)) ? oe(s, a) : (s = qe.getContext(e)) ? ue(s, a) : (s = qe.setContext(e)) ? ce(s, a) : a(e);
  }
  function Y(e, t) {
    var n = e[c];
    x.func(n) ? t.cancel = n : x.func(e.abort) && (t.cancel = function () {
      return e.abort();
    }), e.then(t, function (e) {
      return t(e, !0);
    });
  }
  function V(e, i, a, s) {
    ot(e, t, n, r, C, o, i, a, s);
  }
  function G(e, t) {
    var n = e.channel,
      r = e.pattern,
      i = e.maybe;
    n = n || j;
    var o = function (e) {
      return e instanceof Error ? t(e, !0) : te(e) && !i ? t($e) : t(e);
    };
    try {
      n.take(o, tt(r));
    } catch (e) {
      return t(e, !0);
    }
    t.cancel = o.cancel;
  }
  function U(e, t) {
    var r = e.channel,
      i = e.action,
      o = e.resolve;
    K(function () {
      var e = void 0;
      try {
        e = (r ? r.put : n)(i);
      } catch (e) {
        if (r || o) return t(e, !0);
        k(e);
      }
      if (!o || !x.promise(e)) return t(e);
      Y(e, t);
    });
  }
  function H(e, t, n) {
    var r = e.context,
      i = e.fn,
      o = e.args,
      a = void 0;
    try {
      a = i.apply(r, o);
    } catch (e) {
      return n(e, !0);
    }
    return x.promise(a) ? Y(a, n) : x.iterator(a) ? V(a, t, i.name, n) : n(a);
  }
  function q(e, t) {
    var n = e.context,
      r = e.fn,
      i = e.args;
    try {
      var o = function (e, n) {
        return x.undef(e) ? t(n) : t(e, !0);
      };
      r.apply(n, i.concat(o)), o.cancel && (t.cancel = function () {
        return o.cancel();
      });
    } catch (e) {
      return t(e, !0);
    }
  }
  function X(e, i, a) {
    var s = e.context,
      l = e.fn,
      u = e.args,
      c = e.detached,
      f = rt({
        context: s,
        fn: l,
        args: u
      });
    try {
      Z();
      var d = ot(f, t, n, r, C, o, i, l.name, c ? null : g);
      c ? a(d) : f._isRunning ? (P.addTask(d), a(d)) : f._error ? P.abort(f._error) : a(d);
    } finally {
      Q();
    }
  }
  function $(e, t) {
    if (e.isRunning()) {
      var n = {
        task: T,
        cb: t
      };
      t.cancel = function () {
        return w(e.joiners, n);
      }, e.joiners.push(n);
    } else e.isAborted() ? t(e.error(), !0) : t(e.result());
  }
  function J(e, t) {
    e === d && (e = T), e.isRunning() && e.cancel(), t();
  }
  function ee(e, t, n) {
    var r = Object.keys(e);
    if (!r.length) return n(x.array(e) ? [] : {});
    var i = 0,
      o = void 0,
      a = {},
      s = {};
    function l() {
      i === r.length && (o = !0, n(x.array(e) ? O.from(Ke({}, a, {
        length: r.length
      })) : a));
    }
    r.forEach(function (e) {
      var t = function (t, r) {
        o || (r || te(t) || t === $e || t === Je ? (n.cancel(), n(t, r)) : (a[e] = t, i++, l()));
      };
      t.cancel = g, s[e] = t;
    }), n.cancel = function () {
      o || (o = !0, r.forEach(function (e) {
        return s[e].cancel();
      }));
    }, r.forEach(function (n) {
      return B(e[n], t, n, s[n]);
    });
  }
  function ne(e, t, n) {
    var r = void 0,
      i = Object.keys(e),
      o = {};
    i.forEach(function (t) {
      var a = function (o, a) {
        if (!r) if (a) n.cancel(), n(o, !0);else if (!te(o) && o !== $e && o !== Je) {
          var s;
          n.cancel(), r = !0;
          var l = (s = {}, s[t] = o, s);
          n(x.array(e) ? [].slice.call(Ke({}, l, {
            length: i.length
          })) : l);
        }
      };
      a.cancel = g, o[t] = a;
    }), n.cancel = function () {
      r || (r = !0, i.forEach(function (e) {
        return o[e].cancel();
      }));
    }, i.forEach(function (n) {
      r || B(e[n], t, n, o[n]);
    });
  }
  function re(e, t) {
    var n = e.selector,
      i = e.args;
    try {
      var o = n.apply(void 0, [r()].concat(i));
      t(o);
    } catch (e) {
      t(e, !0);
    }
  }
  function ie(e, n) {
    var r = e.pattern,
      i = e.buffer,
      o = tt(r);
    o.pattern = r, n(ae(t, i || W.fixed(), o));
  }
  function oe(e, t) {
    t(!!I.isCancelled);
  }
  function le(e, t) {
    e.flush(t);
  }
  function ue(e, t) {
    t(C[e]);
  }
  function ce(e, t) {
    _.assign(C, e), t();
  }
  function fe(e, t, n, r) {
    var i, o, a;
    return n._deferredEnd = null, o = {}, o[s] = !0, o.id = e, o.name = t, i = "done", a = {}, a[i] = a[i] || {}, a[i].get = function () {
      if (n._deferredEnd) return n._deferredEnd.promise;
      var e = S();
      return n._deferredEnd = e, n._isRunning || (n._error ? e.reject(n._error) : e.resolve(n._result)), e.promise;
    }, o.cont = r, o.joiners = [], o.cancel = R, o.isRunning = function () {
      return n._isRunning;
    }, o.isCancelled = function () {
      return n._isCancelled;
    }, o.isAborted = function () {
      return n._isAborted;
    }, o.result = function () {
      return n._result;
    }, o.error = function () {
      return n._error;
    }, o.setContext = function (e) {
      v(e, x.object, L("task", e)), _.assign(C, e);
    }, Xe(o, a), o;
  }
}
var at = "runSaga(storeInterface, saga, ...args)",
  st = at + ": saga argument must be a Generator function!";
function lt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var o = void 0;
  x.iterator(e) ? (o = e, e = t) : (v(t, x.func, st), o = t.apply(void 0, r), v(o, x.iterator, st));
  var a = e,
    s = a.subscribe,
    l = a.dispatch,
    u = a.getState,
    c = a.context,
    f = a.sagaMonitor,
    d = a.logger,
    h = a.onError,
    p = M();
  f && (f.effectTriggered = f.effectTriggered || g, f.effectResolved = f.effectResolved || g, f.effectRejected = f.effectRejected || g, f.effectCancelled = f.effectCancelled || g, f.actionDispatched = f.actionDispatched || g, f.effectTriggered({
    effectId: p,
    root: !0,
    parentEffectId: 0,
    effect: {
      root: !0,
      saga: t,
      args: r
    }
  }));
  var m = ot(o, s, N(l), u, c, {
    sagaMonitor: f,
    logger: d,
    onError: h
  }, p, t.name);
  return f && f.effectResolved(p, m), m;
}
function ut(e, t) {
  var n = {};
  for (var r in e) t.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
  return n;
}
function ct() {
  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
    t = e.context,
    n = void 0 === t ? {} : t,
    r = ut(e, ["context"]),
    i = r.sagaMonitor,
    o = r.logger,
    a = r.onError;
  if (x.func(r)) throw new Error("Saga middleware no longer accept Generator functions. Use sagaMiddleware.run instead");
  if (o && !x.func(o)) throw new Error("`options.logger` passed to the Saga middleware is not a function!");
  if (a && !x.func(a)) throw new Error("`options.onError` passed to the Saga middleware is not a function!");
  if (r.emitter && !x.func(r.emitter)) throw new Error("`options.emitter` passed to the Saga middleware is not a function!");
  function s(e) {
    var t = e.getState,
      l = e.dispatch,
      u = ne();
    return u.emit = (r.emitter || m)(u.emit), s.run = lt.bind(null, {
      context: n,
      subscribe: u.subscribe,
      dispatch: l,
      getState: t,
      sagaMonitor: i,
      logger: o,
      onError: a
    }), function (e) {
      return function (t) {
        i && i.actionDispatched && i.actionDispatched(t);
        var n = e(t);
        return u.emit(t), n;
      };
    };
  }
  return s.run = function () {
    throw new Error("Before running a Saga, you must mount the Saga middleware on the Store using applyMiddleware");
  }, s.setContext = function (e) {
    v(e, x.object, L("sagaMiddleware", e)), _.assign(n, e);
  }, s;
}
var ft = {
    done: !0,
    value: void 0
  },
  dt = {};
function ht(e) {
  return x.channel(e) ? "channel" : Array.isArray(e) ? String(e.map(function (e) {
    return String(e);
  })) : String(e);
}
function pt(e, t) {
  var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "iterator",
    r = void 0,
    i = t;
  function o(t, n) {
    if (i === dt) return ft;
    if (n) throw i = dt, n;
    r && r(t);
    var o = e[i](),
      a = o[0],
      s = o[1],
      l = o[2];
    return i = a, r = l, i === dt ? ft : s;
  }
  return I(o, function (e) {
    return o(null, e);
  }, n, !0);
}
function gt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var o = {
      done: !1,
      value: Me(e)
    },
    a = function (e) {
      return {
        done: !1,
        value: Ne.apply(void 0, [t].concat(r, [e]))
      };
    },
    s = void 0,
    l = function (e) {
      return s = e;
    };
  return pt({
    q1: function () {
      return ["q2", o, l];
    },
    q2: function () {
      return s === ee ? [dt] : ["q1", a(s)];
    }
  }, "q1", "takeEvery(" + ht(e) + ", " + t.name + ")");
}
function mt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  var o = {
      done: !1,
      value: Me(e)
    },
    a = function (e) {
      return {
        done: !1,
        value: Ne.apply(void 0, [t].concat(r, [e]))
      };
    },
    s = function (e) {
      return {
        done: !1,
        value: Fe(e)
      };
    },
    l = void 0,
    u = void 0,
    c = function (e) {
      return l = e;
    },
    f = function (e) {
      return u = e;
    };
  return pt({
    q1: function () {
      return ["q2", o, f];
    },
    q2: function () {
      return u === ee ? [dt] : l ? ["q3", s(l)] : ["q1", a(u), c];
    },
    q3: function () {
      return ["q1", a(u), c];
    }
  }, "q1", "takeLatest(" + ht(e) + ", " + t.name + ")");
}
function vt(e, t, n) {
  for (var r = arguments.length, i = Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) i[o - 3] = arguments[o];
  var a = void 0,
    s = void 0,
    l = {
      done: !1,
      value: Ye(t, W.sliding(1))
    },
    u = function () {
      return {
        done: !1,
        value: Me(s)
      };
    },
    c = function (e) {
      return {
        done: !1,
        value: Ne.apply(void 0, [n].concat(i, [e]))
      };
    },
    f = {
      done: !1,
      value: Ee(k, e)
    },
    d = function (e) {
      return a = e;
    },
    h = function (e) {
      return s = e;
    };
  return pt({
    q1: function () {
      return ["q2", l, h];
    },
    q2: function () {
      return ["q3", u(), d];
    },
    q3: function () {
      return a === ee ? [dt] : ["q4", c(a)];
    },
    q4: function () {
      return ["q2", f];
    }
  }, "q1", "throttle(" + ht(t) + ", " + n.name + ")");
}
function yt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  return Ne.apply(void 0, [gt, e, t].concat(r));
}
function bt(e, t) {
  for (var n = arguments.length, r = Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++) r[i - 2] = arguments[i];
  return Ne.apply(void 0, [mt, e, t].concat(r));
}
function xt(e, t, n) {
  for (var r = arguments.length, i = Array(r > 3 ? r - 3 : 0), o = 3; o < r; o++) i[o - 3] = arguments[o];
  return Ne.apply(void 0, [vt, e, t, n].concat(i));
}
defineExport(legacyExports, "b", function () {
  return r;
});
legacyExports["a"] = ct;
