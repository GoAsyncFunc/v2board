let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return s(e) || a(e) || o(e) || i();
}
function i() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function o(e, t) {
  if (e) {
    if ("string" === typeof e) return l(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(n) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? l(e, t) : void 0;
  }
}
function a(e) {
  if ("undefined" !== typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e);
}
function s(e) {
  if (Array.isArray(e)) return l(e);
}
function l(e, t) {
  (null == t || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
  return r;
}
function c(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function (t) {
      return Object.getOwnPropertyDescriptor(e, t).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function u(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = null != arguments[t] ? arguments[t] : {};
    t % 2 ? c(Object(n), !0).forEach(function (t) {
      h(e, t, n[t]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : c(Object(n)).forEach(function (t) {
      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
    });
  }
  return e;
}
function h(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function f(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function d(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function p(e, t, n) {
  return t && d(e.prototype, t), n && d(e, n), e;
}
var m = this && this.__importStar || function (e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
  return t["default"] = e, t;
};
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var g = m(require("./71317449.js")),
  v = function () {
    function e(t, n) {
      f(this, e), this._cached = {}, this.columns = t || this.normalize(n);
    }
    return p(e, [{
      key: "isAnyColumnsFixed",
      value: function () {
        var e = this;
        return this._cache("isAnyColumnsFixed", function () {
          return e.columns.some(function (e) {
            return !!e.fixed;
          });
        });
      }
    }, {
      key: "isAnyColumnsLeftFixed",
      value: function () {
        var e = this;
        return this._cache("isAnyColumnsLeftFixed", function () {
          return e.columns.some(function (e) {
            return "left" === e.fixed || !0 === e.fixed;
          });
        });
      }
    }, {
      key: "isAnyColumnsRightFixed",
      value: function () {
        var e = this;
        return this._cache("isAnyColumnsRightFixed", function () {
          return e.columns.some(function (e) {
            return "right" === e.fixed;
          });
        });
      }
    }, {
      key: "leftColumns",
      value: function () {
        var e = this;
        return this._cache("leftColumns", function () {
          return e.groupedColumns().filter(function (e) {
            return "left" === e.fixed || !0 === e.fixed;
          });
        });
      }
    }, {
      key: "rightColumns",
      value: function () {
        var e = this;
        return this._cache("rightColumns", function () {
          return e.groupedColumns().filter(function (e) {
            return "right" === e.fixed;
          });
        });
      }
    }, {
      key: "leafColumns",
      value: function () {
        var e = this;
        return this._cache("leafColumns", function () {
          return e._leafColumns(e.columns);
        });
      }
    }, {
      key: "leftLeafColumns",
      value: function () {
        var e = this;
        return this._cache("leftLeafColumns", function () {
          return e._leafColumns(e.leftColumns());
        });
      }
    }, {
      key: "rightLeafColumns",
      value: function () {
        var e = this;
        return this._cache("rightLeafColumns", function () {
          return e._leafColumns(e.rightColumns());
        });
      }
    }, {
      key: "groupedColumns",
      value: function () {
        var e = this;
        return this._cache("groupedColumns", function () {
          var t = function e(t) {
            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
              r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : [];
            i[n] = i[n] || [];
            var o = [],
              a = function (e) {
                var t = i.length - n;
                e && !e.children && t > 1 && (!e.rowSpan || e.rowSpan < t) && (e.rowSpan = t);
              };
            return t.forEach(function (s, l) {
              var c = u({}, s);
              i[n].push(c), r.colSpan = r.colSpan || 0, c.children && c.children.length > 0 ? (c.children = e(c.children, n + 1, c, i), r.colSpan += c.colSpan) : r.colSpan += 1;
              for (var h = 0; h < i[n].length - 1; h += 1) a(i[n][h]);
              l + 1 === t.length && a(c), o.push(c);
            }), o;
          };
          return t(e.columns);
        });
      }
    }, {
      key: "normalize",
      value: function (e) {
        var t = this,
          n = [];
        return g.Children.forEach(e, function (e) {
          if (g.isValidElement(e)) {
            var r = u({}, e.props);
            e.key && (r.key = e.key), e.type.isTableColumnGroup && (r.children = t.normalize(r.children)), n.push(r);
          }
        }), n;
      }
    }, {
      key: "reset",
      value: function (e, t) {
        this.columns = e || this.normalize(t), this._cached = {};
      }
    }, {
      key: "_cache",
      value: function (e, t) {
        return e in this._cached ? this._cached[e] : (this._cached[e] = t(), this._cached[e]);
      }
    }, {
      key: "_leafColumns",
      value: function (e) {
        var t = this,
          n = [];
        return e.forEach(function (e) {
          e.children ? n.push.apply(n, r(t._leafColumns(e.children))) : n.push(e);
        }), n;
      }
    }]), e;
  }();
legacyExports.default = v;
