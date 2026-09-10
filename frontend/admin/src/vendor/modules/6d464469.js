let legacyModule = module,
  legacyExports = exports;
var r = require("./466f6678.js"),
  i = require("./334f6a37.js"),
  o = Math.min,
  a = Math.max,
  s = new i["a"](),
  l = new i["a"](),
  c = new i["a"](),
  u = new i["a"](),
  h = new i["a"](),
  f = new i["a"](),
  d = function () {
    function e(e, t, n, r) {
      n < 0 && (e += n, n = -n), r < 0 && (t += r, r = -r), this.x = e, this.y = t, this.width = n, this.height = r;
    }
    return e.prototype.union = function (e) {
      var t = o(e.x, this.x),
        n = o(e.y, this.y);
      isFinite(this.x) && isFinite(this.width) ? this.width = a(e.x + e.width, this.x + this.width) - t : this.width = e.width, isFinite(this.y) && isFinite(this.height) ? this.height = a(e.y + e.height, this.y + this.height) - n : this.height = e.height, this.x = t, this.y = n;
    }, e.prototype.applyTransform = function (t) {
      e.applyTransform(this, this, t);
    }, e.prototype.calculateTransform = function (e) {
      var t = this,
        n = e.width / t.width,
        i = e.height / t.height,
        o = r["b"]();
      return r["h"](o, o, [-t.x, -t.y]), r["g"](o, o, [n, i]), r["h"](o, o, [e.x, e.y]), o;
    }, e.prototype.intersect = function (t, n) {
      if (!t) return !1;
      t instanceof e || (t = e.create(t));
      var r = this,
        o = r.x,
        a = r.x + r.width,
        s = r.y,
        l = r.y + r.height,
        c = t.x,
        u = t.x + t.width,
        d = t.y,
        p = t.y + t.height,
        m = !(a < c || u < o || l < d || p < s);
      if (n) {
        var g = 1 / 0,
          v = 0,
          y = Math.abs(a - c),
          b = Math.abs(u - o),
          w = Math.abs(l - d),
          x = Math.abs(p - s),
          _ = Math.min(y, b),
          E = Math.min(w, x);
        a < c || u < o ? _ > v && (v = _, y < b ? i["a"].set(f, -y, 0) : i["a"].set(f, b, 0)) : _ < g && (g = _, y < b ? i["a"].set(h, y, 0) : i["a"].set(h, -b, 0)), l < d || p < s ? E > v && (v = E, w < x ? i["a"].set(f, 0, -w) : i["a"].set(f, 0, x)) : _ < g && (g = _, w < x ? i["a"].set(h, 0, w) : i["a"].set(h, 0, -x));
      }
      return n && i["a"].copy(n, m ? h : f), m;
    }, e.prototype.contain = function (e, t) {
      var n = this;
      return e >= n.x && e <= n.x + n.width && t >= n.y && t <= n.y + n.height;
    }, e.prototype.clone = function () {
      return new e(this.x, this.y, this.width, this.height);
    }, e.prototype.copy = function (t) {
      e.copy(this, t);
    }, e.prototype.plain = function () {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      };
    }, e.prototype.isFinite = function () {
      return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
    }, e.prototype.isZero = function () {
      return 0 === this.width || 0 === this.height;
    }, e.create = function (t) {
      return new e(t.x, t.y, t.width, t.height);
    }, e.copy = function (e, t) {
      e.x = t.x, e.y = t.y, e.width = t.width, e.height = t.height;
    }, e.applyTransform = function (t, n, r) {
      if (r) {
        if (r[1] < 1e-5 && r[1] > -1e-5 && r[2] < 1e-5 && r[2] > -1e-5) {
          var i = r[0],
            h = r[3],
            f = r[4],
            d = r[5];
          return t.x = n.x * i + f, t.y = n.y * h + d, t.width = n.width * i, t.height = n.height * h, t.width < 0 && (t.x += t.width, t.width = -t.width), void (t.height < 0 && (t.y += t.height, t.height = -t.height));
        }
        s.x = c.x = n.x, s.y = u.y = n.y, l.x = u.x = n.x + n.width, l.y = c.y = n.y + n.height, s.transform(r), u.transform(r), l.transform(r), c.transform(r), t.x = o(s.x, l.x, c.x, u.x), t.y = o(s.y, l.y, c.y, u.y);
        var p = a(s.x, l.x, c.x, u.x),
          m = a(s.y, l.y, c.y, u.y);
        t.width = p - t.x, t.height = m - t.y;
      } else t !== n && e.copy(t, n);
    }, e;
  }();
legacyExports["a"] = d;
