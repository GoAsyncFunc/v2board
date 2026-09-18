let legacyModule = module,
  legacyExports = exports;
legacyModule.exports = require("./pureMode.js") || !require("./tryCatchTest.js")(function () {
  var e = Math.random();
  __defineSetter__.call(null, e, function () {}), delete require("./globalObject.js")[e];
});
