let legacyModule = module,
  legacyExports = exports;
var r,
  i = "object" === typeof Reflect ? Reflect : null,
  o = i && "function" === typeof i.apply ? i.apply : function (e, t, n) {
    return Function.prototype.apply.call(e, t, n);
  };
function a(e) {
  console && console.warn && console.warn(e);
}
r = i && "function" === typeof i.ownKeys ? i.ownKeys : Object.getOwnPropertySymbols ? function (e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : function (e) {
  return Object.getOwnPropertyNames(e);
};
var s = Number.isNaN || function (e) {
  return e !== e;
};
function l() {
  l.init.call(this);
}
legacyModule.exports = l, legacyModule.exports.once = w, l.EventEmitter = l, l.prototype._events = void 0, l.prototype._eventsCount = 0, l.prototype._maxListeners = void 0;
var c = 10;
function u(e) {
  if ("function" !== typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e);
}
function h(e) {
  return void 0 === e._maxListeners ? l.defaultMaxListeners : e._maxListeners;
}
function f(e, t, n, r) {
  var i, o, s;
  if (u(n), o = e._events, void 0 === o ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), s = o[t]), void 0 === s) s = o[t] = n, ++e._eventsCount;else if ("function" === typeof s ? s = o[t] = r ? [n, s] : [s, n] : r ? s.unshift(n) : s.push(n), i = h(e), i > 0 && s.length > i && !s.warned) {
    s.warned = !0;
    var l = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    l.name = "MaxListenersExceededWarning", l.emitter = e, l.type = t, l.count = s.length, a(l);
  }
  return e;
}
function d() {
  if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function p(e, t, n) {
  var r = {
      fired: !1,
      wrapFn: void 0,
      target: e,
      type: t,
      listener: n
    },
    i = d.bind(r);
  return i.listener = n, r.wrapFn = i, i;
}
function m(e, t, n) {
  var r = e._events;
  if (void 0 === r) return [];
  var i = r[t];
  return void 0 === i ? [] : "function" === typeof i ? n ? [i.listener || i] : [i] : n ? b(i) : v(i, i.length);
}
function g(e) {
  var t = this._events;
  if (void 0 !== t) {
    var n = t[e];
    if ("function" === typeof n) return 1;
    if (void 0 !== n) return n.length;
  }
  return 0;
}
function v(e, t) {
  for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
  return n;
}
function y(e, t) {
  for (; t + 1 < e.length; t++) e[t] = e[t + 1];
  e.pop();
}
function b(e) {
  for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
  return t;
}
function w(e, t) {
  return new Promise(function (n, r) {
    function i(n) {
      e.removeListener(t, o), r(n);
    }
    function o() {
      "function" === typeof e.removeListener && e.removeListener("error", i), n([].slice.call(arguments));
    }
    _(e, t, o, {
      once: !0
    }), "error" !== t && x(e, i, {
      once: !0
    });
  });
}
function x(e, t, n) {
  "function" === typeof e.on && _(e, "error", t, n);
}
function _(e, t, n, r) {
  if ("function" === typeof e.on) r.once ? e.once(t, n) : e.on(t, n);else {
    if ("function" !== typeof e.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e);
    e.addEventListener(t, function i(o) {
      r.once && e.removeEventListener(t, i), n(o);
    });
  }
}
Object.defineProperty(l, "defaultMaxListeners", {
  enumerable: !0,
  get: function () {
    return c;
  },
  set: function (e) {
    if ("number" !== typeof e || e < 0 || s(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
    c = e;
  }
}), l.init = function () {
  void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
}, l.prototype.setMaxListeners = function (e) {
  if ("number" !== typeof e || e < 0 || s(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
}, l.prototype.getMaxListeners = function () {
  return h(this);
}, l.prototype.emit = function (e) {
  for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
  var r = "error" === e,
    i = this._events;
  if (void 0 !== i) r = r && void 0 === i.error;else if (!r) return !1;
  if (r) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error) throw a;
    var s = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw s.context = a, s;
  }
  var l = i[e];
  if (void 0 === l) return !1;
  if ("function" === typeof l) o(l, this, t);else {
    var c = l.length,
      u = v(l, c);
    for (n = 0; n < c; ++n) o(u[n], this, t);
  }
  return !0;
}, l.prototype.addListener = function (e, t) {
  return f(this, e, t, !1);
}, l.prototype.on = l.prototype.addListener, l.prototype.prependListener = function (e, t) {
  return f(this, e, t, !0);
}, l.prototype.once = function (e, t) {
  return u(t), this.on(e, p(this, e, t)), this;
}, l.prototype.prependOnceListener = function (e, t) {
  return u(t), this.prependListener(e, p(this, e, t)), this;
}, l.prototype.removeListener = function (e, t) {
  var n, r, i, o, a;
  if (u(t), r = this._events, void 0 === r) return this;
  if (n = r[e], void 0 === n) return this;
  if (n === t || n.listener === t) 0 === --this._eventsCount ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));else if ("function" !== typeof n) {
    for (i = -1, o = n.length - 1; o >= 0; o--) if (n[o] === t || n[o].listener === t) {
      a = n[o].listener, i = o;
      break;
    }
    if (i < 0) return this;
    0 === i ? n.shift() : y(n, i), 1 === n.length && (r[e] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", e, a || t);
  }
  return this;
}, l.prototype.off = l.prototype.removeListener, l.prototype.removeAllListeners = function (e) {
  var t, n, r;
  if (n = this._events, void 0 === n) return this;
  if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 === --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
  if (0 === arguments.length) {
    var i,
      o = Object.keys(n);
    for (r = 0; r < o.length; ++r) i = o[r], "removeListener" !== i && this.removeAllListeners(i);
    return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this;
  }
  if (t = n[e], "function" === typeof t) this.removeListener(e, t);else if (void 0 !== t) for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
  return this;
}, l.prototype.listeners = function (e) {
  return m(this, e, !0);
}, l.prototype.rawListeners = function (e) {
  return m(this, e, !1);
}, l.listenerCount = function (e, t) {
  return "function" === typeof e.listenerCount ? e.listenerCount(t) : g.call(e, t);
}, l.prototype.listenerCount = g, l.prototype.eventNames = function () {
  return this._eventsCount > 0 ? r(this._events) : [];
};
