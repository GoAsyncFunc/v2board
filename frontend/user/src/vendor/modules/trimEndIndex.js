let legacyModule = module,
  legacyExports = exports;
var n = /\s/;
function r(e) {
  var t = e.length;
  while (t-- && n.test(e.charAt(t)));
  return t;
}
legacyModule.exports = r;
