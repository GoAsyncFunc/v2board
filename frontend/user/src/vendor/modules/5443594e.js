let legacyModule = module,
  legacyExports = exports;
var r = /\r\n?|\n/g,
  o = /\0/g;
legacyModule.exports = function (e) {
  var t;
  t = e.src.replace(r, "\n"), t = t.replace(o, "\ufffd"), e.src = t;
};
