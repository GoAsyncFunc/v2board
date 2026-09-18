let legacyModule = module,
  legacyExports = exports;
(function (t) {
  for (var r = require("./performanceNowRuntime.js"), o = "undefined" === typeof window ? t : window, i = ["moz", "webkit"], a = "AnimationFrame", s = o["request" + a], c = o["cancel" + a] || o["cancelRequest" + a], u = 0; !s && u < i.length; u++) s = o[i[u] + "Request" + a], c = o[i[u] + "Cancel" + a] || o[i[u] + "CancelRequest" + a];
  if (!s || !c) {
    var l = 0,
      f = 0,
      p = [],
      d = 1e3 / 60;
    s = function (e) {
      if (0 === p.length) {
        var t = r(),
          n = Math.max(0, d - (t - l));
        l = n + t, setTimeout(function () {
          var e = p.slice(0);
          p.length = 0;
          for (var t = 0; t < e.length; t++) if (!e[t].cancelled) try {
            e[t].callback(l);
          } catch (e) {
            setTimeout(function () {
              throw e;
            }, 0);
          }
        }, Math.round(n));
      }
      return p.push({
        handle: ++f,
        callback: e,
        cancelled: !1
      }), f;
    }, c = function (e) {
      for (var t = 0; t < p.length; t++) p[t].handle === e && (p[t].cancelled = !0);
    };
  }
  legacyModule.exports = function (e) {
    return s.call(o, e);
  }, legacyModule.exports.cancel = function () {
    c.apply(o, arguments);
  }, legacyModule.exports.polyfill = function (e) {
    e || (e = o), e.requestAnimationFrame = s, e.cancelAnimationFrame = c;
  };
}).call(this, require("./globalObjectLegacy.js"));
