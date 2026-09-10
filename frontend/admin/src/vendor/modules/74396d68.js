let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "b", function () {
  return a;
}), defineExport(legacyExports, "a", function () {
  return l;
});
var r = require("./4f454c42.js"),
  i = require("./62597459.js"),
  o = require("./37613470.js");
function a(e, t) {
  var n = t && t.type;
  return "ordinal" === n ? e : ("time" !== n || Object(i["w"])(e) || null == e || "-" === e || (e = +Object(r["l"])(e)), null == e || "" === e ? NaN : +e);
}
Object(i["f"])({
  number: function (e) {
    return parseFloat(e);
  },
  time: function (e) {
    return +Object(r["l"])(e);
  },
  trim: function (e) {
    return Object(i["y"])(e) ? Object(i["O"])(e) : e;
  }
});
var s = {
    lt: function (e, t) {
      return e < t;
    },
    lte: function (e, t) {
      return e <= t;
    },
    gt: function (e, t) {
      return e > t;
    },
    gte: function (e, t) {
      return e >= t;
    }
  },
  l = (function () {
    function e(e, t) {
      if (!Object(i["w"])(t)) {
        var n = "";
        0, Object(o["c"])(n);
      }
      this._opFn = s[e], this._rvalFloat = Object(r["k"])(t);
    }
    e.prototype.evaluate = function (e) {
      return Object(i["w"])(e) ? this._opFn(e, this._rvalFloat) : this._opFn(Object(r["k"])(e), this._rvalFloat);
    };
  }(), function () {
    function e(e, t) {
      var n = "desc" === e;
      this._resultLT = n ? 1 : -1, null == t && (t = n ? "min" : "max"), this._incomparable = "min" === t ? -1 / 0 : 1 / 0;
    }
    return e.prototype.evaluate = function (e, t) {
      var n = Object(i["w"])(e) ? e : Object(r["k"])(e),
        o = Object(i["w"])(t) ? t : Object(r["k"])(t),
        a = isNaN(n),
        s = isNaN(o);
      if (a && (n = this._incomparable), s && (o = this._incomparable), a && s) {
        var l = Object(i["y"])(e),
          u = Object(i["y"])(t);
        l && (n = u ? e : 0), u && (o = l ? t : 0);
      }
      return n < o ? this._resultLT : n > o ? -this._resultLT : 0;
    }, e;
  }());
(function () {
  function e(e, t) {
    this._rval = t, this._isEQ = e, this._rvalTypeof = typeof t, this._rvalFloat = Object(r["k"])(t);
  }
  e.prototype.evaluate = function (e) {
    var t = e === this._rval;
    if (!t) {
      var n = typeof e;
      n === this._rvalTypeof || "number" !== n && "number" !== this._rvalTypeof || (t = Object(r["k"])(e) === this._rvalFloat);
    }
    return this._isEQ ? t : !t;
  };
})();
