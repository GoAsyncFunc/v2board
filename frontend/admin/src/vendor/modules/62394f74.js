let legacyModule = module,
  legacyExports = exports;
var r = function () {
  function e(e) {
    e && (this._$eventProcessor = e);
  }
  return e.prototype.on = function (e, t, n, r) {
    this._$handlers || (this._$handlers = {});
    var i = this._$handlers;
    if ("function" === typeof t && (r = n, n = t, t = null), !n || !e) return this;
    var o = this._$eventProcessor;
    null != t && o && o.normalizeQuery && (t = o.normalizeQuery(t)), i[e] || (i[e] = []);
    for (var a = 0; a < i[e].length; a++) if (i[e][a].h === n) return this;
    var s = {
        h: n,
        query: t,
        ctx: r || this,
        callAtLast: n.zrEventfulCallAtLast
      },
      l = i[e].length - 1,
      c = i[e][l];
    return c && c.callAtLast ? i[e].splice(l, 0, s) : i[e].push(s), this;
  }, e.prototype.isSilent = function (e) {
    var t = this._$handlers;
    return !t || !t[e] || !t[e].length;
  }, e.prototype.off = function (e, t) {
    var n = this._$handlers;
    if (!n) return this;
    if (!e) return this._$handlers = {}, this;
    if (t) {
      if (n[e]) {
        for (var r = [], i = 0, o = n[e].length; i < o; i++) n[e][i].h !== t && r.push(n[e][i]);
        n[e] = r;
      }
      n[e] && 0 === n[e].length && delete n[e];
    } else delete n[e];
    return this;
  }, e.prototype.trigger = function (e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    if (!this._$handlers) return this;
    var r = this._$handlers[e],
      i = this._$eventProcessor;
    if (r) for (var o = t.length, a = r.length, s = 0; s < a; s++) {
      var l = r[s];
      if (!i || !i.filter || null == l.query || i.filter(e, l.query)) switch (o) {
        case 0:
          l.h.call(l.ctx);
          break;
        case 1:
          l.h.call(l.ctx, t[0]);
          break;
        case 2:
          l.h.call(l.ctx, t[0], t[1]);
          break;
        default:
          l.h.apply(l.ctx, t);
          break;
      }
    }
    return i && i.afterTrigger && i.afterTrigger(e), this;
  }, e.prototype.triggerWithContext = function (e) {
    for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
    if (!this._$handlers) return this;
    var r = this._$handlers[e],
      i = this._$eventProcessor;
    if (r) for (var o = t.length, a = t[o - 1], s = r.length, l = 0; l < s; l++) {
      var c = r[l];
      if (!i || !i.filter || null == c.query || i.filter(e, c.query)) switch (o) {
        case 0:
          c.h.call(a);
          break;
        case 1:
          c.h.call(a, t[0]);
          break;
        case 2:
          c.h.call(a, t[0], t[1]);
          break;
        default:
          c.h.apply(a, t.slice(1, o - 1));
          break;
      }
    }
    return i && i.afterTrigger && i.afterTrigger(e), this;
  }, e;
}();
legacyExports["a"] = r;
