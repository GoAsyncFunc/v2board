let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "router", function () {
  return u;
});
require("./reactRuntime.js"), require("./436e424d.js");
var r = require("../../app/history.js");
require("./emptyModule.js");
function o() {
  r["default"].push.apply(r["default"], arguments);
}
function i() {
  r["default"].replace.apply(r["default"], arguments);
}
function a() {
  r["default"].go.apply(r["default"], arguments);
}
function s() {
  r["default"].goBack.apply(r["default"], arguments);
}
function c() {
  r["default"].goForward.apply(r["default"], arguments);
}
var u = {
  push: o,
  replace: i,
  go: a,
  goBack: s,
  goForward: c
};
