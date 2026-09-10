let legacyModule = module,
  legacyExports = exports;
const {
  defineExport
} = require("../../app/moduleInterop.js");
defineExport(legacyExports, "a", function () {
  return i;
});
var r = function (e, t) {
  return r = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
  }, r(e, t);
};
function i(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  function n() {
    this.constructor = e;
  }
  r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}
Object.create;
Object.create;
