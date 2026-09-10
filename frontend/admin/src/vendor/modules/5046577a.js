let legacyModule = module,
  legacyExports = exports;
try {
  var r = require("./7a733133.js");
} catch (e) {
  r = require("./7a733133.js");
}
var i = /\s+/,
  o = Object.prototype.toString;
function a(e) {
  if (!e || !e.nodeType) throw new Error("A DOM element reference is required");
  this.el = e, this.list = e.classList;
}
legacyModule.exports = function (e) {
  return new a(e);
}, a.prototype.add = function (e) {
  if (this.list) return this.list.add(e), this;
  var t = this.array(),
    n = r(t, e);
  return ~n || t.push(e), this.el.className = t.join(" "), this;
}, a.prototype.remove = function (e) {
  if ("[object RegExp]" == o.call(e)) return this.removeMatching(e);
  if (this.list) return this.list.remove(e), this;
  var t = this.array(),
    n = r(t, e);
  return ~n && t.splice(n, 1), this.el.className = t.join(" "), this;
}, a.prototype.removeMatching = function (e) {
  for (var t = this.array(), n = 0; n < t.length; n++) e.test(t[n]) && this.remove(t[n]);
  return this;
}, a.prototype.toggle = function (e, t) {
  return this.list ? ("undefined" !== typeof t ? t !== this.list.toggle(e, t) && this.list.toggle(e) : this.list.toggle(e), this) : ("undefined" !== typeof t ? t ? this.add(e) : this.remove(e) : this.has(e) ? this.remove(e) : this.add(e), this);
}, a.prototype.array = function () {
  var e = this.el.getAttribute("class") || "",
    t = e.replace(/^\s+|\s+$/g, ""),
    n = t.split(i);
  return "" === n[0] && n.shift(), n;
}, a.prototype.has = a.prototype.contains = function (e) {
  return this.list ? this.list.contains(e) : !!~r(this.array(), e);
};
