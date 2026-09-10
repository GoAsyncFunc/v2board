let legacyModule = module,
  legacyExports = exports;
function n(e, t, n, r, i, o, a) {
  try {
    var s = e[o](a),
      l = s.value;
  } catch (e) {
    return void n(e);
  }
  s.done ? t(l) : Promise.resolve(l).then(r, i);
}
function r(e) {
  return function () {
    var t = this,
      r = arguments;
    return new Promise(function (i, o) {
      var a = e.apply(t, r);
      function s(e) {
        n(a, i, o, s, l, "next", e);
      }
      function l(e) {
        n(a, i, o, s, l, "throw", e);
      }
      s(void 0);
    });
  };
}
legacyModule.exports = r;
