let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "dva", function () {
  return h;
});
var r = require("../siteHelpers.js"),
  i = require("./6e444349.js"),
  o = require("./77642f52.js"),
  a = interopDefault(o),
  s = (require("./58447067.js"), window.settings),
  l = s.theme,
  c = s.host,
  u = document.createElement("link");
u.rel = "stylesheet", u.href = c ? "./theme/".concat(l.color, ".css") : "/assets/admin/theme/".concat(l.color, ".css"), document.getElementsByTagName("head")[0].appendChild(u), a.a.locale("zh-cn"), "1" === Object(r["d"])("dark_mode") && Object(i["enable"])({
  brightness: 100,
  contrast: 90,
  sepia: 10
});
var h = {
  config: {
    onError(e) {
      e.preventDefault();
    }
  }
};
