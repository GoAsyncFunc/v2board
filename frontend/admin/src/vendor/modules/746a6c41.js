let legacyModule = module,
  legacyExports = exports;
(function (e) {
  var r = require("./48375846.js"),
    i = require("./6b564b2b.js"),
    o = require("./arrayIsArrayFallback.js");
  function a() {
    try {
      var e = new Uint8Array(1);
      return e.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function () {
          return 42;
        }
      }, 42 === e.foo() && "function" === typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
    } catch (e) {
      return !1;
    }
  }
  function s() {
    return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
  }
  function l(e, t) {
    if (s() < t) throw new RangeError("Invalid typed array length");
    return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t), e.__proto__ = c.prototype) : (null === e && (e = new c(t)), e.length = t), e;
  }
  function c(e, t, n) {
    if (!c.TYPED_ARRAY_SUPPORT && !(this instanceof c)) return new c(e, t, n);
    if ("number" === typeof e) {
      if ("string" === typeof t) throw new Error("If encoding is specified then the first argument must be a string");
      return d(this, e);
    }
    return u(this, e, t, n);
  }
  function u(e, t, n, r) {
    if ("number" === typeof t) throw new TypeError('"value" argument must not be a number');
    return "undefined" !== typeof ArrayBuffer && t instanceof ArrayBuffer ? g(e, t, n, r) : "string" === typeof t ? p(e, t, n) : v(e, t);
  }
  function h(e) {
    if ("number" !== typeof e) throw new TypeError('"size" argument must be a number');
    if (e < 0) throw new RangeError('"size" argument must not be negative');
  }
  function f(e, t, n, r) {
    return h(t), t <= 0 ? l(e, t) : void 0 !== n ? "string" === typeof r ? l(e, t).fill(n, r) : l(e, t).fill(n) : l(e, t);
  }
  function d(e, t) {
    if (h(t), e = l(e, t < 0 ? 0 : 0 | y(t)), !c.TYPED_ARRAY_SUPPORT) for (var n = 0; n < t; ++n) e[n] = 0;
    return e;
  }
  function p(e, t, n) {
    if ("string" === typeof n && "" !== n || (n = "utf8"), !c.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
    var r = 0 | w(t, n);
    e = l(e, r);
    var i = e.write(t, n);
    return i !== r && (e = e.slice(0, i)), e;
  }
  function m(e, t) {
    var n = t.length < 0 ? 0 : 0 | y(t.length);
    e = l(e, n);
    for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
    return e;
  }
  function g(e, t, n, r) {
    if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
    if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
    return t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(t, n, r), c.TYPED_ARRAY_SUPPORT ? (e = t, e.__proto__ = c.prototype) : e = m(e, t), e;
  }
  function v(e, t) {
    if (c.isBuffer(t)) {
      var n = 0 | y(t.length);
      return e = l(e, n), 0 === e.length ? e : (t.copy(e, 0, 0, n), e);
    }
    if (t) {
      if ("undefined" !== typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" !== typeof t.length || te(t.length) ? l(e, 0) : m(e, t);
      if ("Buffer" === t.type && o(t.data)) return m(e, t.data);
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
  }
  function y(e) {
    if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
    return 0 | e;
  }
  function b(e) {
    return +e != e && (e = 0), c.alloc(+e);
  }
  function w(e, t) {
    if (c.isBuffer(e)) return e.length;
    if ("undefined" !== typeof ArrayBuffer && "function" === typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
    "string" !== typeof e && (e = "" + e);
    var n = e.length;
    if (0 === n) return 0;
    for (var r = !1;;) switch (t) {
      case "ascii":
      case "latin1":
      case "binary":
        return n;
      case "utf8":
      case "utf-8":
      case void 0:
        return X(e).length;
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return 2 * n;
      case "hex":
        return n >>> 1;
      case "base64":
        return J(e).length;
      default:
        if (r) return X(e).length;
        t = ("" + t).toLowerCase(), r = !0;
    }
  }
  function x(e, t, n) {
    var r = !1;
    if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
    if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
    if (n >>>= 0, t >>>= 0, n <= t) return "";
    e || (e = "utf8");
    while (1) switch (e) {
      case "hex":
        return I(this, t, n);
      case "utf8":
      case "utf-8":
        return j(this, t, n);
      case "ascii":
        return N(this, t, n);
      case "latin1":
      case "binary":
        return D(this, t, n);
      case "base64":
        return P(this, t, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return $(this, t, n);
      default:
        if (r) throw new TypeError("Unknown encoding: " + e);
        e = (e + "").toLowerCase(), r = !0;
    }
  }
  function _(e, t, n) {
    var r = e[t];
    e[t] = e[n], e[n] = r;
  }
  function E(e, t, n, r, i) {
    if (0 === e.length) return -1;
    if ("string" === typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
      if (i) return -1;
      n = e.length - 1;
    } else if (n < 0) {
      if (!i) return -1;
      n = 0;
    }
    if ("string" === typeof t && (t = c.from(t, r)), c.isBuffer(t)) return 0 === t.length ? -1 : S(e, t, n, r, i);
    if ("number" === typeof t) return t &= 255, c.TYPED_ARRAY_SUPPORT && "function" === typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) : S(e, [t], n, r, i);
    throw new TypeError("val must be string, number or Buffer");
  }
  function S(e, t, n, r, i) {
    var o,
      a = 1,
      s = e.length,
      l = t.length;
    if (void 0 !== r && (r = String(r).toLowerCase(), "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
      if (e.length < 2 || t.length < 2) return -1;
      a = 2, s /= 2, l /= 2, n /= 2;
    }
    function c(e, t) {
      return 1 === a ? e[t] : e.readUInt16BE(t * a);
    }
    if (i) {
      var u = -1;
      for (o = n; o < s; o++) if (c(e, o) === c(t, -1 === u ? 0 : o - u)) {
        if (-1 === u && (u = o), o - u + 1 === l) return u * a;
      } else -1 !== u && (o -= o - u), u = -1;
    } else for (n + l > s && (n = s - l), o = n; o >= 0; o--) {
      for (var h = !0, f = 0; f < l; f++) if (c(e, o + f) !== c(t, f)) {
        h = !1;
        break;
      }
      if (h) return o;
    }
    return -1;
  }
  function k(e, t, n, r) {
    n = Number(n) || 0;
    var i = e.length - n;
    r ? (r = Number(r), r > i && (r = i)) : r = i;
    var o = t.length;
    if (o % 2 !== 0) throw new TypeError("Invalid hex string");
    r > o / 2 && (r = o / 2);
    for (var a = 0; a < r; ++a) {
      var s = parseInt(t.substr(2 * a, 2), 16);
      if (isNaN(s)) return a;
      e[n + a] = s;
    }
    return a;
  }
  function C(e, t, n, r) {
    return ee(X(t, e.length - n), e, n, r);
  }
  function O(e, t, n, r) {
    return ee(Q(t), e, n, r);
  }
  function T(e, t, n, r) {
    return O(e, t, n, r);
  }
  function L(e, t, n, r) {
    return ee(J(t), e, n, r);
  }
  function A(e, t, n, r) {
    return ee(Z(t, e.length - n), e, n, r);
  }
  function P(e, t, n) {
    return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n));
  }
  function j(e, t, n) {
    n = Math.min(e.length, n);
    var r = [],
      i = t;
    while (i < n) {
      var o,
        a,
        s,
        l,
        c = e[i],
        u = null,
        h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
      if (i + h <= n) switch (h) {
        case 1:
          c < 128 && (u = c);
          break;
        case 2:
          o = e[i + 1], 128 === (192 & o) && (l = (31 & c) << 6 | 63 & o, l > 127 && (u = l));
          break;
        case 3:
          o = e[i + 1], a = e[i + 2], 128 === (192 & o) && 128 === (192 & a) && (l = (15 & c) << 12 | (63 & o) << 6 | 63 & a, l > 2047 && (l < 55296 || l > 57343) && (u = l));
          break;
        case 4:
          o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 === (192 & o) && 128 === (192 & a) && 128 === (192 & s) && (l = (15 & c) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s, l > 65535 && l < 1114112 && (u = l));
      }
      null === u ? (u = 65533, h = 1) : u > 65535 && (u -= 65536, r.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), r.push(u), i += h;
    }
    return R(r);
  }
  legacyExports.Buffer = c, legacyExports.SlowBuffer = b, legacyExports.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : a(), legacyExports.kMaxLength = s(), c.poolSize = 8192, c._augment = function (e) {
    return e.__proto__ = c.prototype, e;
  }, c.from = function (e, t, n) {
    return u(null, e, t, n);
  }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, "undefined" !== typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
    value: null,
    configurable: !0
  })), c.alloc = function (e, t, n) {
    return f(null, e, t, n);
  }, c.allocUnsafe = function (e) {
    return d(null, e);
  }, c.allocUnsafeSlow = function (e) {
    return d(null, e);
  }, c.isBuffer = function (e) {
    return !(null == e || !e._isBuffer);
  }, c.compare = function (e, t) {
    if (!c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
    if (e === t) return 0;
    for (var n = e.length, r = t.length, i = 0, o = Math.min(n, r); i < o; ++i) if (e[i] !== t[i]) {
      n = e[i], r = t[i];
      break;
    }
    return n < r ? -1 : r < n ? 1 : 0;
  }, c.isEncoding = function (e) {
    switch (String(e).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return !0;
      default:
        return !1;
    }
  }, c.concat = function (e, t) {
    if (!o(e)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === e.length) return c.alloc(0);
    var n;
    if (void 0 === t) for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
    var r = c.allocUnsafe(t),
      i = 0;
    for (n = 0; n < e.length; ++n) {
      var a = e[n];
      if (!c.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
      a.copy(r, i), i += a.length;
    }
    return r;
  }, c.byteLength = w, c.prototype._isBuffer = !0, c.prototype.swap16 = function () {
    var e = this.length;
    if (e % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var t = 0; t < e; t += 2) _(this, t, t + 1);
    return this;
  }, c.prototype.swap32 = function () {
    var e = this.length;
    if (e % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var t = 0; t < e; t += 4) _(this, t, t + 3), _(this, t + 1, t + 2);
    return this;
  }, c.prototype.swap64 = function () {
    var e = this.length;
    if (e % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var t = 0; t < e; t += 8) _(this, t, t + 7), _(this, t + 1, t + 6), _(this, t + 2, t + 5), _(this, t + 3, t + 4);
    return this;
  }, c.prototype.toString = function () {
    var e = 0 | this.length;
    return 0 === e ? "" : 0 === arguments.length ? j(this, 0, e) : x.apply(this, arguments);
  }, c.prototype.equals = function (e) {
    if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
    return this === e || 0 === c.compare(this, e);
  }, c.prototype.inspect = function () {
    var e = "",
      n = legacyExports.INSPECT_MAX_BYTES;
    return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e += " ... ")), "<Buffer " + e + ">";
  }, c.prototype.compare = function (e, t, n, r, i) {
    if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
    if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), t < 0 || n > e.length || r < 0 || i > this.length) throw new RangeError("out of range index");
    if (r >= i && t >= n) return 0;
    if (r >= i) return -1;
    if (t >= n) return 1;
    if (t >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === e) return 0;
    for (var o = i - r, a = n - t, s = Math.min(o, a), l = this.slice(r, i), u = e.slice(t, n), h = 0; h < s; ++h) if (l[h] !== u[h]) {
      o = l[h], a = u[h];
      break;
    }
    return o < a ? -1 : a < o ? 1 : 0;
  }, c.prototype.includes = function (e, t, n) {
    return -1 !== this.indexOf(e, t, n);
  }, c.prototype.indexOf = function (e, t, n) {
    return E(this, e, t, n, !0);
  }, c.prototype.lastIndexOf = function (e, t, n) {
    return E(this, e, t, n, !1);
  }, c.prototype.write = function (e, t, n, r) {
    if (void 0 === t) r = "utf8", n = this.length, t = 0;else if (void 0 === n && "string" === typeof t) r = t, n = this.length, t = 0;else {
      if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
    }
    var i = this.length - t;
    if ((void 0 === n || n > i) && (n = i), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    r || (r = "utf8");
    for (var o = !1;;) switch (r) {
      case "hex":
        return k(this, e, t, n);
      case "utf8":
      case "utf-8":
        return C(this, e, t, n);
      case "ascii":
        return O(this, e, t, n);
      case "latin1":
      case "binary":
        return T(this, e, t, n);
      case "base64":
        return L(this, e, t, n);
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return A(this, e, t, n);
      default:
        if (o) throw new TypeError("Unknown encoding: " + r);
        r = ("" + r).toLowerCase(), o = !0;
    }
  }, c.prototype.toJSON = function () {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  var M = 4096;
  function R(e) {
    var t = e.length;
    if (t <= M) return String.fromCharCode.apply(String, e);
    var n = "",
      r = 0;
    while (r < t) n += String.fromCharCode.apply(String, e.slice(r, r += M));
    return n;
  }
  function N(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
    return r;
  }
  function D(e, t, n) {
    var r = "";
    n = Math.min(e.length, n);
    for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
    return r;
  }
  function I(e, t, n) {
    var r = e.length;
    (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
    for (var i = "", o = t; o < n; ++o) i += Y(e[o]);
    return i;
  }
  function $(e, t, n) {
    for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
    return i;
  }
  function F(e, t, n) {
    if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
    if (e + t > n) throw new RangeError("Trying to access beyond buffer length");
  }
  function B(e, t, n, r, i, o) {
    if (!c.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (t > i || t < o) throw new RangeError('"value" argument is out of bounds');
    if (n + r > e.length) throw new RangeError("Index out of range");
  }
  function V(e, t, n, r) {
    t < 0 && (t = 65535 + t + 1);
    for (var i = 0, o = Math.min(e.length - n, 2); i < o; ++i) e[n + i] = (t & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
  }
  function W(e, t, n, r) {
    t < 0 && (t = 4294967295 + t + 1);
    for (var i = 0, o = Math.min(e.length - n, 4); i < o; ++i) e[n + i] = t >>> 8 * (r ? i : 3 - i) & 255;
  }
  function H(e, t, n, r, i, o) {
    if (n + r > e.length) throw new RangeError("Index out of range");
    if (n < 0) throw new RangeError("Index out of range");
  }
  function U(e, t, n, r, o) {
    return o || H(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38), i.write(e, t, n, r, 23, 4), n + 4;
  }
  function z(e, t, n, r, o) {
    return o || H(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308), i.write(e, t, n, r, 52, 8), n + 8;
  }
  c.prototype.slice = function (e, t) {
    var n,
      r = this.length;
    if (e = ~~e, t = void 0 === t ? r : ~~t, e < 0 ? (e += r, e < 0 && (e = 0)) : e > r && (e = r), t < 0 ? (t += r, t < 0 && (t = 0)) : t > r && (t = r), t < e && (t = e), c.TYPED_ARRAY_SUPPORT) n = this.subarray(e, t), n.__proto__ = c.prototype;else {
      var i = t - e;
      n = new c(i, void 0);
      for (var o = 0; o < i; ++o) n[o] = this[o + e];
    }
    return n;
  }, c.prototype.readUIntLE = function (e, t, n) {
    e |= 0, t |= 0, n || F(e, t, this.length);
    var r = this[e],
      i = 1,
      o = 0;
    while (++o < t && (i *= 256)) r += this[e + o] * i;
    return r;
  }, c.prototype.readUIntBE = function (e, t, n) {
    e |= 0, t |= 0, n || F(e, t, this.length);
    var r = this[e + --t],
      i = 1;
    while (t > 0 && (i *= 256)) r += this[e + --t] * i;
    return r;
  }, c.prototype.readUInt8 = function (e, t) {
    return t || F(e, 1, this.length), this[e];
  }, c.prototype.readUInt16LE = function (e, t) {
    return t || F(e, 2, this.length), this[e] | this[e + 1] << 8;
  }, c.prototype.readUInt16BE = function (e, t) {
    return t || F(e, 2, this.length), this[e] << 8 | this[e + 1];
  }, c.prototype.readUInt32LE = function (e, t) {
    return t || F(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
  }, c.prototype.readUInt32BE = function (e, t) {
    return t || F(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
  }, c.prototype.readIntLE = function (e, t, n) {
    e |= 0, t |= 0, n || F(e, t, this.length);
    var r = this[e],
      i = 1,
      o = 0;
    while (++o < t && (i *= 256)) r += this[e + o] * i;
    return i *= 128, r >= i && (r -= Math.pow(2, 8 * t)), r;
  }, c.prototype.readIntBE = function (e, t, n) {
    e |= 0, t |= 0, n || F(e, t, this.length);
    var r = t,
      i = 1,
      o = this[e + --r];
    while (r > 0 && (i *= 256)) o += this[e + --r] * i;
    return i *= 128, o >= i && (o -= Math.pow(2, 8 * t)), o;
  }, c.prototype.readInt8 = function (e, t) {
    return t || F(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
  }, c.prototype.readInt16LE = function (e, t) {
    t || F(e, 2, this.length);
    var n = this[e] | this[e + 1] << 8;
    return 32768 & n ? 4294901760 | n : n;
  }, c.prototype.readInt16BE = function (e, t) {
    t || F(e, 2, this.length);
    var n = this[e + 1] | this[e] << 8;
    return 32768 & n ? 4294901760 | n : n;
  }, c.prototype.readInt32LE = function (e, t) {
    return t || F(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
  }, c.prototype.readInt32BE = function (e, t) {
    return t || F(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
  }, c.prototype.readFloatLE = function (e, t) {
    return t || F(e, 4, this.length), i.read(this, e, !0, 23, 4);
  }, c.prototype.readFloatBE = function (e, t) {
    return t || F(e, 4, this.length), i.read(this, e, !1, 23, 4);
  }, c.prototype.readDoubleLE = function (e, t) {
    return t || F(e, 8, this.length), i.read(this, e, !0, 52, 8);
  }, c.prototype.readDoubleBE = function (e, t) {
    return t || F(e, 8, this.length), i.read(this, e, !1, 52, 8);
  }, c.prototype.writeUIntLE = function (e, t, n, r) {
    if (e = +e, t |= 0, n |= 0, !r) {
      var i = Math.pow(2, 8 * n) - 1;
      B(this, e, t, n, i, 0);
    }
    var o = 1,
      a = 0;
    this[t] = 255 & e;
    while (++a < n && (o *= 256)) this[t + a] = e / o & 255;
    return t + n;
  }, c.prototype.writeUIntBE = function (e, t, n, r) {
    if (e = +e, t |= 0, n |= 0, !r) {
      var i = Math.pow(2, 8 * n) - 1;
      B(this, e, t, n, i, 0);
    }
    var o = n - 1,
      a = 1;
    this[t + o] = 255 & e;
    while (--o >= 0 && (a *= 256)) this[t + o] = e / a & 255;
    return t + n;
  }, c.prototype.writeUInt8 = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] = 255 & e, t + 1;
  }, c.prototype.writeUInt16LE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : V(this, e, t, !0), t + 2;
  }, c.prototype.writeUInt16BE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : V(this, e, t, !1), t + 2;
  }, c.prototype.writeUInt32LE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : W(this, e, t, !0), t + 4;
  }, c.prototype.writeUInt32BE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : W(this, e, t, !1), t + 4;
  }, c.prototype.writeIntLE = function (e, t, n, r) {
    if (e = +e, t |= 0, !r) {
      var i = Math.pow(2, 8 * n - 1);
      B(this, e, t, n, i - 1, -i);
    }
    var o = 0,
      a = 1,
      s = 0;
    this[t] = 255 & e;
    while (++o < n && (a *= 256)) e < 0 && 0 === s && 0 !== this[t + o - 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
    return t + n;
  }, c.prototype.writeIntBE = function (e, t, n, r) {
    if (e = +e, t |= 0, !r) {
      var i = Math.pow(2, 8 * n - 1);
      B(this, e, t, n, i - 1, -i);
    }
    var o = n - 1,
      a = 1,
      s = 0;
    this[t + o] = 255 & e;
    while (--o >= 0 && (a *= 256)) e < 0 && 0 === s && 0 !== this[t + o + 1] && (s = 1), this[t + o] = (e / a >> 0) - s & 255;
    return t + n;
  }, c.prototype.writeInt8 = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
  }, c.prototype.writeInt16LE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8) : V(this, e, t, !0), t + 2;
  }, c.prototype.writeInt16BE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t + 1] = 255 & e) : V(this, e, t, !1), t + 2;
  }, c.prototype.writeInt32LE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : W(this, e, t, !0), t + 4;
  }, c.prototype.writeInt32BE = function (e, t, n) {
    return e = +e, t |= 0, n || B(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : W(this, e, t, !1), t + 4;
  }, c.prototype.writeFloatLE = function (e, t, n) {
    return U(this, e, t, !0, n);
  }, c.prototype.writeFloatBE = function (e, t, n) {
    return U(this, e, t, !1, n);
  }, c.prototype.writeDoubleLE = function (e, t, n) {
    return z(this, e, t, !0, n);
  }, c.prototype.writeDoubleBE = function (e, t, n) {
    return z(this, e, t, !1, n);
  }, c.prototype.copy = function (e, t, n, r) {
    if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 && r < n && (r = n), r === n) return 0;
    if (0 === e.length || 0 === this.length) return 0;
    if (t < 0) throw new RangeError("targetStart out of bounds");
    if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
    if (r < 0) throw new RangeError("sourceEnd out of bounds");
    r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
    var i,
      o = r - n;
    if (this === e && n < t && t < r) for (i = o - 1; i >= 0; --i) e[i + t] = this[i + n];else if (o < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) e[i + t] = this[i + n];else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
    return o;
  }, c.prototype.fill = function (e, t, n, r) {
    if ("string" === typeof e) {
      if ("string" === typeof t ? (r = t, t = 0, n = this.length) : "string" === typeof n && (r = n, n = this.length), 1 === e.length) {
        var i = e.charCodeAt(0);
        i < 256 && (e = i);
      }
      if (void 0 !== r && "string" !== typeof r) throw new TypeError("encoding must be a string");
      if ("string" === typeof r && !c.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
    } else "number" === typeof e && (e &= 255);
    if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
    if (n <= t) return this;
    var o;
    if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" === typeof e) for (o = t; o < n; ++o) this[o] = e;else {
      var a = c.isBuffer(e) ? e : X(new c(e, r).toString()),
        s = a.length;
      for (o = 0; o < n - t; ++o) this[o + t] = a[o % s];
    }
    return this;
  };
  var G = /[^+\/0-9A-Za-z-_]/g;
  function q(e) {
    if (e = K(e).replace(G, ""), e.length < 2) return "";
    while (e.length % 4 !== 0) e += "=";
    return e;
  }
  function K(e) {
    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
  }
  function Y(e) {
    return e < 16 ? "0" + e.toString(16) : e.toString(16);
  }
  function X(e, t) {
    var n;
    t = t || 1 / 0;
    for (var r = e.length, i = null, o = [], a = 0; a < r; ++a) {
      if (n = e.charCodeAt(a), n > 55295 && n < 57344) {
        if (!i) {
          if (n > 56319) {
            (t -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          if (a + 1 === r) {
            (t -= 3) > -1 && o.push(239, 191, 189);
            continue;
          }
          i = n;
          continue;
        }
        if (n < 56320) {
          (t -= 3) > -1 && o.push(239, 191, 189), i = n;
          continue;
        }
        n = 65536 + (i - 55296 << 10 | n - 56320);
      } else i && (t -= 3) > -1 && o.push(239, 191, 189);
      if (i = null, n < 128) {
        if ((t -= 1) < 0) break;
        o.push(n);
      } else if (n < 2048) {
        if ((t -= 2) < 0) break;
        o.push(n >> 6 | 192, 63 & n | 128);
      } else if (n < 65536) {
        if ((t -= 3) < 0) break;
        o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
      } else {
        if (!(n < 1114112)) throw new Error("Invalid code point");
        if ((t -= 4) < 0) break;
        o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
      }
    }
    return o;
  }
  function Q(e) {
    for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
    return t;
  }
  function Z(e, t) {
    for (var n, r, i, o = [], a = 0; a < e.length; ++a) {
      if ((t -= 2) < 0) break;
      n = e.charCodeAt(a), r = n >> 8, i = n % 256, o.push(i), o.push(r);
    }
    return o;
  }
  function J(e) {
    return r.toByteArray(q(e));
  }
  function ee(e, t, n, r) {
    for (var i = 0; i < r; ++i) {
      if (i + n >= t.length || i >= e.length) break;
      t[i + n] = e[i];
    }
    return i;
  }
  function te(e) {
    return e !== e;
  }
}).call(this, require("./globalObjectLegacy.js"));
