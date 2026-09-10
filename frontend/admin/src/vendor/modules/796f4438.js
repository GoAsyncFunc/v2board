let legacyModule = module,
  legacyExports = exports;
var r = require("./334f6a37.js"),
  i = [0, 0],
  o = [0, 0],
  a = new r["a"](),
  s = new r["a"](),
  l = function () {
    function e(e, t) {
      this._corners = [], this._axes = [], this._origin = [0, 0];
      for (var n = 0; n < 4; n++) this._corners[n] = new r["a"]();
      for (n = 0; n < 2; n++) this._axes[n] = new r["a"]();
      e && this.fromBoundingRect(e, t);
    }
    return e.prototype.fromBoundingRect = function (e, t) {
      var n = this._corners,
        i = this._axes,
        o = e.x,
        a = e.y,
        s = o + e.width,
        l = a + e.height;
      if (n[0].set(o, a), n[1].set(s, a), n[2].set(s, l), n[3].set(o, l), t) for (var c = 0; c < 4; c++) n[c].transform(t);
      r["a"].sub(i[0], n[1], n[0]), r["a"].sub(i[1], n[3], n[0]), i[0].normalize(), i[1].normalize();
      for (c = 0; c < 2; c++) this._origin[c] = i[c].dot(n[0]);
    }, e.prototype.intersect = function (e, t) {
      var n = !0,
        i = !t;
      return a.set(1 / 0, 1 / 0), s.set(0, 0), !this._intersectCheckOneSide(this, e, a, s, i, 1) && (n = !1, i) ? n : !this._intersectCheckOneSide(e, this, a, s, i, -1) && (n = !1, i) ? n : (i || r["a"].copy(t, n ? a : s), n);
    }, e.prototype._intersectCheckOneSide = function (e, t, n, a, s, l) {
      for (var c = !0, u = 0; u < 2; u++) {
        var h = this._axes[u];
        if (this._getProjMinMaxOnAxis(u, e._corners, i), this._getProjMinMaxOnAxis(u, t._corners, o), i[1] < o[0] || i[0] > o[1]) {
          if (c = !1, s) return c;
          var f = Math.abs(o[0] - i[1]),
            d = Math.abs(i[0] - o[1]);
          Math.min(f, d) > a.len() && (f < d ? r["a"].scale(a, h, -f * l) : r["a"].scale(a, h, d * l));
        } else if (n) {
          f = Math.abs(o[0] - i[1]), d = Math.abs(i[0] - o[1]);
          Math.min(f, d) < n.len() && (f < d ? r["a"].scale(n, h, f * l) : r["a"].scale(n, h, -d * l));
        }
      }
      return c;
    }, e.prototype._getProjMinMaxOnAxis = function (e, t, n) {
      for (var r = this._axes[e], i = this._origin, o = t[0].dot(r) + i[e], a = o, s = o, l = 1; l < t.length; l++) {
        var c = t[l].dot(r) + i[e];
        a = Math.min(c, a), s = Math.max(c, s);
      }
      n[0] = a, n[1] = s;
    }, e;
  }();
legacyExports["a"] = l;
