let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return a;
});
var r = require("./reactRuntime.js"),
  i = interopDefault(r),
  o = require("./47727448.js");
function a(e) {
  var t = e.prefixCls,
    n = e.locale,
    r = e.value,
    a = e.timePicker,
    s = e.disabled,
    l = e.disabledDate,
    c = e.onToday,
    u = e.text,
    h = (!u && a ? n.now : u) || n.today,
    f = l && !Object(o["g"])(Object(o["e"])(r), l),
    d = f || s,
    p = d ? t + "-today-btn-disabled" : "";
  return i.a.createElement("a", {
    className: t + "-today-btn " + p,
    role: "button",
    onClick: d ? null : c,
    title: Object(o["f"])(r)
  }, h);
}
