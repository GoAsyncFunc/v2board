let legacyModule = module,
  legacyExports = exports;
function r(e, t, n) {
  this.type = e, this.tag = t, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
r.prototype.attrIndex = function (e) {
  var t, n, r;
  if (!this.attrs) return -1;
  for (t = this.attrs, n = 0, r = t.length; n < r; n++) if (t[n][0] === e) return n;
  return -1;
}, r.prototype.attrPush = function (e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
}, r.prototype.attrSet = function (e, t) {
  var n = this.attrIndex(e),
    r = [e, t];
  n < 0 ? this.attrPush(r) : this.attrs[n] = r;
}, r.prototype.attrGet = function (e) {
  var t = this.attrIndex(e),
    n = null;
  return t >= 0 && (n = this.attrs[t][1]), n;
}, r.prototype.attrJoin = function (e, t) {
  var n = this.attrIndex(e);
  n < 0 ? this.attrPush([e, t]) : this.attrs[n][1] = this.attrs[n][1] + " " + t;
}, legacyModule.exports = r;
