let legacyModule = module,
  legacyExports = exports;
var r = require("./6d725347.js"),
  i = require("./62597459.js"),
  o = require("./51786b74.js"),
  a = require("./69526a57.js"),
  s = require("./596c3763.js"),
  l = require("./344e4f34.js"),
  u = require("./2b54542f.js"),
  c = Object(l["m"])(),
  f = function (e) {
    function t(t, n, r) {
      var i = e.call(this, t, n, r) || this;
      return i.uid = a["c"]("ec_cpt_model"), i;
    }
    return Object(r["a"])(t, e), t.prototype.init = function (e, t, n) {
      this.mergeDefaultAndTheme(e, n);
    }, t.prototype.mergeDefaultAndTheme = function (e, t) {
      var n = u["b"](this),
        r = n ? u["c"](e) : {},
        o = t.getTheme();
      i["E"](e, o.get(this.mainType)), i["E"](e, this.getDefaultOption()), n && u["e"](e, r, n);
    }, t.prototype.mergeOption = function (e, t) {
      i["E"](this.option, e, !0);
      var n = u["b"](this);
      n && u["e"](this.option, e, n);
    }, t.prototype.optionUpdated = function (e, t) {}, t.prototype.getDefaultOption = function () {
      var e = this.constructor;
      if (!Object(s["d"])(e)) return e.defaultOption;
      var t = c(this);
      if (!t.defaultOption) {
        var n = [],
          r = e;
        while (r) {
          var o = r.prototype.defaultOption;
          o && n.push(o), r = r.superClass;
        }
        for (var a = {}, l = n.length - 1; l >= 0; l--) a = i["E"](a, n[l], !0);
        t.defaultOption = a;
      }
      return t.defaultOption;
    }, t.prototype.getReferringComponents = function (e, t) {
      var n = e + "Index",
        r = e + "Id";
      return Object(l["t"])(this.ecModel, e, {
        index: this.get(n, !0),
        id: this.get(r, !0)
      }, t);
    }, t.prototype.getBoxLayoutParams = function () {
      var e = this;
      return {
        left: e.get("left"),
        top: e.get("top"),
        right: e.get("right"),
        bottom: e.get("bottom"),
        width: e.get("width"),
        height: e.get("height")
      };
    }, t.prototype.getZLevelKey = function () {
      return "";
    }, t.prototype.setZLevel = function (e) {
      this.option.zlevel = e;
    }, t.protoInitialize = function () {
      var e = t.prototype;
      e.type = "component", e.id = "", e.name = "", e.mainType = "", e.subType = "", e.componentIndex = 0;
    }(), t;
  }(o["a"]);
function d(e) {
  var t = [];
  return i["j"](f.getClassesByMainType(e), function (e) {
    t = t.concat(e.dependencies || e.prototype.dependencies || []);
  }), t = i["D"](t, function (e) {
    return Object(s["f"])(e).main;
  }), "dataset" !== e && i["p"](t, "dataset") <= 0 && t.unshift("dataset"), t;
}
Object(s["e"])(f, o["a"]), Object(s["c"])(f), a["a"](f), a["b"](f, d), legacyExports["a"] = f;
