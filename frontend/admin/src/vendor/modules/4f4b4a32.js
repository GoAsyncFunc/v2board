let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return s;
}), defineExport(legacyExports, "b", function () {
  return l;
});
var r = require("./62597459.js"),
  i = require("./4b786641.js"),
  o = require("./37614b42.js"),
  a = /\{@(.+?)\}/g,
  s = function () {
    function e() {}
    return e.prototype.getDataParams = function (e, t) {
      var n = this.getData(t),
        r = this.getRawValue(e, t),
        i = n.getRawIndex(e),
        o = n.getName(e),
        a = n.getRawDataItem(e),
        s = n.getItemVisual(e, "style"),
        l = s && s[n.getItemVisual(e, "drawType") || "fill"],
        u = s && s.stroke,
        c = this.mainType,
        f = "series" === c,
        d = n.userOutput && n.userOutput.get();
      return {
        componentType: c,
        componentSubType: this.subType,
        componentIndex: this.componentIndex,
        seriesType: f ? this.subType : null,
        seriesIndex: this.seriesIndex,
        seriesId: f ? this.id : null,
        seriesName: f ? this.name : null,
        name: o,
        dataIndex: i,
        data: a,
        dataType: t,
        value: r,
        color: l,
        borderColor: u,
        dimensionNames: d ? d.fullDimensions : null,
        encode: d ? d.encode : null,
        $vars: ["seriesName", "name", "value"]
      };
    }, e.prototype.getFormattedLabel = function (e, t, n, s, l, u) {
      t = t || "normal";
      var c = this.getData(n),
        f = this.getDataParams(e, n);
      if (u && (f.value = u.interpolatedValue), null != s && r["r"](f.value) && (f.value = f.value[s]), !l) {
        var d = c.getItemModel(e);
        l = d.get("normal" === t ? ["label", "formatter"] : [t, "label", "formatter"]);
      }
      if (r["u"](l)) return f.status = t, f.dimensionIndex = s, l(f);
      if (r["y"](l)) {
        var h = Object(o["c"])(l, f);
        return h.replace(a, function (t, n) {
          var o = n.length,
            a = n;
          "[" === a.charAt(0) && "]" === a.charAt(o - 1) && (a = +a.slice(1, o - 1));
          var s = Object(i["e"])(c, e, a);
          if (u && r["r"](u.interpolatedValue)) {
            var l = c.getDimensionIndex(a);
            l >= 0 && (s = u.interpolatedValue[l]);
          }
          return null != s ? s + "" : "";
        });
      }
    }, e.prototype.getRawValue = function (e, t) {
      return Object(i["e"])(this.getData(t), e);
    }, e.prototype.formatTooltip = function (e, t, n) {}, e;
  }();
function l(e) {
  var t, n;
  return r["x"](e) ? e.type && (n = e) : t = e, {
    text: t,
    frag: n
  };
}
