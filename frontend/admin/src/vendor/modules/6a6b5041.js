let legacyModule = module,
  legacyExports = exports;
var r = require("./62597459.js"),
  i = 0,
  o = function () {
    function e(e) {
      this.categories = e.categories || [], this._needCollect = e.needCollect, this._deduplication = e.deduplication, this.uid = ++i;
    }
    return e.createByAxisModel = function (t) {
      var n = t.option,
        i = n.data,
        o = i && Object(r["D"])(i, a);
      return new e({
        categories: o,
        needCollect: !o,
        deduplication: !1 !== n.dedplication
      });
    }, e.prototype.getOrdinal = function (e) {
      return this._getOrCreateMap().get(e);
    }, e.prototype.parseAndCollect = function (e) {
      var t,
        n = this._needCollect;
      if (!Object(r["y"])(e) && !n) return e;
      if (n && !this._deduplication) return t = this.categories.length, this.categories[t] = e, t;
      var i = this._getOrCreateMap();
      return t = i.get(e), null == t && (n ? (t = this.categories.length, this.categories[t] = e, i.set(e, t)) : t = NaN), t;
    }, e.prototype._getOrCreateMap = function () {
      return this._map || (this._map = Object(r["f"])(this.categories));
    }, e;
  }();
function a(e) {
  return Object(r["x"])(e) && null != e.value ? e.value : e + "";
}
legacyExports["a"] = o;
