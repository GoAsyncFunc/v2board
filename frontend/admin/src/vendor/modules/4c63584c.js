let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./62597459.js"),
  o = require("./31626454.js"),
  a = require("./6d464469.js"),
  s = function (e) {
    function t(t) {
      var n = e.call(this) || this;
      return n.isGroup = !0, n._children = [], n.attr(t), n;
    }
    return Object(r["a"])(t, e), t.prototype.childrenRef = function () {
      return this._children;
    }, t.prototype.children = function () {
      return this._children.slice();
    }, t.prototype.childAt = function (e) {
      return this._children[e];
    }, t.prototype.childOfName = function (e) {
      for (var t = this._children, n = 0; n < t.length; n++) if (t[n].name === e) return t[n];
    }, t.prototype.childCount = function () {
      return this._children.length;
    }, t.prototype.add = function (e) {
      return e && e !== this && e.parent !== this && (this._children.push(e), this._doAdd(e)), this;
    }, t.prototype.addBefore = function (e, t) {
      if (e && e !== this && e.parent !== this && t && t.parent === this) {
        var n = this._children,
          r = n.indexOf(t);
        r >= 0 && (n.splice(r, 0, e), this._doAdd(e));
      }
      return this;
    }, t.prototype.replace = function (e, t) {
      var n = i["p"](this._children, e);
      return n >= 0 && this.replaceAt(t, n), this;
    }, t.prototype.replaceAt = function (e, t) {
      var n = this._children,
        r = n[t];
      if (e && e !== this && e.parent !== this && e !== r) {
        n[t] = e, r.parent = null;
        var i = this.__zr;
        i && r.removeSelfFromZr(i), this._doAdd(e);
      }
      return this;
    }, t.prototype._doAdd = function (e) {
      e.parent && e.parent.remove(e), e.parent = this;
      var t = this.__zr;
      t && t !== e.__zr && e.addSelfToZr(t), t && t.refresh();
    }, t.prototype.remove = function (e) {
      var t = this.__zr,
        n = this._children,
        r = i["p"](n, e);
      return r < 0 ? this : (n.splice(r, 1), e.parent = null, t && e.removeSelfFromZr(t), t && t.refresh(), this);
    }, t.prototype.removeAll = function () {
      for (var e = this._children, t = this.__zr, n = 0; n < e.length; n++) {
        var r = e[n];
        t && r.removeSelfFromZr(t), r.parent = null;
      }
      return e.length = 0, this;
    }, t.prototype.eachChild = function (e, t) {
      for (var n = this._children, r = 0; r < n.length; r++) {
        var i = n[r];
        e.call(t, i, r);
      }
      return this;
    }, t.prototype.traverse = function (e, t) {
      for (var n = 0; n < this._children.length; n++) {
        var r = this._children[n],
          i = e.call(t, r);
        r.isGroup && !i && r.traverse(e, t);
      }
      return this;
    }, t.prototype.addSelfToZr = function (t) {
      e.prototype.addSelfToZr.call(this, t);
      for (var n = 0; n < this._children.length; n++) {
        var r = this._children[n];
        r.addSelfToZr(t);
      }
    }, t.prototype.removeSelfFromZr = function (t) {
      e.prototype.removeSelfFromZr.call(this, t);
      for (var n = 0; n < this._children.length; n++) {
        var r = this._children[n];
        r.removeSelfFromZr(t);
      }
    }, t.prototype.getBoundingRect = function (e) {
      for (var t = new a["a"](0, 0, 0, 0), n = e || this._children, r = [], i = null, o = 0; o < n.length; o++) {
        var s = n[o];
        if (!s.ignore && !s.invisible) {
          var l = s.getBoundingRect(),
            c = s.getLocalTransform(r);
          c ? (a["a"].applyTransform(t, l, c), i = i || t.clone(), i.union(t)) : (i = i || l.clone(), i.union(l));
        }
      }
      return i || t;
    }, t;
  }(o["a"]);
s.prototype.type = "group", legacyExports["a"] = s;
