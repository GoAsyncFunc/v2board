let legacyModule = module,
  legacyExports = exports;
function r(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
var i = require("./bufferRuntime.js").Buffer,
  o = require("./emptyModule.js");
function a(e, t, n) {
  e.copy(t, n);
}
legacyModule.exports = function () {
  function e() {
    r(this, e), this.head = null, this.tail = null, this.length = 0;
  }
  return e.prototype.push = function (e) {
    var t = {
      data: e,
      next: null
    };
    this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length;
  }, e.prototype.unshift = function (e) {
    var t = {
      data: e,
      next: this.head
    };
    0 === this.length && (this.tail = t), this.head = t, ++this.length;
  }, e.prototype.shift = function () {
    if (0 !== this.length) {
      var e = this.head.data;
      return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e;
    }
  }, e.prototype.clear = function () {
    this.head = this.tail = null, this.length = 0;
  }, e.prototype.join = function (e) {
    if (0 === this.length) return "";
    var t = this.head,
      n = "" + t.data;
    while (t = t.next) n += e + t.data;
    return n;
  }, e.prototype.concat = function (e) {
    if (0 === this.length) return i.alloc(0);
    if (1 === this.length) return this.head.data;
    var t = i.allocUnsafe(e >>> 0),
      n = this.head,
      r = 0;
    while (n) a(n.data, t, r), r += n.data.length, n = n.next;
    return t;
  }, e;
}(), o && o.inspect && o.inspect.custom && (legacyModule.exports.prototype[o.inspect.custom] = function () {
  var e = o.inspect({
    length: this.length
  });
  return this.constructor.name + " " + e;
});
