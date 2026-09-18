let legacyModule = module,
  legacyExports = exports;
var n = this && this.__importDefault || function (e) {
  return e && e.__esModule ? e : {
    default: e
  };
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var r = n(require("./64306278.js"));
legacyExports.generate = r.default;
var o = {
  red: "#F5222D",
  volcano: "#FA541C",
  orange: "#FA8C16",
  gold: "#FAAD14",
  yellow: "#FADB14",
  lime: "#A0D911",
  green: "#52C41A",
  cyan: "#13C2C2",
  blue: "#1890FF",
  geekblue: "#2F54EB",
  purple: "#722ED1",
  magenta: "#EB2F96",
  grey: "#666666"
};
legacyExports.presetPrimaryColors = o;
var a = {};
legacyExports.presetPalettes = a, Object.keys(o).forEach(function (e) {
  a[e] = r.default(o[e]), a[e].primary = a[e][5];
});
var l = a.red;
legacyExports.red = l;
var i = a.volcano;
legacyExports.volcano = i;
var u = a.gold;
legacyExports.gold = u;
var s = a.orange;
legacyExports.orange = s;
var h = a.yellow;
legacyExports.yellow = h;
var f = a.lime;
legacyExports.lime = f;
var p = a.green;
legacyExports.green = p;
var v = a.cyan;
legacyExports.cyan = v;
var m = a.blue;
legacyExports.blue = m;
var d = a.geekblue;
legacyExports.geekblue = d;
var y = a.purple;
legacyExports.purple = y;
var b = a.magenta;
legacyExports.magenta = b;
var z = a.grey;
legacyExports.grey = z;
