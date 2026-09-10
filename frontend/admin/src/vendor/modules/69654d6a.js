let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./4f454c42.js"),
  o = require("./37614b42.js"),
  a = require("./344e6755.js"),
  s = require("./6c45374a.js"),
  l = i["q"],
  u = function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t.type = "interval", t._interval = 0, t._intervalPrecision = 2, t;
    }
    return Object(r["a"])(t, e), t.prototype.parse = function (e) {
      return e;
    }, t.prototype.contain = function (e) {
      return s["a"](e, this._extent);
    }, t.prototype.normalize = function (e) {
      return s["f"](e, this._extent);
    }, t.prototype.scale = function (e) {
      return s["g"](e, this._extent);
    }, t.prototype.setExtent = function (e, t) {
      var n = this._extent;
      isNaN(e) || (n[0] = parseFloat(e)), isNaN(t) || (n[1] = parseFloat(t));
    }, t.prototype.unionExtent = function (e) {
      var t = this._extent;
      e[0] < t[0] && (t[0] = e[0]), e[1] > t[1] && (t[1] = e[1]), this.setExtent(t[0], t[1]);
    }, t.prototype.getInterval = function () {
      return this._interval;
    }, t.prototype.setInterval = function (e) {
      this._interval = e, this._niceExtent = this._extent.slice(), this._intervalPrecision = s["b"](e);
    }, t.prototype.getTicks = function (e) {
      var t = this._interval,
        n = this._extent,
        r = this._niceExtent,
        i = this._intervalPrecision,
        o = [];
      if (!t) return o;
      var a = 1e4;
      n[0] < r[0] && (e ? o.push({
        value: l(r[0] - t, i)
      }) : o.push({
        value: n[0]
      }));
      var s = r[0];
      while (s <= r[1]) {
        if (o.push({
          value: s
        }), s = l(s + t, i), s === o[o.length - 1].value) break;
        if (o.length > a) return [];
      }
      var u = o.length ? o[o.length - 1].value : r[1];
      return n[1] > u && (e ? o.push({
        value: l(u + t, i)
      }) : o.push({
        value: n[1]
      })), o;
    }, t.prototype.getMinorTicks = function (e) {
      for (var t = this.getTicks(!0), n = [], r = this.getExtent(), i = 1; i < t.length; i++) {
        var o = t[i],
          a = t[i - 1],
          s = 0,
          u = [],
          c = o.value - a.value,
          f = c / e;
        while (s < e - 1) {
          var d = l(a.value + (s + 1) * f);
          d > r[0] && d < r[1] && u.push(d), s++;
        }
        n.push(u);
      }
      return n;
    }, t.prototype.getLabel = function (e, t) {
      if (null == e) return "";
      var n = t && t.precision;
      null == n ? n = i["e"](e.value) || 0 : "auto" === n && (n = this._intervalPrecision);
      var r = l(e.value, n, !0);
      return o["a"](r);
    }, t.prototype.calcNiceTicks = function (e, t, n) {
      e = e || 5;
      var r = this._extent,
        i = r[1] - r[0];
      if (isFinite(i)) {
        i < 0 && (i = -i, r.reverse());
        var o = s["d"](r, e, t, n);
        this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
      }
    }, t.prototype.calcNiceExtent = function (e) {
      var t = this._extent;
      if (t[0] === t[1]) if (0 !== t[0]) {
        var n = Math.abs(t[0]);
        e.fixMax ? t[0] -= n / 2 : (t[1] += n / 2, t[0] -= n / 2);
      } else t[1] = 1;
      var r = t[1] - t[0];
      isFinite(r) || (t[0] = 0, t[1] = 1), this.calcNiceTicks(e.splitNumber, e.minInterval, e.maxInterval);
      var i = this._interval;
      e.fixMin || (t[0] = l(Math.floor(t[0] / i) * i)), e.fixMax || (t[1] = l(Math.ceil(t[1] / i) * i));
    }, t.prototype.setNiceExtent = function (e, t) {
      this._niceExtent = [e, t];
    }, t.type = "interval", t;
  }(a["a"]);
a["a"].registerClass(u), legacyExports["a"] = u;
