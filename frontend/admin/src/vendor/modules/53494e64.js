let legacyModule = module,
  legacyExports = exports;
function r() {
  this.__rules__ = [], this.__cache__ = null;
}
r.prototype.__find__ = function (e) {
  for (var t = 0; t < this.__rules__.length; t++) if (this.__rules__[t].name === e) return t;
  return -1;
}, r.prototype.__compile__ = function () {
  var e = this,
    t = [""];
  e.__rules__.forEach(function (e) {
    e.enabled && e.alt.forEach(function (e) {
      t.indexOf(e) < 0 && t.push(e);
    });
  }), e.__cache__ = {}, t.forEach(function (t) {
    e.__cache__[t] = [], e.__rules__.forEach(function (n) {
      n.enabled && (t && n.alt.indexOf(t) < 0 || e.__cache__[t].push(n.fn));
    });
  });
}, r.prototype.at = function (e, t, n) {
  var r = this.__find__(e),
    i = n || {};
  if (-1 === r) throw new Error("Parser rule not found: " + e);
  this.__rules__[r].fn = t, this.__rules__[r].alt = i.alt || [], this.__cache__ = null;
}, r.prototype.before = function (e, t, n, r) {
  var i = this.__find__(e),
    o = r || {};
  if (-1 === i) throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(i, 0, {
    name: t,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
}, r.prototype.after = function (e, t, n, r) {
  var i = this.__find__(e),
    o = r || {};
  if (-1 === i) throw new Error("Parser rule not found: " + e);
  this.__rules__.splice(i + 1, 0, {
    name: t,
    enabled: !0,
    fn: n,
    alt: o.alt || []
  }), this.__cache__ = null;
}, r.prototype.push = function (e, t, n) {
  var r = n || {};
  this.__rules__.push({
    name: e,
    enabled: !0,
    fn: t,
    alt: r.alt || []
  }), this.__cache__ = null;
}, r.prototype.enable = function (e, t) {
  Array.isArray(e) || (e = [e]);
  var n = [];
  return e.forEach(function (e) {
    var r = this.__find__(e);
    if (r < 0) {
      if (t) return;
      throw new Error("Rules manager: invalid rule name " + e);
    }
    this.__rules__[r].enabled = !0, n.push(e);
  }, this), this.__cache__ = null, n;
}, r.prototype.enableOnly = function (e, t) {
  Array.isArray(e) || (e = [e]), this.__rules__.forEach(function (e) {
    e.enabled = !1;
  }), this.enable(e, t);
}, r.prototype.disable = function (e, t) {
  Array.isArray(e) || (e = [e]);
  var n = [];
  return e.forEach(function (e) {
    var r = this.__find__(e);
    if (r < 0) {
      if (t) return;
      throw new Error("Rules manager: invalid rule name " + e);
    }
    this.__rules__[r].enabled = !1, n.push(e);
  }, this), this.__cache__ = null, n;
}, r.prototype.getRules = function (e) {
  return null === this.__cache__ && this.__compile__(), this.__cache__[e] || [];
}, legacyModule.exports = r;
