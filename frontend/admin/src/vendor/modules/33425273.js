let legacyModule = module,
  legacyExports = exports;
(function (t, r) {
  var i = require("./6c6d3052.js");
  function o(e) {
    var t = this;
    this.next = null, this.entry = null, this.finish = function () {
      D(t, e);
    };
  }
  legacyModule.exports = b;
  var a,
    s = !t.browser && ["v0.10", "v0.9."].indexOf(t.version.slice(0, 5)) > -1 ? setImmediate : i.nextTick;
  b.WritableState = y;
  var l = Object.create(require("./4f6e7a30.js"));
  l.inherits = require("./5037584d.js");
  var c = {
      deprecate: require("./74394645.js")
    },
    u = require("./eventEmitter.js"),
    h = require("./68776456.js").Buffer,
    f = r.Uint8Array || function () {};
  function d(e) {
    return h.from(e);
  }
  function p(e) {
    return h.isBuffer(e) || e instanceof f;
  }
  var m,
    g = require("./526f4670.js");
  function v() {}
  function y(e, t) {
    a = a || require("./735a726f.js"), e = e || {};
    var r = t instanceof a;
    this.objectMode = !!e.objectMode, r && (this.objectMode = this.objectMode || !!e.writableObjectMode);
    var i = e.highWaterMark,
      s = e.writableHighWaterMark,
      l = this.objectMode ? 16 : 16384;
    this.highWaterMark = i || 0 === i ? i : r && (s || 0 === s) ? s : l, this.highWaterMark = Math.floor(this.highWaterMark), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
    var c = !1 === e.decodeStrings;
    this.decodeStrings = !c, this.defaultEncoding = e.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
      O(t, e);
    }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.bufferedRequestCount = 0, this.corkedRequestsFree = new o(this);
  }
  function b(e) {
    if (a = a || require("./735a726f.js"), !m.call(b, this) && !(this instanceof a)) return new b(e);
    this._writableState = new y(e, this), this.writable = !0, e && ("function" === typeof e.write && (this._write = e.write), "function" === typeof e.writev && (this._writev = e.writev), "function" === typeof e.destroy && (this._destroy = e.destroy), "function" === typeof e.final && (this._final = e.final)), u.call(this);
  }
  function w(e, t) {
    var n = new Error("write after end");
    e.emit("error", n), i.nextTick(t, n);
  }
  function x(e, t, n, r) {
    var o = !0,
      a = !1;
    return null === n ? a = new TypeError("May not write null values to stream") : "string" === typeof n || void 0 === n || t.objectMode || (a = new TypeError("Invalid non-string/buffer chunk")), a && (e.emit("error", a), i.nextTick(r, a), o = !1), o;
  }
  function _(e, t, n) {
    return e.objectMode || !1 === e.decodeStrings || "string" !== typeof t || (t = h.from(t, n)), t;
  }
  function E(e, t, n, r, i, o) {
    if (!n) {
      var a = _(t, r, i);
      r !== a && (n = !0, i = "buffer", r = a);
    }
    var s = t.objectMode ? 1 : r.length;
    t.length += s;
    var l = t.length < t.highWaterMark;
    if (l || (t.needDrain = !0), t.writing || t.corked) {
      var c = t.lastBufferedRequest;
      t.lastBufferedRequest = {
        chunk: r,
        encoding: i,
        isBuf: n,
        callback: o,
        next: null
      }, c ? c.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1;
    } else S(e, t, !1, s, r, i, o);
    return l;
  }
  function S(e, t, n, r, i, o, a) {
    t.writelen = r, t.writecb = a, t.writing = !0, t.sync = !0, n ? e._writev(i, t.onwrite) : e._write(i, o, t.onwrite), t.sync = !1;
  }
  function k(e, t, n, r, o) {
    --t.pendingcb, n ? (i.nextTick(o, r), i.nextTick(R, e, t), e._writableState.errorEmitted = !0, e.emit("error", r)) : (o(r), e._writableState.errorEmitted = !0, e.emit("error", r), R(e, t));
  }
  function C(e) {
    e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0;
  }
  function O(e, t) {
    var n = e._writableState,
      r = n.sync,
      i = n.writecb;
    if (C(n), t) k(e, n, r, t, i);else {
      var o = P(n);
      o || n.corked || n.bufferProcessing || !n.bufferedRequest || A(e, n), r ? s(T, e, n, o, i) : T(e, n, o, i);
    }
  }
  function T(e, t, n, r) {
    n || L(e, t), t.pendingcb--, r(), R(e, t);
  }
  function L(e, t) {
    0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"));
  }
  function A(e, t) {
    t.bufferProcessing = !0;
    var n = t.bufferedRequest;
    if (e._writev && n && n.next) {
      var r = t.bufferedRequestCount,
        i = new Array(r),
        a = t.corkedRequestsFree;
      a.entry = n;
      var s = 0,
        l = !0;
      while (n) i[s] = n, n.isBuf || (l = !1), n = n.next, s += 1;
      i.allBuffers = l, S(e, t, !0, t.length, i, "", a.finish), t.pendingcb++, t.lastBufferedRequest = null, a.next ? (t.corkedRequestsFree = a.next, a.next = null) : t.corkedRequestsFree = new o(t), t.bufferedRequestCount = 0;
    } else {
      while (n) {
        var c = n.chunk,
          u = n.encoding,
          h = n.callback,
          f = t.objectMode ? 1 : c.length;
        if (S(e, t, !1, f, c, u, h), n = n.next, t.bufferedRequestCount--, t.writing) break;
      }
      null === n && (t.lastBufferedRequest = null);
    }
    t.bufferedRequest = n, t.bufferProcessing = !1;
  }
  function P(e) {
    return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing;
  }
  function j(e, t) {
    e._final(function (n) {
      t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), R(e, t);
    });
  }
  function M(e, t) {
    t.prefinished || t.finalCalled || ("function" === typeof e._final ? (t.pendingcb++, t.finalCalled = !0, i.nextTick(j, e, t)) : (t.prefinished = !0, e.emit("prefinish")));
  }
  function R(e, t) {
    var n = P(t);
    return n && (M(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), n;
  }
  function N(e, t, n) {
    t.ending = !0, R(e, t), n && (t.finished ? i.nextTick(n) : e.once("finish", n)), t.ended = !0, e.writable = !1;
  }
  function D(e, t, n) {
    var r = e.entry;
    e.entry = null;
    while (r) {
      var i = r.callback;
      t.pendingcb--, i(n), r = r.next;
    }
    t.corkedRequestsFree ? t.corkedRequestsFree.next = e : t.corkedRequestsFree = e;
  }
  l.inherits(b, u), y.prototype.getBuffer = function () {
    var e = this.bufferedRequest,
      t = [];
    while (e) t.push(e), e = e.next;
    return t;
  }, function () {
    try {
      Object.defineProperty(y.prototype, "buffer", {
        get: c.deprecate(function () {
          return this.getBuffer();
        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
      });
    } catch (e) {}
  }(), "function" === typeof Symbol && Symbol.hasInstance && "function" === typeof Function.prototype[Symbol.hasInstance] ? (m = Function.prototype[Symbol.hasInstance], Object.defineProperty(b, Symbol.hasInstance, {
    value: function (e) {
      return !!m.call(this, e) || this === b && e && e._writableState instanceof y;
    }
  })) : m = function (e) {
    return e instanceof this;
  }, b.prototype.pipe = function () {
    this.emit("error", new Error("Cannot pipe, not readable"));
  }, b.prototype.write = function (e, t, n) {
    var r = this._writableState,
      i = !1,
      o = !r.objectMode && p(e);
    return o && !h.isBuffer(e) && (e = d(e)), "function" === typeof t && (n = t, t = null), o ? t = "buffer" : t || (t = r.defaultEncoding), "function" !== typeof n && (n = v), r.ended ? w(this, n) : (o || x(this, r, e, n)) && (r.pendingcb++, i = E(this, r, o, e, t, n)), i;
  }, b.prototype.cork = function () {
    var e = this._writableState;
    e.corked++;
  }, b.prototype.uncork = function () {
    var e = this._writableState;
    e.corked && (e.corked--, e.writing || e.corked || e.finished || e.bufferProcessing || !e.bufferedRequest || A(this, e));
  }, b.prototype.setDefaultEncoding = function (e) {
    if ("string" === typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + e);
    return this._writableState.defaultEncoding = e, this;
  }, Object.defineProperty(b.prototype, "writableHighWaterMark", {
    enumerable: !1,
    get: function () {
      return this._writableState.highWaterMark;
    }
  }), b.prototype._write = function (e, t, n) {
    n(new Error("_write() is not implemented"));
  }, b.prototype._writev = null, b.prototype.end = function (e, t, n) {
    var r = this._writableState;
    "function" === typeof e ? (n = e, e = null, t = null) : "function" === typeof t && (n = t, t = null), null !== e && void 0 !== e && this.write(e, t), r.corked && (r.corked = 1, this.uncork()), r.ending || r.finished || N(this, r, n);
  }, Object.defineProperty(b.prototype, "destroyed", {
    get: function () {
      return void 0 !== this._writableState && this._writableState.destroyed;
    },
    set: function (e) {
      this._writableState && (this._writableState.destroyed = e);
    }
  }), b.prototype.destroy = g.destroy, b.prototype._undestroy = g.undestroy, b.prototype._destroy = function (e, t) {
    this.end(), t(e);
  };
}).call(this, require("./51324967.js"), require("./globalObjectLegacy.js"));
