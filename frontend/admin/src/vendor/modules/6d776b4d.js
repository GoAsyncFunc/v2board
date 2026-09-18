let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return s;
});
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./classNames.js"),
  a = interopDefault(o);
function s(e) {
  var t,
    n = e.prefixCls,
    r = e.locale,
    o = e.showTimePicker,
    s = e.onOpenTimePicker,
    l = e.onCloseTimePicker,
    c = e.timePickerDisabled,
    u = a()((t = {}, t[n + "-time-picker-btn"] = !0, t[n + "-time-picker-btn-disabled"] = c, t)),
    h = null;
  return c || (h = o ? l : s), i.a.createElement("a", {
    className: u,
    role: "button",
    onClick: h
  }, o ? r.dateSelect : r.timeSelect);
}
