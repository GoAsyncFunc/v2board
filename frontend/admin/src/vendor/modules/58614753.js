let legacyModule = module,
  legacyExports = exports;
(function (e, n) {
  var r = 200,
    i = "__lodash_hash_undefined__",
    o = 1,
    a = 2,
    s = 9007199254740991,
    l = "[object Arguments]",
    c = "[object Array]",
    u = "[object AsyncFunction]",
    h = "[object Boolean]",
    f = "[object Date]",
    d = "[object Error]",
    p = "[object Function]",
    m = "[object GeneratorFunction]",
    g = "[object Map]",
    v = "[object Number]",
    y = "[object Null]",
    b = "[object Object]",
    w = "[object Promise]",
    x = "[object Proxy]",
    _ = "[object RegExp]",
    E = "[object Set]",
    S = "[object String]",
    k = "[object Symbol]",
    C = "[object Undefined]",
    O = "[object WeakMap]",
    T = "[object ArrayBuffer]",
    L = "[object DataView]",
    A = "[object Float32Array]",
    P = "[object Float64Array]",
    j = "[object Int8Array]",
    M = "[object Int16Array]",
    R = "[object Int32Array]",
    N = "[object Uint8Array]",
    D = "[object Uint8ClampedArray]",
    I = "[object Uint16Array]",
    $ = "[object Uint32Array]",
    F = /[\\^$.*+?()[\]{}|]/g,
    B = /^\[object .+?Constructor\]$/,
    V = /^(?:0|[1-9]\d*)$/,
    W = {};
  W[A] = W[P] = W[j] = W[M] = W[R] = W[N] = W[D] = W[I] = W[$] = !0, W[l] = W[c] = W[T] = W[h] = W[L] = W[f] = W[d] = W[p] = W[g] = W[v] = W[b] = W[_] = W[E] = W[S] = W[O] = !1;
  var H = "object" == typeof e && e && e.Object === Object && e,
    U = "object" == typeof self && self && self.Object === Object && self,
    z = H || U || Function("return this")(),
    G = legacyExports && !legacyExports.nodeType && legacyExports,
    q = G && "object" == typeof n && n && !n.nodeType && n,
    K = q && q.exports === G,
    Y = K && H.process,
    X = function () {
      try {
        return Y && Y.binding && Y.binding("util");
      } catch (e) {}
    }(),
    Q = X && X.isTypedArray;
  function Z(e, t) {
    var n = -1,
      r = null == e ? 0 : e.length,
      i = 0,
      o = [];
    while (++n < r) {
      var a = e[n];
      t(a, n, e) && (o[i++] = a);
    }
    return o;
  }
  function J(e, t) {
    var n = -1,
      r = t.length,
      i = e.length;
    while (++n < r) e[i + n] = t[n];
    return e;
  }
  function ee(e, t) {
    var n = -1,
      r = null == e ? 0 : e.length;
    while (++n < r) if (t(e[n], n, e)) return !0;
    return !1;
  }
  function te(e, t) {
    var n = -1,
      r = Array(e);
    while (++n < e) r[n] = t(n);
    return r;
  }
  function ne(e) {
    return function (t) {
      return e(t);
    };
  }
  function re(e, t) {
    return e.has(t);
  }
  function ie(e, t) {
    return null == e ? void 0 : e[t];
  }
  function oe(e) {
    var t = -1,
      n = Array(e.size);
    return e.forEach(function (e, r) {
      n[++t] = [r, e];
    }), n;
  }
  function ae(e, t) {
    return function (n) {
      return e(t(n));
    };
  }
  function se(e) {
    var t = -1,
      n = Array(e.size);
    return e.forEach(function (e) {
      n[++t] = e;
    }), n;
  }
  var le = Array.prototype,
    ce = Function.prototype,
    ue = Object.prototype,
    he = z["__core-js_shared__"],
    fe = ce.toString,
    de = ue.hasOwnProperty,
    pe = function () {
      var e = /[^.]+$/.exec(he && he.keys && he.keys.IE_PROTO || "");
      return e ? "Symbol(src)_1." + e : "";
    }(),
    me = ue.toString,
    ge = RegExp("^" + fe.call(de).replace(F, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
    ve = K ? z.Buffer : void 0,
    ye = z.Symbol,
    be = z.Uint8Array,
    we = ue.propertyIsEnumerable,
    xe = le.splice,
    _e = ye ? ye.toStringTag : void 0,
    Ee = Object.getOwnPropertySymbols,
    Se = ve ? ve.isBuffer : void 0,
    ke = ae(Object.keys, Object),
    Ce = Ot(z, "DataView"),
    Oe = Ot(z, "Map"),
    Te = Ot(z, "Promise"),
    Le = Ot(z, "Set"),
    Ae = Ot(z, "WeakMap"),
    Pe = Ot(Object, "create"),
    je = Dt(Ce),
    Me = Dt(Oe),
    Re = Dt(Te),
    Ne = Dt(Le),
    De = Dt(Ae),
    Ie = ye ? ye.prototype : void 0,
    $e = Ie ? Ie.valueOf : void 0;
  function Fe(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    this.clear();
    while (++t < n) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  function Be() {
    this.__data__ = Pe ? Pe(null) : {}, this.size = 0;
  }
  function Ve(e) {
    var t = this.has(e) && delete this.__data__[e];
    return this.size -= t ? 1 : 0, t;
  }
  function We(e) {
    var t = this.__data__;
    if (Pe) {
      var n = t[e];
      return n === i ? void 0 : n;
    }
    return de.call(t, e) ? t[e] : void 0;
  }
  function He(e) {
    var t = this.__data__;
    return Pe ? void 0 !== t[e] : de.call(t, e);
  }
  function Ue(e, t) {
    var n = this.__data__;
    return this.size += this.has(e) ? 0 : 1, n[e] = Pe && void 0 === t ? i : t, this;
  }
  function ze(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    this.clear();
    while (++t < n) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  function Ge() {
    this.__data__ = [], this.size = 0;
  }
  function qe(e) {
    var t = this.__data__,
      n = dt(t, e);
    if (n < 0) return !1;
    var r = t.length - 1;
    return n == r ? t.pop() : xe.call(t, n, 1), --this.size, !0;
  }
  function Ke(e) {
    var t = this.__data__,
      n = dt(t, e);
    return n < 0 ? void 0 : t[n][1];
  }
  function Ye(e) {
    return dt(this.__data__, e) > -1;
  }
  function Xe(e, t) {
    var n = this.__data__,
      r = dt(n, e);
    return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
  }
  function Qe(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    this.clear();
    while (++t < n) {
      var r = e[t];
      this.set(r[0], r[1]);
    }
  }
  function Ze() {
    this.size = 0, this.__data__ = {
      hash: new Fe(),
      map: new (Oe || ze)(),
      string: new Fe()
    };
  }
  function Je(e) {
    var t = Ct(this, e)["delete"](e);
    return this.size -= t ? 1 : 0, t;
  }
  function et(e) {
    return Ct(this, e).get(e);
  }
  function tt(e) {
    return Ct(this, e).has(e);
  }
  function nt(e, t) {
    var n = Ct(this, e),
      r = n.size;
    return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
  }
  function rt(e) {
    var t = -1,
      n = null == e ? 0 : e.length;
    this.__data__ = new Qe();
    while (++t < n) this.add(e[t]);
  }
  function it(e) {
    return this.__data__.set(e, i), this;
  }
  function ot(e) {
    return this.__data__.has(e);
  }
  function at(e) {
    var t = this.__data__ = new ze(e);
    this.size = t.size;
  }
  function st() {
    this.__data__ = new ze(), this.size = 0;
  }
  function lt(e) {
    var t = this.__data__,
      n = t["delete"](e);
    return this.size = t.size, n;
  }
  function ct(e) {
    return this.__data__.get(e);
  }
  function ut(e) {
    return this.__data__.has(e);
  }
  function ht(e, t) {
    var n = this.__data__;
    if (n instanceof ze) {
      var i = n.__data__;
      if (!Oe || i.length < r - 1) return i.push([e, t]), this.size = ++n.size, this;
      n = this.__data__ = new Qe(i);
    }
    return n.set(e, t), this.size = n.size, this;
  }
  function ft(e, t) {
    var n = Ft(e),
      r = !n && $t(e),
      i = !n && !r && Vt(e),
      o = !n && !r && !i && qt(e),
      a = n || r || i || o,
      s = a ? te(e.length, String) : [],
      l = s.length;
    for (var c in e) !t && !de.call(e, c) || a && ("length" == c || i && ("offset" == c || "parent" == c) || o && ("buffer" == c || "byteLength" == c || "byteOffset" == c) || Pt(c, l)) || s.push(c);
    return s;
  }
  function dt(e, t) {
    var n = e.length;
    while (n--) if (It(e[n][0], t)) return n;
    return -1;
  }
  function pt(e, t, n) {
    var r = t(e);
    return Ft(e) ? r : J(r, n(e));
  }
  function mt(e) {
    return null == e ? void 0 === e ? C : y : _e && _e in Object(e) ? Tt(e) : Nt(e);
  }
  function gt(e) {
    return Gt(e) && mt(e) == l;
  }
  function vt(e, t, n, r, i) {
    return e === t || (null == e || null == t || !Gt(e) && !Gt(t) ? e !== e && t !== t : yt(e, t, n, r, vt, i));
  }
  function yt(e, t, n, r, i, a) {
    var s = Ft(e),
      u = Ft(t),
      h = s ? c : At(e),
      f = u ? c : At(t);
    h = h == l ? b : h, f = f == l ? b : f;
    var d = h == b,
      p = f == b,
      m = h == f;
    if (m && Vt(e)) {
      if (!Vt(t)) return !1;
      s = !0, d = !1;
    }
    if (m && !d) return a || (a = new at()), s || qt(e) ? _t(e, t, n, r, i, a) : Et(e, t, h, n, r, i, a);
    if (!(n & o)) {
      var g = d && de.call(e, "__wrapped__"),
        v = p && de.call(t, "__wrapped__");
      if (g || v) {
        var y = g ? e.value() : e,
          w = v ? t.value() : t;
        return a || (a = new at()), i(y, w, n, r, a);
      }
    }
    return !!m && (a || (a = new at()), St(e, t, n, r, i, a));
  }
  function bt(e) {
    if (!zt(e) || Mt(e)) return !1;
    var t = Ht(e) ? ge : B;
    return t.test(Dt(e));
  }
  function wt(e) {
    return Gt(e) && Ut(e.length) && !!W[mt(e)];
  }
  function xt(e) {
    if (!Rt(e)) return ke(e);
    var t = [];
    for (var n in Object(e)) de.call(e, n) && "constructor" != n && t.push(n);
    return t;
  }
  function _t(e, t, n, r, i, s) {
    var l = n & o,
      c = e.length,
      u = t.length;
    if (c != u && !(l && u > c)) return !1;
    var h = s.get(e);
    if (h && s.get(t)) return h == t;
    var f = -1,
      d = !0,
      p = n & a ? new rt() : void 0;
    s.set(e, t), s.set(t, e);
    while (++f < c) {
      var m = e[f],
        g = t[f];
      if (r) var v = l ? r(g, m, f, t, e, s) : r(m, g, f, e, t, s);
      if (void 0 !== v) {
        if (v) continue;
        d = !1;
        break;
      }
      if (p) {
        if (!ee(t, function (e, t) {
          if (!re(p, t) && (m === e || i(m, e, n, r, s))) return p.push(t);
        })) {
          d = !1;
          break;
        }
      } else if (m !== g && !i(m, g, n, r, s)) {
        d = !1;
        break;
      }
    }
    return s["delete"](e), s["delete"](t), d;
  }
  function Et(e, t, n, r, i, s, l) {
    switch (n) {
      case L:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
        e = e.buffer, t = t.buffer;
      case T:
        return !(e.byteLength != t.byteLength || !s(new be(e), new be(t)));
      case h:
      case f:
      case v:
        return It(+e, +t);
      case d:
        return e.name == t.name && e.message == t.message;
      case _:
      case S:
        return e == t + "";
      case g:
        var c = oe;
      case E:
        var u = r & o;
        if (c || (c = se), e.size != t.size && !u) return !1;
        var p = l.get(e);
        if (p) return p == t;
        r |= a, l.set(e, t);
        var m = _t(c(e), c(t), r, i, s, l);
        return l["delete"](e), m;
      case k:
        if ($e) return $e.call(e) == $e.call(t);
    }
    return !1;
  }
  function St(e, t, n, r, i, a) {
    var s = n & o,
      l = kt(e),
      c = l.length,
      u = kt(t),
      h = u.length;
    if (c != h && !s) return !1;
    var f = c;
    while (f--) {
      var d = l[f];
      if (!(s ? d in t : de.call(t, d))) return !1;
    }
    var p = a.get(e);
    if (p && a.get(t)) return p == t;
    var m = !0;
    a.set(e, t), a.set(t, e);
    var g = s;
    while (++f < c) {
      d = l[f];
      var v = e[d],
        y = t[d];
      if (r) var b = s ? r(y, v, d, t, e, a) : r(v, y, d, e, t, a);
      if (!(void 0 === b ? v === y || i(v, y, n, r, a) : b)) {
        m = !1;
        break;
      }
      g || (g = "constructor" == d);
    }
    if (m && !g) {
      var w = e.constructor,
        x = t.constructor;
      w != x && "constructor" in e && "constructor" in t && !("function" == typeof w && w instanceof w && "function" == typeof x && x instanceof x) && (m = !1);
    }
    return a["delete"](e), a["delete"](t), m;
  }
  function kt(e) {
    return pt(e, Kt, Lt);
  }
  function Ct(e, t) {
    var n = e.__data__;
    return jt(t) ? n["string" == typeof t ? "string" : "hash"] : n.map;
  }
  function Ot(e, t) {
    var n = ie(e, t);
    return bt(n) ? n : void 0;
  }
  function Tt(e) {
    var t = de.call(e, _e),
      n = e[_e];
    try {
      e[_e] = void 0;
      var r = !0;
    } catch (e) {}
    var i = me.call(e);
    return r && (t ? e[_e] = n : delete e[_e]), i;
  }
  Fe.prototype.clear = Be, Fe.prototype["delete"] = Ve, Fe.prototype.get = We, Fe.prototype.has = He, Fe.prototype.set = Ue, ze.prototype.clear = Ge, ze.prototype["delete"] = qe, ze.prototype.get = Ke, ze.prototype.has = Ye, ze.prototype.set = Xe, Qe.prototype.clear = Ze, Qe.prototype["delete"] = Je, Qe.prototype.get = et, Qe.prototype.has = tt, Qe.prototype.set = nt, rt.prototype.add = rt.prototype.push = it, rt.prototype.has = ot, at.prototype.clear = st, at.prototype["delete"] = lt, at.prototype.get = ct, at.prototype.has = ut, at.prototype.set = ht;
  var Lt = Ee ? function (e) {
      return null == e ? [] : (e = Object(e), Z(Ee(e), function (t) {
        return we.call(e, t);
      }));
    } : Yt,
    At = mt;
  function Pt(e, t) {
    return t = null == t ? s : t, !!t && ("number" == typeof e || V.test(e)) && e > -1 && e % 1 == 0 && e < t;
  }
  function jt(e) {
    var t = typeof e;
    return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e;
  }
  function Mt(e) {
    return !!pe && pe in e;
  }
  function Rt(e) {
    var t = e && e.constructor,
      n = "function" == typeof t && t.prototype || ue;
    return e === n;
  }
  function Nt(e) {
    return me.call(e);
  }
  function Dt(e) {
    if (null != e) {
      try {
        return fe.call(e);
      } catch (e) {}
      try {
        return e + "";
      } catch (e) {}
    }
    return "";
  }
  function It(e, t) {
    return e === t || e !== e && t !== t;
  }
  (Ce && At(new Ce(new ArrayBuffer(1))) != L || Oe && At(new Oe()) != g || Te && At(Te.resolve()) != w || Le && At(new Le()) != E || Ae && At(new Ae()) != O) && (At = function (e) {
    var t = mt(e),
      n = t == b ? e.constructor : void 0,
      r = n ? Dt(n) : "";
    if (r) switch (r) {
      case je:
        return L;
      case Me:
        return g;
      case Re:
        return w;
      case Ne:
        return E;
      case De:
        return O;
    }
    return t;
  });
  var $t = gt(function () {
      return arguments;
    }()) ? gt : function (e) {
      return Gt(e) && de.call(e, "callee") && !we.call(e, "callee");
    },
    Ft = Array.isArray;
  function Bt(e) {
    return null != e && Ut(e.length) && !Ht(e);
  }
  var Vt = Se || Xt;
  function Wt(e, t) {
    return vt(e, t);
  }
  function Ht(e) {
    if (!zt(e)) return !1;
    var t = mt(e);
    return t == p || t == m || t == u || t == x;
  }
  function Ut(e) {
    return "number" == typeof e && e > -1 && e % 1 == 0 && e <= s;
  }
  function zt(e) {
    var t = typeof e;
    return null != e && ("object" == t || "function" == t);
  }
  function Gt(e) {
    return null != e && "object" == typeof e;
  }
  var qt = Q ? ne(Q) : wt;
  function Kt(e) {
    return Bt(e) ? ft(e) : xt(e);
  }
  function Yt() {
    return [];
  }
  function Xt() {
    return !1;
  }
  n.exports = Wt;
}).call(this, require("./globalObjectLegacy.js"), require("./59755469.js")(legacyModule));
