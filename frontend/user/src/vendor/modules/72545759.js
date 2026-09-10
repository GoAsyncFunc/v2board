let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  o = require("./764d7834.js").set,
  i = r.MutationObserver || r.WebKitMutationObserver,
  a = r.process,
  s = r.Promise,
  c = "process" == require("./32776532.js")(a);
legacyModule.exports = function () {
  var e,
    t,
    n,
    u = function () {
      var r, o;
      c && (r = a.domain) && r.exit();
      while (e) {
        o = e.fn, e = e.next;
        try {
          o();
        } catch (r) {
          throw e ? n() : t = void 0, r;
        }
      }
      t = void 0, r && r.enter();
    };
  if (c) n = function () {
    a.nextTick(u);
  };else if (!i || r.navigator && r.navigator.standalone) {
    if (s && s.resolve) {
      var l = s.resolve(void 0);
      n = function () {
        l.then(u);
      };
    } else n = function () {
      o.call(r, u);
    };
  } else {
    var f = !0,
      p = document.createTextNode("");
    new i(u).observe(p, {
      characterData: !0
    }), n = function () {
      p.data = f = !f;
    };
  }
  return function (r) {
    var o = {
      fn: r,
      next: void 0
    };
    t && (t.next = o), e || (e = o, n()), t = o;
  };
};
