let legacyModule = module,
  legacyExports = exports;
(function (t, r) {
  var i = require("./6c6d3052.js");
  legacyModule.exports = _;
  var o,
    a = require("./arrayIsArrayFallback.js");
  _.ReadableState = x;
  require("./2b714533.js").EventEmitter;
  var s = function (e, t) {
      return e.listeners(t).length;
    },
    l = require("./eventEmitter.js"),
    c = require("./68776456.js").Buffer,
    u = t.Uint8Array || function () {};
  function h(e) {
    return c.from(e);
  }
  function f(e) {
    return c.isBuffer(e) || e instanceof u;
  }
  var d = Object.create(require("./4f6e7a30.js"));
  d.inherits = require("./nodeInheritsOptional.js");
  var p = require("./emptyModule.js"),
    m = void 0;
  m = p && p.debuglog ? p.debuglog("stream") : function () {};
  var g,
    v = require("./5868716f.js"),
    y = require("./526f4670.js");
  d.inherits(_, l);
  var b = ["error", "close", "destroy", "pause", "resume"];
  function w(e, t, n) {
    if ("function" === typeof e.prependListener) return e.prependListener(t, n);
    e._events && e._events[t] ? a(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n);
  }
  function x(e, t) {
    o = o || require("./735a726f.js"), e = e || {};
    var r = t instanceof o;
    this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.readableObjectMode);
    var i = e.highWaterMark,
      a = e.readableHighWaterMark,
      s = this.objectMode ? 16 : 16384;
    this.highWaterMark = i || 0 === i ? i : r && (a || 0 === a) ? a : s, this.highWaterMark = Math.floor(this.highWaterMark), this.buffer = new v(), this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.destroyed = !1, this.defaultEncoding = e.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, e.encoding && (g || (g = require("./66584b70.js").StringDecoder), this.decoder = new g(e.encoding), this.encoding = e.encoding);
  }
  function _(e) {
    if (o = o || require("./735a726f.js"), !(this instanceof _)) return new _(e);
    this._readableState = new x(e, this), this.readable = !0, e && ("function" === typeof e.read && (this._read = e.read), "function" === typeof e.destroy && (this._destroy = e.destroy)), l.call(this);
  }
  function E(e, t, n, r, i) {
    var o,
      a = e._readableState;
    null === t ? (a.reading = !1, A(e, a)) : (i || (o = k(a, t)), o ? e.emit("error", o) : a.objectMode || t && t.length > 0 ? ("string" === typeof t || a.objectMode || Object.getPrototypeOf(t) === c.prototype || (t = h(t)), r ? a.endEmitted ? e.emit("error", new Error("stream.unshift() after end event")) : S(e, a, t, !0) : a.ended ? e.emit("error", new Error("stream.push() after EOF")) : (a.reading = !1, a.decoder && !n ? (t = a.decoder.write(t), a.objectMode || 0 !== t.length ? S(e, a, t, !1) : M(e, a)) : S(e, a, t, !1))) : r || (a.reading = !1));
    return C(a);
  }
  function S(e, t, n, r) {
    t.flowing && 0 === t.length && !t.sync ? (e.emit("data", n), e.read(0)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && P(e)), M(e, t);
  }
  function k(e, t) {
    var n;
    return f(t) || "string" === typeof t || void 0 === t || e.objectMode || (n = new TypeError("Invalid non-string/buffer chunk")), n;
  }
  function C(e) {
    return !e.ended && (e.needReadable || e.length < e.highWaterMark || 0 === e.length);
  }
  Object.defineProperty(_.prototype, "destroyed", {
    get: function () {
      return void 0 !== this._readableState && this._readableState.destroyed;
    },
    set: function (e) {
      this._readableState && (this._readableState.destroyed = e);
    }
  }), _.prototype.destroy = y.destroy, _.prototype._undestroy = y.undestroy, _.prototype._destroy = function (e, t) {
    this.push(null), t(e);
  }, _.prototype.push = function (e, t) {
    var n,
      r = this._readableState;
    return r.objectMode ? n = !0 : "string" === typeof e && (t = t || r.defaultEncoding, t !== r.encoding && (e = c.from(e, t), t = ""), n = !0), E(this, e, t, !1, n);
  }, _.prototype.unshift = function (e) {
    return E(this, e, null, !0, !1);
  }, _.prototype.isPaused = function () {
    return !1 === this._readableState.flowing;
  }, _.prototype.setEncoding = function (e) {
    return g || (g = require("./66584b70.js").StringDecoder), this._readableState.decoder = new g(e), this._readableState.encoding = e, this;
  };
  var O = 8388608;
  function T(e) {
    return e >= O ? e = O : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e;
  }
  function L(e, t) {
    return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e !== e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = T(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0));
  }
  function A(e, t) {
    if (!t.ended) {
      if (t.decoder) {
        var n = t.decoder.end();
        n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length);
      }
      t.ended = !0, P(e);
    }
  }
  function P(e) {
    var t = e._readableState;
    t.needReadable = !1, t.emittedReadable || (m("emitReadable", t.flowing), t.emittedReadable = !0, t.sync ? i.nextTick(j, e) : j(e));
  }
  function j(e) {
    m("emit readable"), e.emit("readable"), F(e);
  }
  function M(e, t) {
    t.readingMore || (t.readingMore = !0, i.nextTick(R, e, t));
  }
  function R(e, t) {
    var n = t.length;
    while (!t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark) {
      if (m("maybeReadMore read 0"), e.read(0), n === t.length) break;
      n = t.length;
    }
    t.readingMore = !1;
  }
  function N(e) {
    return function () {
      var t = e._readableState;
      m("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && s(e, "data") && (t.flowing = !0, F(e));
    };
  }
  function D(e) {
    m("readable nexttick read 0"), e.read(0);
  }
  function I(e, t) {
    t.resumeScheduled || (t.resumeScheduled = !0, i.nextTick($, e, t));
  }
  function $(e, t) {
    t.reading || (m("resume read 0"), e.read(0)), t.resumeScheduled = !1, t.awaitDrain = 0, e.emit("resume"), F(e), t.flowing && !t.reading && e.read(0);
  }
  function F(e) {
    var t = e._readableState;
    m("flow", t.flowing);
    while (t.flowing && null !== e.read());
  }
  function B(e, t) {
    return 0 === t.length ? null : (t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.head.data : t.buffer.concat(t.length), t.buffer.clear()) : n = V(e, t.buffer, t.decoder), n);
    var n;
  }
  function V(e, t, n) {
    var r;
    return e < t.head.data.length ? (r = t.head.data.slice(0, e), t.head.data = t.head.data.slice(e)) : r = e === t.head.data.length ? t.shift() : n ? W(e, t) : H(e, t), r;
  }
  function W(e, t) {
    var n = t.head,
      r = 1,
      i = n.data;
    e -= i.length;
    while (n = n.next) {
      var o = n.data,
        a = e > o.length ? o.length : e;
      if (a === o.length ? i += o : i += o.slice(0, e), e -= a, 0 === e) {
        a === o.length ? (++r, n.next ? t.head = n.next : t.head = t.tail = null) : (t.head = n, n.data = o.slice(a));
        break;
      }
      ++r;
    }
    return t.length -= r, i;
  }
  function H(e, t) {
    var n = c.allocUnsafe(e),
      r = t.head,
      i = 1;
    r.data.copy(n), e -= r.data.length;
    while (r = r.next) {
      var o = r.data,
        a = e > o.length ? o.length : e;
      if (o.copy(n, n.length - e, 0, a), e -= a, 0 === e) {
        a === o.length ? (++i, r.next ? t.head = r.next : t.head = t.tail = null) : (t.head = r, r.data = o.slice(a));
        break;
      }
      ++i;
    }
    return t.length -= i, n;
  }
  function U(e) {
    var t = e._readableState;
    if (t.length > 0) throw new Error('"endReadable()" called on non-empty stream');
    t.endEmitted || (t.ended = !0, i.nextTick(z, t, e));
  }
  function z(e, t) {
    e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"));
  }
  function G(e, t) {
    for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
    return -1;
  }
  _.prototype.read = function (e) {
    m("read", e), e = parseInt(e, 10);
    var t = this._readableState,
      n = e;
    if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && (t.length >= t.highWaterMark || t.ended)) return m("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? U(this) : P(this), null;
    if (e = L(e, t), 0 === e && t.ended) return 0 === t.length && U(this), null;
    var r,
      i = t.needReadable;
    return m("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && (i = !0, m("length less than watermark", i)), t.ended || t.reading ? (i = !1, m("reading or ended", i)) : i && (m("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = L(n, t))), r = e > 0 ? B(e, t) : null, null === r ? (t.needReadable = !0, e = 0) : t.length -= e, 0 === t.length && (t.ended || (t.needReadable = !0), n !== e && t.ended && U(this)), null !== r && this.emit("data", r), r;
  }, _.prototype._read = function (e) {
    this.emit("error", new Error("_read() is not implemented"));
  }, _.prototype.pipe = function (e, t) {
    var n = this,
      o = this._readableState;
    switch (o.pipesCount) {
      case 0:
        o.pipes = e;
        break;
      case 1:
        o.pipes = [o.pipes, e];
        break;
      default:
        o.pipes.push(e);
        break;
    }
    o.pipesCount += 1, m("pipe count=%d opts=%j", o.pipesCount, t);
    var a = (!t || !1 !== t.end) && e !== r.stdout && e !== r.stderr,
      l = a ? u : x;
    function c(e, t) {
      m("onunpipe"), e === n && t && !1 === t.hasUnpiped && (t.hasUnpiped = !0, d());
    }
    function u() {
      m("onend"), e.end();
    }
    o.endEmitted ? i.nextTick(l) : n.once("end", l), e.on("unpipe", c);
    var h = N(n);
    e.on("drain", h);
    var f = !1;
    function d() {
      m("cleanup"), e.removeListener("close", y), e.removeListener("finish", b), e.removeListener("drain", h), e.removeListener("error", v), e.removeListener("unpipe", c), n.removeListener("end", u), n.removeListener("end", x), n.removeListener("data", g), f = !0, !o.awaitDrain || e._writableState && !e._writableState.needDrain || h();
    }
    var p = !1;
    function g(t) {
      m("ondata"), p = !1;
      var r = e.write(t);
      !1 !== r || p || ((1 === o.pipesCount && o.pipes === e || o.pipesCount > 1 && -1 !== G(o.pipes, e)) && !f && (m("false write response, pause", n._readableState.awaitDrain), n._readableState.awaitDrain++, p = !0), n.pause());
    }
    function v(t) {
      m("onerror", t), x(), e.removeListener("error", v), 0 === s(e, "error") && e.emit("error", t);
    }
    function y() {
      e.removeListener("finish", b), x();
    }
    function b() {
      m("onfinish"), e.removeListener("close", y), x();
    }
    function x() {
      m("unpipe"), n.unpipe(e);
    }
    return n.on("data", g), w(e, "error", v), e.once("close", y), e.once("finish", b), e.emit("pipe", n), o.flowing || (m("pipe resume"), n.resume()), e;
  }, _.prototype.unpipe = function (e) {
    var t = this._readableState,
      n = {
        hasUnpiped: !1
      };
    if (0 === t.pipesCount) return this;
    if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
    if (!e) {
      var r = t.pipes,
        i = t.pipesCount;
      t.pipes = null, t.pipesCount = 0, t.flowing = !1;
      for (var o = 0; o < i; o++) r[o].emit("unpipe", this, n);
      return this;
    }
    var a = G(t.pipes, e);
    return -1 === a ? this : (t.pipes.splice(a, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this);
  }, _.prototype.on = function (e, t) {
    var n = l.prototype.on.call(this, e, t);
    if ("data" === e) !1 !== this._readableState.flowing && this.resume();else if ("readable" === e) {
      var r = this._readableState;
      r.endEmitted || r.readableListening || (r.readableListening = r.needReadable = !0, r.emittedReadable = !1, r.reading ? r.length && P(this) : i.nextTick(D, this));
    }
    return n;
  }, _.prototype.addListener = _.prototype.on, _.prototype.resume = function () {
    var e = this._readableState;
    return e.flowing || (m("resume"), e.flowing = !0, I(this, e)), this;
  }, _.prototype.pause = function () {
    return m("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (m("pause"), this._readableState.flowing = !1, this.emit("pause")), this;
  }, _.prototype.wrap = function (e) {
    var t = this,
      n = this._readableState,
      r = !1;
    for (var i in e.on("end", function () {
      if (m("wrapped end"), n.decoder && !n.ended) {
        var e = n.decoder.end();
        e && e.length && t.push(e);
      }
      t.push(null);
    }), e.on("data", function (i) {
      if (m("wrapped data"), n.decoder && (i = n.decoder.write(i)), (!n.objectMode || null !== i && void 0 !== i) && (n.objectMode || i && i.length)) {
        var o = t.push(i);
        o || (r = !0, e.pause());
      }
    }), e) void 0 === this[i] && "function" === typeof e[i] && (this[i] = function (t) {
      return function () {
        return e[t].apply(e, arguments);
      };
    }(i));
    for (var o = 0; o < b.length; o++) e.on(b[o], this.emit.bind(this, b[o]));
    return this._read = function (t) {
      m("wrapped _read", t), r && (r = !1, e.resume());
    }, this;
  }, Object.defineProperty(_.prototype, "readableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._readableState.highWaterMark;
    }
  }), _._fromList = B;
}).call(this, require("./globalObjectLegacy.js"), require("./51324967.js"));
