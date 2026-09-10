let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = require("./62597459.js");
function i(e) {
  return new o(e);
}
var o = function () {
    function e(e) {
      e = e || {}, this._reset = e.reset, this._plan = e.plan, this._count = e.count, this._onDirty = e.onDirty, this._dirty = !0;
    }
    return e.prototype.perform = function (e) {
      var t,
        n = this._upstream,
        i = e && e.skip;
      if (this._dirty && n) {
        var o = this.context;
        o.data = o.outputData = n.context.outputData;
      }
      this.__pipeline && (this.__pipeline.currentTask = this), this._plan && !i && (t = this._plan(this.context));
      var a,
        s = f(this._modBy),
        l = this._modDataCount || 0,
        u = f(e && e.modBy),
        c = e && e.modDataCount || 0;
      function f(e) {
        return !(e >= 1) && (e = 1), e;
      }
      s === u && l === c || (t = "reset"), (this._dirty || "reset" === t) && (this._dirty = !1, a = this._doReset(i)), this._modBy = u, this._modDataCount = c;
      var d = e && e.step;
      if (this._dueEnd = n ? n._outputDueEnd : this._count ? this._count(this.context) : 1 / 0, this._progress) {
        var h = this._dueIndex,
          p = Math.min(null != d ? this._dueIndex + d : 1 / 0, this._dueEnd);
        if (!i && (a || h < p)) {
          var g = this._progress;
          if (Object(r["r"])(g)) for (var m = 0; m < g.length; m++) this._doProgress(g[m], h, p, u, c);else this._doProgress(g, h, p, u, c);
        }
        this._dueIndex = p;
        var v = null != this._settedOutputEnd ? this._settedOutputEnd : p;
        0, this._outputDueEnd = v;
      } else this._dueIndex = this._outputDueEnd = null != this._settedOutputEnd ? this._settedOutputEnd : this._dueEnd;
      return this.unfinished();
    }, e.prototype.dirty = function () {
      this._dirty = !0, this._onDirty && this._onDirty(this.context);
    }, e.prototype._doProgress = function (e, t, n, r, i) {
      a.reset(t, n, r, i), this._callingProgress = e, this._callingProgress({
        start: t,
        end: n,
        count: n - t,
        next: a.next
      }, this.context);
    }, e.prototype._doReset = function (e) {
      var t, n;
      this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null, !e && this._reset && (t = this._reset(this.context), t && t.progress && (n = t.forceFirstProgress, t = t.progress), Object(r["r"])(t) && !t.length && (t = null)), this._progress = t, this._modBy = this._modDataCount = null;
      var i = this._downstream;
      return i && i.dirty(), n;
    }, e.prototype.unfinished = function () {
      return this._progress && this._dueIndex < this._dueEnd;
    }, e.prototype.pipe = function (e) {
      (this._downstream !== e || this._dirty) && (this._downstream = e, e._upstream = this, e.dirty());
    }, e.prototype.dispose = function () {
      this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
    }, e.prototype.getUpstream = function () {
      return this._upstream;
    }, e.prototype.getDownstream = function () {
      return this._downstream;
    }, e.prototype.setOutputEnd = function (e) {
      this._outputDueEnd = this._settedOutputEnd = e;
    }, e;
  }(),
  a = function () {
    var e,
      t,
      n,
      r,
      i,
      o = {
        reset: function (l, u, c, f) {
          t = l, e = u, n = c, r = f, i = Math.ceil(r / n), o.next = n > 1 && r > 0 ? s : a;
        }
      };
    return o;
    function a() {
      return t < e ? t++ : null;
    }
    function s() {
      var o = t % i * n + Math.ceil(t / i),
        a = t >= e ? null : o < r ? o : t;
      return t++, a;
    }
  }();
