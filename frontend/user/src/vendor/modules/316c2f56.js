let legacyModule = module,
  legacyExports = exports;
function n(e, t, n, r, o, i, a) {
  try {
    var s = e[i](a),
      c = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(c) : Promise.resolve(c).then(r, o);
}
function r(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (o, i) {
      var a = e.apply(t, r);
      function s(e) {
        n(a, o, i, s, c, "next", e);
      }
      function c(e) {
        n(a, o, i, s, c, "throw", e);
      }
      s(void 0);
    });
  };
}
legacyModule.exports = r;
