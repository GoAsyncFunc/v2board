let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
}), legacyExports["default"] = a;
var o = require("./45307530.js"),
  i = r(o);
function a(e, t, n, r) {
  function o(t) {
    var r = new i["default"](t);
    n.call(e, r);
  }
  if (e.addEventListener) {
    var a = function () {
      var n = !1;
      return "object" === typeof r ? n = r.capture || !1 : "boolean" === typeof r && (n = r), e.addEventListener(t, o, r || !1), {
        v: {
          remove: function () {
            e.removeEventListener(t, o, n);
          }
        }
      };
    }();
    if ("object" === typeof a) return a.v;
  } else if (e.attachEvent) return e.attachEvent("on" + t, o), {
    remove: function () {
      e.detachEvent("on" + t, o);
    }
  };
}
legacyModule.exports = legacyExports["default"];
