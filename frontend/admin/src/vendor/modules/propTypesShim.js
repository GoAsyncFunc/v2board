let legacyModule = module,
  legacyExports = exports;
var r = require("./496c5338.js");
function i() {}
legacyModule.exports = function () {
  function e(e, t, n, i, o, a) {
    if (a !== r) {
      var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
      throw s.name = "Invariant Violation", s;
    }
  }
  function t() {
    return e;
  }
  e.isRequired = e;
  var n = {
    array: e,
    bool: e,
    func: e,
    number: e,
    object: e,
    string: e,
    symbol: e,
    any: e,
    arrayOf: t,
    element: e,
    instanceOf: t,
    node: e,
    objectOf: t,
    oneOf: t,
    oneOfType: t,
    shape: t,
    exact: t
  };
  return n.checkPropTypes = i, n.PropTypes = n, n;
};
