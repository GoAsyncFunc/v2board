let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return g;
});
var r = require("./6d725347.js"),
  i = require("./62597459.js"),
  o = require("./64715547.js"),
  a = require("./78364b74.js"),
  s = require("./6868784b.js"),
  l = require("./65446668.js"),
  u = require("./2b54542f.js"),
  c = require("./624c6677.js"),
  f = require("./73532f72.js"),
  d = require("./37614b42.js"),
  h = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n.layoutMode = {
        type: "box",
        ignoreSize: !0
      }, n;
    }
    return Object(r["a"])(t, e), t.type = "title", t.defaultOption = {
      z: 6,
      show: !0,
      text: "",
      target: "blank",
      subtext: "",
      subtarget: "blank",
      left: 0,
      top: 0,
      backgroundColor: "rgba(0,0,0,0)",
      borderColor: "#ccc",
      borderWidth: 0,
      padding: 5,
      itemGap: 10,
      textStyle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#464646"
      },
      subtextStyle: {
        fontSize: 12,
        color: "#6E7079"
      }
    }, t;
  }(c["a"]),
  p = function (e) {
    function t() {
      var n = null !== e && e.apply(this, arguments) || this;
      return n.type = t.type, n;
    }
    return Object(r["a"])(t, e), t.prototype.render = function (e, t, n) {
      if (this.group.removeAll(), e.get("show")) {
        var r = this.group,
          c = e.getModel("textStyle"),
          f = e.getModel("subtextStyle"),
          h = e.get("textAlign"),
          p = i["K"](e.get("textBaseline"), e.get("textVerticalAlign")),
          g = new o["a"]({
            style: Object(l["a"])(c, {
              text: e.get("text"),
              fill: c.getTextColor()
            }, {
              disableBox: !0
            }),
            z2: 10
          }),
          m = g.getBoundingRect(),
          v = e.get("subtext"),
          y = new o["a"]({
            style: Object(l["a"])(f, {
              text: v,
              fill: f.getTextColor(),
              y: m.height + e.get("itemGap"),
              verticalAlign: "top"
            }, {
              disableBox: !0
            }),
            z2: 10
          }),
          b = e.get("link"),
          x = e.get("sublink"),
          _ = e.get("triggerEvent", !0);
        g.silent = !b && !_, y.silent = !x && !_, b && g.on("click", function () {
          Object(d["h"])(b, "_" + e.get("target"));
        }), x && y.on("click", function () {
          Object(d["h"])(x, "_" + e.get("subtarget"));
        }), Object(s["a"])(g).eventData = Object(s["a"])(y).eventData = _ ? {
          componentType: "title",
          componentIndex: e.componentIndex
        } : null, r.add(g), v && r.add(y);
        var w = r.getBoundingRect(),
          O = e.getBoxLayoutParams();
        O.width = w.width, O.height = w.height;
        var S = Object(u["d"])(O, {
          width: n.getWidth(),
          height: n.getHeight()
        }, e.get("padding"));
        h || (h = e.get("left") || e.get("right"), "middle" === h && (h = "center"), "right" === h ? S.x += S.width : "center" === h && (S.x += S.width / 2)), p || (p = e.get("top") || e.get("bottom"), "center" === p && (p = "middle"), "bottom" === p ? S.y += S.height : "middle" === p && (S.y += S.height / 2), p = p || "top"), r.x = S.x, r.y = S.y, r.markRedraw();
        var k = {
          align: h,
          verticalAlign: p
        };
        g.setStyle(k), y.setStyle(k), w = r.getBoundingRect();
        var j = S.margin,
          M = e.getItemStyle(["color", "opacity"]);
        M.fill = e.get("backgroundColor");
        var C = new a["a"]({
          shape: {
            x: w.x - j[3],
            y: w.y - j[0],
            width: w.width + j[1] + j[3],
            height: w.height + j[0] + j[2],
            r: e.get("borderRadius")
          },
          style: M,
          subPixelOptimize: !0,
          silent: !0
        });
        r.add(C);
      }
    }, t.type = "title", t;
  }(f["a"]);
function g(e) {
  e.registerComponentModel(h), e.registerComponentView(p);
}
