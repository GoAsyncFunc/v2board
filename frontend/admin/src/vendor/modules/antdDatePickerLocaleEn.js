let legacyModule = module,
  legacyExports = exports;
var n = require("./antdDateLocaleEn.js"),
  r = require("./timePickerLocale.js");
function o() {
  return o = Object.assign || function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var c = arguments[t];
      for (var n in c) Object.prototype.hasOwnProperty.call(c, n) && (e[n] = c[n]);
    }
    return e;
  }, o.apply(this, arguments);
}
var a = {
  lang: o({
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"]
  }, n["a"]),
  timePickerLocale: o({}, r["a"])
};
legacyExports["a"] = a;
