let legacyModule = module,
  legacyExports = exports;
(function (t) {
  for (var r = require("./6251674b.js"), i = "undefined" === typeof window ? t : window, o = ["moz", "webkit"], a = "AnimationFrame", s = i["request" + a], l = i["cancel" + a] || i["cancelRequest" + a], c = 0; !s && c < o.length; c++) s = i[o[c] + "Request" + a], l = i[o[c] + "Cancel" + a] || i[o[c] + "CancelRequest" + a];
  if (!s || !l) {
    var u = 0,
      h = 0,
      f = [],
      d = 1e3 / 60;
    s = function (e) {
      if (0 === f.length) {
        var t = r(),
          n = Math.max(0, d - (t - u));
        u = n + t, setTimeout(function () {
          var e = f.slice(0);
          f.length = 0;
          for (var t = 0; t < e.length; t++) if (!e[t].cancelled) try {
            e[t].callback(u);
          } catch (e) {
            setTimeout(function () {
              throw e;
            }, 0);
          }
        }, Math.round(n));
      }
      return f.push({
        handle: ++h,
        callback: e,
        cancelled: !1
      }), h;
    }, l = function (e) {
      for (var t = 0; t < f.length; t++) f[t].handle === e && (f[t].cancelled = !0);
    };
  }
  legacyModule.exports = function (e) {
    return s.call(i, e);
  }, legacyModule.exports.cancel = function () {
    l.apply(i, arguments);
  }, legacyModule.exports.polyfill = function (e) {
    e || (e = i), e.requestAnimationFrame = s, e.cancelAnimationFrame = l;
  };
}).call(this, require("./globalObjectLegacy.js"));
