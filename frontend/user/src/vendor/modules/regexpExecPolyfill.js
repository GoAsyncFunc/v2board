let legacyModule = module,
  legacyExports = exports;
var regexpExec = require("./regexpExecFix.js");
require("./57474e57.js")({
  target: "RegExp",
  proto: !0,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});
