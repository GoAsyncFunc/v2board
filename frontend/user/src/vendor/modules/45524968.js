let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  defineExport
} = require("../../app/moduleInterop.js");
markEsModule(legacyExports), defineExport(legacyExports, "dva", function () {
  return f;
});
require("./emptyModule.js");
var r = require("./antdMessage.js"),
  o = require("../i18n.js"),
  i = require("../siteHelpers.js"),
  a = require("./6e444349.js");
r["a"].config({
  maxCount: 1
});
var s = window.settings,
  c = s.theme,
  u = s.host,
  l = document.createElement("link");
if (l.rel = "stylesheet", l.href = u ? "./theme/".concat(c.color, ".css") : "/theme/default/assets/theme/".concat(c.color, ".css"), document.getElementsByTagName("head")[0].appendChild(l), Object(i["e"])("i18n")) Object(o["setLocale"])(Object(i["e"])("i18n"));else switch (navigator.language.split("-")[0]) {
  case "ja":
    Object(o["setLocale"])("ja-JP");
    break;
  case "zh":
    Object(o["setLocale"])("zh-CN");
    break;
  case "en":
    Object(o["setLocale"])("en-US");
    break;
  case "vi":
    Object(o["setLocale"])("vi-VN");
    break;
  case "ko":
    Object(o["setLocale"])("ko-KR");
    break;
}
"1" === Object(i["e"])("dark_mode") && Object(a["enable"])({
  brightness: 100,
  contrast: 90,
  sepia: 10
});
var f = {
  config: {
    onError(e) {
      e.preventDefault();
    }
  }
};
