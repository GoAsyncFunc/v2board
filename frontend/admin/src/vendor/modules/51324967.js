let legacyModule = module,
  legacyExports = exports;
legacyExports.nextTick = function (e) {
  var t = Array.prototype.slice.call(arguments);
  t.shift(), setTimeout(function () {
    e.apply(null, t);
  }, 0);
}, legacyExports.platform = legacyExports.arch = legacyExports.execPath = legacyExports.title = "browser", legacyExports.pid = 1, legacyExports.browser = !0, legacyExports.env = {}, legacyExports.argv = [], legacyExports.binding = function (e) {
  throw new Error("No such module. (Possibly not yet loaded)");
}, function () {
  var e,
    r = "/";
  legacyExports.cwd = function () {
    return r;
  }, legacyExports.chdir = function (t) {
    e || (e = require("./33337966.js")), r = e.resolve(t, r);
  };
}(), legacyExports.exit = legacyExports.kill = legacyExports.umask = legacyExports.dlopen = legacyExports.uptime = legacyExports.memoryUsage = legacyExports.uvCounters = function () {}, legacyExports.features = {};
