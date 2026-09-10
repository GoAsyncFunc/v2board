let legacyModule = module,
  legacyExports = exports;
var r = Object.prototype.hasOwnProperty,
  i = "~";
function o() {}
function a(e, t, n) {
  this.fn = e, this.context = t, this.once = n || !1;
}
function s(e, t, n, r, o) {
  if ("function" !== typeof n) throw new TypeError("The listener must be a function");
  var s = new a(n, r || e, o),
    l = i ? i + t : t;
  return e._events[l] ? e._events[l].fn ? e._events[l] = [e._events[l], s] : e._events[l].push(s) : (e._events[l] = s, e._eventsCount++), e;
}
function l(e, t) {
  0 === --e._eventsCount ? e._events = new o() : delete e._events[t];
}
function c() {
  this._events = new o(), this._eventsCount = 0;
}
Object.create && (o.prototype = Object.create(null), new o().__proto__ || (i = !1)), c.prototype.eventNames = function () {
  var e,
    t,
    n = [];
  if (0 === this._eventsCount) return n;
  for (t in e = this._events) r.call(e, t) && n.push(i ? t.slice(1) : t);
  return Object.getOwnPropertySymbols ? n.concat(Object.getOwnPropertySymbols(e)) : n;
}, c.prototype.listeners = function (e) {
  var t = i ? i + e : e,
    n = this._events[t];
  if (!n) return [];
  if (n.fn) return [n.fn];
  for (var r = 0, o = n.length, a = new Array(o); r < o; r++) a[r] = n[r].fn;
  return a;
}, c.prototype.listenerCount = function (e) {
  var t = i ? i + e : e,
    n = this._events[t];
  return n ? n.fn ? 1 : n.length : 0;
}, c.prototype.emit = function (e, t, n, r, o, a) {
  var s = i ? i + e : e;
  if (!this._events[s]) return !1;
  var l,
    c,
    u = this._events[s],
    h = arguments.length;
  if (u.fn) {
    switch (u.once && this.removeListener(e, u.fn, void 0, !0), h) {
      case 1:
        return u.fn.call(u.context), !0;
      case 2:
        return u.fn.call(u.context, t), !0;
      case 3:
        return u.fn.call(u.context, t, n), !0;
      case 4:
        return u.fn.call(u.context, t, n, r), !0;
      case 5:
        return u.fn.call(u.context, t, n, r, o), !0;
      case 6:
        return u.fn.call(u.context, t, n, r, o, a), !0;
    }
    for (c = 1, l = new Array(h - 1); c < h; c++) l[c - 1] = arguments[c];
    u.fn.apply(u.context, l);
  } else {
    var f,
      d = u.length;
    for (c = 0; c < d; c++) switch (u[c].once && this.removeListener(e, u[c].fn, void 0, !0), h) {
      case 1:
        u[c].fn.call(u[c].context);
        break;
      case 2:
        u[c].fn.call(u[c].context, t);
        break;
      case 3:
        u[c].fn.call(u[c].context, t, n);
        break;
      case 4:
        u[c].fn.call(u[c].context, t, n, r);
        break;
      default:
        if (!l) for (f = 1, l = new Array(h - 1); f < h; f++) l[f - 1] = arguments[f];
        u[c].fn.apply(u[c].context, l);
    }
  }
  return !0;
}, c.prototype.on = function (e, t, n) {
  return s(this, e, t, n, !1);
}, c.prototype.once = function (e, t, n) {
  return s(this, e, t, n, !0);
}, c.prototype.removeListener = function (e, t, n, r) {
  var o = i ? i + e : e;
  if (!this._events[o]) return this;
  if (!t) return l(this, o), this;
  var a = this._events[o];
  if (a.fn) a.fn !== t || r && !a.once || n && a.context !== n || l(this, o);else {
    for (var s = 0, c = [], u = a.length; s < u; s++) (a[s].fn !== t || r && !a[s].once || n && a[s].context !== n) && c.push(a[s]);
    c.length ? this._events[o] = 1 === c.length ? c[0] : c : l(this, o);
  }
  return this;
}, c.prototype.removeAllListeners = function (e) {
  var t;
  return e ? (t = i ? i + e : e, this._events[t] && l(this, t)) : (this._events = new o(), this._eventsCount = 0), this;
}, c.prototype.off = c.prototype.removeListener, c.prototype.addListener = c.prototype.on, c.prefixed = i, c.EventEmitter = c, legacyModule.exports = c;
