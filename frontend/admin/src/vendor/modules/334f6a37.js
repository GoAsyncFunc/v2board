let legacyModule = module,
  legacyExports = exports;
var r = function () {
  function e(e, t) {
    this.x = e || 0, this.y = t || 0;
  }
  return e.prototype.copy = function (e) {
    return this.x = e.x, this.y = e.y, this;
  }, e.prototype.clone = function () {
    return new e(this.x, this.y);
  }, e.prototype.set = function (e, t) {
    return this.x = e, this.y = t, this;
  }, e.prototype.equal = function (e) {
    return e.x === this.x && e.y === this.y;
  }, e.prototype.add = function (e) {
    return this.x += e.x, this.y += e.y, this;
  }, e.prototype.scale = function (e) {
    this.x *= e, this.y *= e;
  }, e.prototype.scaleAndAdd = function (e, t) {
    this.x += e.x * t, this.y += e.y * t;
  }, e.prototype.sub = function (e) {
    return this.x -= e.x, this.y -= e.y, this;
  }, e.prototype.dot = function (e) {
    return this.x * e.x + this.y * e.y;
  }, e.prototype.len = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, e.prototype.lenSquare = function () {
    return this.x * this.x + this.y * this.y;
  }, e.prototype.normalize = function () {
    var e = this.len();
    return this.x /= e, this.y /= e, this;
  }, e.prototype.distance = function (e) {
    var t = this.x - e.x,
      n = this.y - e.y;
    return Math.sqrt(t * t + n * n);
  }, e.prototype.distanceSquare = function (e) {
    var t = this.x - e.x,
      n = this.y - e.y;
    return t * t + n * n;
  }, e.prototype.negate = function () {
    return this.x = -this.x, this.y = -this.y, this;
  }, e.prototype.transform = function (e) {
    if (e) {
      var t = this.x,
        n = this.y;
      return this.x = e[0] * t + e[2] * n + e[4], this.y = e[1] * t + e[3] * n + e[5], this;
    }
  }, e.prototype.toArray = function (e) {
    return e[0] = this.x, e[1] = this.y, e;
  }, e.prototype.fromArray = function (e) {
    this.x = e[0], this.y = e[1];
  }, e.set = function (e, t, n) {
    e.x = t, e.y = n;
  }, e.copy = function (e, t) {
    e.x = t.x, e.y = t.y;
  }, e.len = function (e) {
    return Math.sqrt(e.x * e.x + e.y * e.y);
  }, e.lenSquare = function (e) {
    return e.x * e.x + e.y * e.y;
  }, e.dot = function (e, t) {
    return e.x * t.x + e.y * t.y;
  }, e.add = function (e, t, n) {
    e.x = t.x + n.x, e.y = t.y + n.y;
  }, e.sub = function (e, t, n) {
    e.x = t.x - n.x, e.y = t.y - n.y;
  }, e.scale = function (e, t, n) {
    e.x = t.x * n, e.y = t.y * n;
  }, e.scaleAndAdd = function (e, t, n, r) {
    e.x = t.x + n.x * r, e.y = t.y + n.y * r;
  }, e.lerp = function (e, t, n, r) {
    var i = 1 - r;
    e.x = i * t.x + r * n.x, e.y = i * t.y + r * n.y;
  }, e;
}();
legacyExports["a"] = r;
