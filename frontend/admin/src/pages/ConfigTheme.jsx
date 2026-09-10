let legacyModule = module,
  legacyExports = exports;
const {
  markEsModule,
  interopDefault
} = require("../app/moduleInterop.js");
const React = require("../vendor/modules/71317449.js");
markEsModule(legacyExports);
var r = require("../vendor/modules/6a65685a.js"),
  i = interopDefault(r),
  o = require("../vendor/modules/316c2f56.js"),
  a = interopDefault(o),
  s = require("../vendor/modules/71317449.js"),
  l = interopDefault(s),
  c = require("../layouts/MainLayout.jsx"),
  u = require("../vendor/reactRedux.js"),
  h = (require("../vendor/modules/32717463.js"), require("../vendor/Modal.js")),
  f = (require("../vendor/modules/354e4461.js"), require("../vendor/modules/35724567.js")),
  d = (require("../vendor/modules/4f614579.js"), require("../vendor/modules/32664d37.js")),
  p = (require("../vendor/modules/6d69595a.js"), require("../vendor/modules/74737172.js"));
class m extends l.a.Component {
  constructor(e) {
    super(e), this.state = {
      params: {},
      visible: !1
    };
  }
  setParams(e, t) {
    var n = this.state.params;
    n[e] = t, this.setState({
      params: n
    });
  }
  show() {
    this.setState({
      visible: !0
    }), this.getConfig();
  }
  hidden() {
    this.setState({
      visible: !1,
      params: {}
    });
  }
  getConfig() {
    var e = this.props.keyName;
    this.props.dispatch({
      type: "theme/getThemeConfig",
      name: e,
      complete: e => {
        this.setState({
          params: e
        });
      }
    });
  }
  saveThemeConfig() {
    var e = this.props.keyName;
    this.props.dispatch({
      type: "theme/saveThemeConfig",
      config: window.btoa(unescape(encodeURIComponent(JSON.stringify(this.state.params)))),
      name: e,
      complete: e => {
        p["a"].success("保存成功");
      }
    });
  }
  buildType(e) {
    var t = this.state.params;
    switch (e.field_type) {
      case "select":
        return <div>
                        {l.a.createElement(d["a"], {
            style: {
              width: "100%"
            },
            placeholder: e.placeholder,
            value: t[e.field_name],
            onChange: t => this.setParams(e.field_name, t)
          }, Object.keys(e.select_options).map(t => {
            return l.a.createElement(d["a"].Option, {
              value: t
            }, e.select_options[t]);
          }))}
                    </div>;
      case "input":
        return l.a.createElement(f["a"], {
          placeholder: e.placeholder,
          value: t[e.field_name],
          onChange: t => this.setParams(e.field_name, t.target.value)
        });
      case "textarea":
        return l.a.createElement(f["a"].TextArea, {
          rows: "5",
          placeholder: e.placeholder,
          value: t[e.field_name],
          onChange: t => this.setParams(e.field_name, t.target.value)
        });
    }
  }
  render() {
    var e = this.props.theme,
      t = (e.getThemeConfigLoading, e.saveThemeConfigLoading);
    return l.a.createElement(l.a.Fragment, null, l.a.cloneElement(this.props.children, {
      onClick: () => this.show()
    }), l.a.createElement(h["a"], {
      onCancel: () => this.hidden(),
      title: "配置".concat(this.props.themeName, "主题"),
      visible: this.state.visible,
      okButtonProps: {
        loading: t
      },
      onOk: () => this.saveThemeConfig()
    }, (this.props.configs || []).map(e => {
      return <div className={"form-group"}>
                            <label>{e.label}</label>
                            {this.buildType(e)}
                        </div>;
    })));
  }
}
var g = Object(u["c"])(e => {
    var t = e.theme;
    return {
      theme: t
    };
  })(m),
  v = require("../services/request.js");
function y() {
  y = function () {
    return e;
  };
  var e = {},
    t = Object.prototype,
    n = t.hasOwnProperty,
    r = Object.defineProperty || function (e, t, n) {
      e[t] = n.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    o = i.iterator || "@@iterator",
    a = i.asyncIterator || "@@asyncIterator",
    s = i.toStringTag || "@@toStringTag";
  function l(e, t, n) {
    return Object.defineProperty(e, t, {
      value: n,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), e[t];
  }
  try {
    l({}, "");
  } catch (e) {
    l = function (e, t, n) {
      return e[t] = n;
    };
  }
  function c(e, t, n, i) {
    var o = t && t.prototype instanceof f ? t : f,
      a = Object.create(o.prototype),
      s = new C(i || []);
    return r(a, "_invoke", {
      value: _(e, n, s)
    }), a;
  }
  function u(e, t, n) {
    try {
      return {
        type: "normal",
        arg: e.call(t, n)
      };
    } catch (e) {
      return {
        type: "throw",
        arg: e
      };
    }
  }
  e.wrap = c;
  var h = {};
  function f() {}
  function d() {}
  function p() {}
  var m = {};
  l(m, o, function () {
    return this;
  });
  var g = Object.getPrototypeOf,
    v = g && g(g(O([])));
  v && v !== t && n.call(v, o) && (m = v);
  var b = p.prototype = f.prototype = Object.create(m);
  function w(e) {
    ["next", "throw", "return"].forEach(function (t) {
      l(e, t, function (e) {
        return this._invoke(t, e);
      });
    });
  }
  function x(e, t) {
    function i(r, o, a, s) {
      var l = u(e[r], e, o);
      if ("throw" !== l.type) {
        var c = l.arg,
          h = c.value;
        return h && "object" == typeof h && n.call(h, "__await") ? t.resolve(h.__await).then(function (e) {
          i("next", e, a, s);
        }, function (e) {
          i("throw", e, a, s);
        }) : t.resolve(h).then(function (e) {
          c.value = e, a(c);
        }, function (e) {
          return i("throw", e, a, s);
        });
      }
      s(l.arg);
    }
    var o;
    r(this, "_invoke", {
      value: function (e, n) {
        function r() {
          return new t(function (t, r) {
            i(e, n, t, r);
          });
        }
        return o = o ? o.then(r, r) : r();
      }
    });
  }
  function _(e, t, n) {
    var r = "suspendedStart";
    return function (i, o) {
      if ("executing" === r) throw new Error("Generator is already running");
      if ("completed" === r) {
        if ("throw" === i) throw o;
        return T();
      }
      for (n.method = i, n.arg = o;;) {
        var a = n.delegate;
        if (a) {
          var s = E(a, n);
          if (s) {
            if (s === h) continue;
            return s;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if ("suspendedStart" === r) throw r = "completed", n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        r = "executing";
        var l = u(e, t, n);
        if ("normal" === l.type) {
          if (r = n.done ? "completed" : "suspendedYield", l.arg === h) continue;
          return {
            value: l.arg,
            done: n.done
          };
        }
        "throw" === l.type && (r = "completed", n.method = "throw", n.arg = l.arg);
      }
    };
  }
  function E(e, t) {
    var n = t.method,
      r = e.iterator[n];
    if (void 0 === r) return t.delegate = null, "throw" === n && e.iterator.return && (t.method = "return", t.arg = void 0, E(e, t), "throw" === t.method) || "return" !== n && (t.method = "throw", t.arg = new TypeError("The iterator does not provide a '" + n + "' method")), h;
    var i = u(r, e.iterator, t.arg);
    if ("throw" === i.type) return t.method = "throw", t.arg = i.arg, t.delegate = null, h;
    var o = i.arg;
    return o ? o.done ? (t[e.resultName] = o.value, t.next = e.nextLoc, "return" !== t.method && (t.method = "next", t.arg = void 0), t.delegate = null, h) : o : (t.method = "throw", t.arg = new TypeError("iterator result is not an object"), t.delegate = null, h);
  }
  function S(e) {
    var t = {
      tryLoc: e[0]
    };
    1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
  }
  function k(e) {
    var t = e.completion || {};
    t.type = "normal", delete t.arg, e.completion = t;
  }
  function C(e) {
    this.tryEntries = [{
      tryLoc: "root"
    }], e.forEach(S, this), this.reset(!0);
  }
  function O(e) {
    if (e) {
      var t = e[o];
      if (t) return t.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var r = -1,
          i = function t() {
            for (; ++r < e.length;) if (n.call(e, r)) return t.value = e[r], t.done = !1, t;
            return t.value = void 0, t.done = !0, t;
          };
        return i.next = i;
      }
    }
    return {
      next: T
    };
  }
  function T() {
    return {
      value: void 0,
      done: !0
    };
  }
  return d.prototype = p, r(b, "constructor", {
    value: p,
    configurable: !0
  }), r(p, "constructor", {
    value: d,
    configurable: !0
  }), d.displayName = l(p, s, "GeneratorFunction"), e.isGeneratorFunction = function (e) {
    var t = "function" == typeof e && e.constructor;
    return !!t && (t === d || "GeneratorFunction" === (t.displayName || t.name));
  }, e.mark = function (e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, p) : (e.__proto__ = p, l(e, s, "GeneratorFunction")), e.prototype = Object.create(b), e;
  }, e.awrap = function (e) {
    return {
      __await: e
    };
  }, w(x.prototype), l(x.prototype, a, function () {
    return this;
  }), e.AsyncIterator = x, e.async = function (t, n, r, i, o) {
    void 0 === o && (o = Promise);
    var a = new x(c(t, n, r, i), o);
    return e.isGeneratorFunction(n) ? a : a.next().then(function (e) {
      return e.done ? e.value : a.next();
    });
  }, w(b), l(b, s, "Generator"), l(b, o, function () {
    return this;
  }), l(b, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (e) {
    var t = Object(e),
      n = [];
    for (var r in t) n.push(r);
    return n.reverse(), function e() {
      for (; n.length;) {
        var r = n.pop();
        if (r in t) return e.value = r, e.done = !1, e;
      }
      return e.done = !0, e;
    };
  }, e.values = O, C.prototype = {
    constructor: C,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(k), !e) for (var t in this) "t" === t.charAt(0) && n.call(this, t) && !isNaN(+t.slice(1)) && (this[t] = void 0);
    },
    stop: function () {
      this.done = !0;
      var e = this.tryEntries[0].completion;
      if ("throw" === e.type) throw e.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var t = this;
      function r(n, r) {
        return a.type = "throw", a.arg = e, t.next = n, r && (t.method = "next", t.arg = void 0), !!r;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var o = this.tryEntries[i],
          a = o.completion;
        if ("root" === o.tryLoc) return r("end");
        if (o.tryLoc <= this.prev) {
          var s = n.call(o, "catchLoc"),
            l = n.call(o, "finallyLoc");
          if (s && l) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          } else if (s) {
            if (this.prev < o.catchLoc) return r(o.catchLoc, !0);
          } else {
            if (!l) throw new Error("try statement without catch or finally");
            if (this.prev < o.finallyLoc) return r(o.finallyLoc);
          }
        }
      }
    },
    abrupt: function (e, t) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var i = this.tryEntries[r];
        if (i.tryLoc <= this.prev && n.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
          var o = i;
          break;
        }
      }
      o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
      var a = o ? o.completion : {};
      return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, h) : this.complete(a);
    },
    complete: function (e, t) {
      if ("throw" === e.type) throw e.arg;
      return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), h;
    },
    finish: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), k(n), h;
      }
    },
    catch: function (e) {
      for (var t = this.tryEntries.length - 1; t >= 0; --t) {
        var n = this.tryEntries[t];
        if (n.tryLoc === e) {
          var r = n.completion;
          if ("throw" === r.type) {
            var i = r.arg;
            k(n);
          }
          return i;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function (e, t, n) {
      return this.delegate = {
        iterator: O(e),
        resultName: t,
        nextLoc: n
      }, "next" === this.method && (this.arg = void 0), h;
    }
  }, e;
}
class b extends l.a.Component {
  constructor(e) {
    super(e), this.state = {
      visible: !1
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: "theme/getThemes"
    });
  }
  activeTheme(e) {
    var t = this;
    return a()(y().mark(function n() {
      var r;
      return y().wrap(function (n) {
        while (1) switch (n.prev = n.next) {
          case 0:
            return n.next = 2, Object(v["b"])("/" + window.settings.secure_path + "/config/save", {
              frontend_theme: e
            });
          case 2:
            if (r = n.sent, 200 === r.code) {
              n.next = 5;
              break;
            }
            return n.abrupt("return");
          case 5:
            t.props.dispatch({
              type: "theme/getThemes"
            });
          case 6:
          case "end":
            return n.stop();
        }
      }, n);
    }))();
  }
  render() {
    var e = this.props.theme,
      t = e.themes,
      n = e.active;
    e.getThemesLoading;
    return l.a.createElement(c["a"], i()({}, this.props, {
      loading: Object.keys(t).length <= 0,
      title: "主题配置"
    }), <div className={"row"}>
                <div className={"col-lg-12"}>
                    <div className={"alert alert-warning mb-0 mb-md-4"} role={"alert"}>
                        <p className={"mb-0"}>
                            {"如果你采用前后分离的方式部署V2board，那么主题配置将不会生效。了解"}
                            <b>
                                <a href={"https://docs.v2board.com/use/advanced.html#%E5%89%8D%E7%AB%AF%E5%88%86%E7%A6%BB"}>
                                    {"前后分离"}
                                </a>
                            </b>
                        </p>
                    </div>
                </div>
            </div>, Object.keys(t).map(e => {
      var r = t[e];
      return <div className={"block block-transparent bg-image mb-0 mb-md-3 bg-primary"} style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80)"
      }}>
                        <div className={"block-content block-content-full bg-gd-white-op-l"}>
                            <div className={"d-md-flex justify-content-md-between align-items-md-center"}>
                                <div className={"p-2 py-4"}>
                                    <h3 className={"font-size-h4 font-w400 text-black mb-1"}>
                                        {r.name}
                                    </h3>
                                    <p className={"text-black-75 mb-0"}>
                                        {r.description}
                                    </p>
                                </div>
                                <div className={"p-2 py-4"}>
                                    <button type={"button"} className={"btn btn-sm rounded-pill btn-outline-light px-3 mr-2"} onClick={() => this.activeTheme(e)} disabled={n === e}>
                                        {n === e ? "当前主题" : "激活主题"}
                                    </button>
                                    {l.a.createElement(g, {
                keyName: e,
                themeName: r.name,
                configs: r.configs
              }, <button type={"button"} className={"btn btn-sm rounded-pill btn-outline-light px-3"}>
                                            {"主题设置"}
                                        </button>)}
                                </div>
                            </div>
                        </div>
                    </div>;
    }));
  }
}
legacyExports["default"] = Object(u["c"])(e => {
  var t = e.theme;
  return {
    theme: t
  };
})(b);
