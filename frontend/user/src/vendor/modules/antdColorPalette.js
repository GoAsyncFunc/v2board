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
var l = {};
legacyExports.presetPalettes = l, Object.keys(o).forEach(function (e) {
  l[e] = r.default(o[e]), l[e].primary = l[e][5];
});
var a = l.red;
legacyExports.red = a;
var i = l.volcano;
legacyExports.volcano = i;
var u = l.gold;
legacyExports.gold = u;
var s = l.orange;
legacyExports.orange = s;
var h = l.yellow;
legacyExports.yellow = h;
var f = l.lime;
legacyExports.lime = f;
var v = l.green;
legacyExports.green = v;
var p = l.cyan;
legacyExports.cyan = p;
var m = l.blue;
legacyExports.blue = m;
var d = l.geekblue;
legacyExports.geekblue = d;
var z = l.purple;
legacyExports.purple = z;
var y = l.magenta;
legacyExports.magenta = y;
var b = l.grey;
legacyExports.grey = b;
