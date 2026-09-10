let legacyModule = module,
  legacyExports = exports;
var r = require("./63304f79.js"),
  i = require("./764d7834.js").set,
  o = r.MutationObserver || r.WebKitMutationObserver,
  a = r.process,
  s = r.Promise,
  l = "process" == require("./32776532.js")(a);
legacyModule.exports = function () {
  var e,
    t,
    n,
    c = function () {
      var r, i;
      l && (r = a.domain) && r.exit();
      while (e) {
        i = e.fn, e = e.next;
        try {
          i();
        } catch (r) {
          throw e ? n() : t = void 0, r;
        }
      }
      t = void 0, r && r.enter();
    };
  if (l) n = function () {
    a.nextTick(c);
  };else if (!o || r.navigator && r.navigator.standalone) {
    if (s && s.resolve) {
      var u = s.resolve(void 0);
      n = function () {
        u.then(c);
      };
    } else n = function () {
      i.call(r, c);
    };
  } else {
    var h = !0,
      f = document.createTextNode("");
    new o(c).observe(f, {
      characterData: !0
    }), n = function () {
      f.data = h = !h;
    };
  }
  return function (r) {
    var i = {
      fn: r,
      next: void 0
    };
    t && (t.next = i), e || (e = i, n()), t = i;
  };
};
