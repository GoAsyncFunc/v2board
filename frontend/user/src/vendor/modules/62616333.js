let legacyModule = module,
  legacyExports = exports;
const {
  defineExport,
  interopDefault
} = require("../../app/moduleInterop.js");
(function (e) {
  defineExport(legacyExports, "e", function () {
    return h;
  }), defineExport(legacyExports, "d", function () {
    return f;
  }), defineExport(legacyExports, "a", function () {
    return p;
  }), defineExport(legacyExports, "b", function () {
    return m;
  }), defineExport(legacyExports, "c", function () {
    return d;
  }), defineExport(legacyExports, "f", function () {
    return z;
  });
  var n = require("./51624c5a.js"),
    r = interopDefault(n),
    o = require("./69436335.js"),
    l = interopDefault(o),
    a = require("./56376f43.js"),
    i = interopDefault(a),
    u = require("./48584e39.js"),
    s = require("./reactRuntime.js");
  function h(t) {
    e && Object({
      NODE_ENV: "production"
    }) || console.error("[@ant-design/icons-react]: " + t + ".");
  }
  function f(e) {
    return "object" === typeof e && "string" === typeof e.name && "string" === typeof e.theme && ("object" === typeof e.icon || "function" === typeof e.icon);
  }
  function v() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    return Object.keys(e).reduce(function (t, c) {
      var n = e[c];
      switch (c) {
        case "class":
          t.className = n, delete t["class"];
          break;
        default:
          t[c] = n;
      }
      return t;
    }, {});
  }
  var p = function () {
    function e() {
      l()(this, e), this.collection = {};
    }
    return i()(e, [{
      key: "clear",
      value: function () {
        this.collection = {};
      }
    }, {
      key: "delete",
      value: function (e) {
        return delete this.collection[e];
      }
    }, {
      key: "get",
      value: function (e) {
        return this.collection[e];
      }
    }, {
      key: "has",
      value: function (e) {
        return Boolean(this.collection[e]);
      }
    }, {
      key: "set",
      value: function (e, t) {
        return this.collection[e] = t, this;
      }
    }, {
      key: "size",
      get: function () {
        return Object.keys(this.collection).length;
      }
    }]), e;
  }();
  function m(e, t, c) {
    return c ? s["createElement"](e.tag, r()({
      key: t
    }, v(e.attrs), c), (e.children || []).map(function (c, n) {
      return m(c, t + "-" + e.tag + "-" + n);
    })) : s["createElement"](e.tag, r()({
      key: t
    }, v(e.attrs)), (e.children || []).map(function (c, n) {
      return m(c, t + "-" + e.tag + "-" + n);
    }));
  }
  function d(e) {
    return Object(u["generate"])(e)[0];
  }
  function z(e, t) {
    switch (t) {
      case "fill":
        return e + "-fill";
      case "outline":
        return e + "-o";
      case "twotone":
        return e + "-twotone";
      default:
        throw new TypeError("Unknown theme type: " + t + ", name: " + e);
    }
  }
}).call(this, require("./51324967.js"));
