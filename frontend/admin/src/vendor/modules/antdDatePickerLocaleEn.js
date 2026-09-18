let legacyModule = module,
  legacyExports = exports;
var dateLocale = require("./antdDateLocaleEn.js"),
  timePickerLocale = require("./timePickerLocale.js");
function mergeLocale() {
  return mergeLocale = Object.assign || function (target) {
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
    }
    return target;
  }, mergeLocale.apply(this, arguments);
}
var datePickerLocale = {
  lang: mergeLocale({
    placeholder: "Select date",
    rangePlaceholder: ["Start date", "End date"]
  }, dateLocale["a"]),
  timePickerLocale: mergeLocale({}, timePickerLocale["a"])
};
legacyExports["a"] = datePickerLocale;
