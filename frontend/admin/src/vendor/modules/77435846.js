let legacyModule = module,
  legacyExports = exports;
function r(e) {
  "@babel/helpers - typeof";

  return r = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, r(e);
}
function i(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function a(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function s(e, t, n) {
  return t && a(e.prototype, t), n && a(e, n), e;
}
function l(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && c(e, t);
}
function c(e, t) {
  return c = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, c(e, t);
}
function u(e) {
  return function () {
    var t,
      n = p(e);
    if (d()) {
      var r = p(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return h(this, t);
  };
}
function h(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? f(e) : t;
}
function f(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function d() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function p(e) {
  return p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, p(e);
}
var m = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  g = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var v = m(require("./reactRuntime.js")),
  y = m(require("./propTypesRuntime.js")),
  b = g(require("./47797478.js")),
  w = g(require("./7273474d.js")),
  x = g(require("./warningRuntime.js")),
  _ = require("./reactReduxRuntime.js"),
  E = g(require("./merge.js")),
  S = g(require("./5046577a.js")),
  k = g(require("./classNames.js")),
  C = require("./reactLifecyclesCompat.js"),
  O = require("./364f6771.js"),
  T = g(require("./426a5a73.js")),
  L = g(require("./43697435.js")),
  A = g(require("./59714446.js")),
  P = g(require("./nullFunction.js")),
  j = g(require("./41484a73.js")),
  M = g(require("./505a4459.js")),
  R = function (e) {
    l(n, e);
    var t = u(n);
    function n(e) {
      var r;
      return o(this, n), r = t.call(this, e), r.state = {}, r.getRowKey = function (e, t) {
        var n = r.props.rowKey,
          i = "function" === typeof n ? n(e, t) : e[n];
        return x.default(void 0 !== i, "Each record in table should have a unique `key` prop,or set `rowKey` to an unique primary key."), void 0 === i ? t : i;
      }, r.handleWindowResize = function () {
        r.syncFixedTableRowHeight(), r.setScrollPositionClassName();
      }, r.syncFixedTableRowHeight = function () {
        var e = r.tableNode.getBoundingClientRect();
        if (!(void 0 !== e.height && e.height <= 0)) {
          var t = r.props.prefixCls,
            n = r.headTable ? r.headTable.querySelectorAll("thead") : r.bodyTable.querySelectorAll("thead"),
            i = r.bodyTable.querySelectorAll(".".concat(t, "-row")) || [],
            o = [].map.call(n, function (e) {
              return e.getBoundingClientRect().height || "auto";
            }),
            a = r.store.getState(),
            s = [].reduce.call(i, function (e, t) {
              var n = t.getAttribute("data-row-key"),
                r = t.getBoundingClientRect().height || a.fixedColumnsBodyRowsHeight[n] || "auto";
              return e[n] = r, e;
            }, {});
          b.default(a.fixedColumnsHeadRowsHeight, o) && b.default(a.fixedColumnsBodyRowsHeight, s) || r.store.setState({
            fixedColumnsHeadRowsHeight: o,
            fixedColumnsBodyRowsHeight: s
          });
        }
      }, r.handleBodyScrollLeft = function (e) {
        if (e.currentTarget === e.target) {
          var t = e.target,
            n = r.props.scroll,
            i = void 0 === n ? {} : n,
            o = f(r),
            a = o.headTable,
            s = o.bodyTable;
          t.scrollLeft !== r.lastScrollLeft && i.x && (t === s && a ? a.scrollLeft = t.scrollLeft : t === a && s && (s.scrollLeft = t.scrollLeft), r.setScrollPositionClassName()), r.lastScrollLeft = t.scrollLeft;
        }
      }, r.handleBodyScrollTop = function (e) {
        var t = e.target;
        if (e.currentTarget === t) {
          var n = r.props.scroll,
            i = void 0 === n ? {} : n,
            o = f(r),
            a = o.headTable,
            s = o.bodyTable,
            l = o.fixedColumnsBodyLeft,
            c = o.fixedColumnsBodyRight;
          if (t.scrollTop !== r.lastScrollTop && i.y && t !== a) {
            var u = t.scrollTop;
            l && t !== l && (l.scrollTop = u), c && t !== c && (c.scrollTop = u), s && t !== s && (s.scrollTop = u);
          }
          r.lastScrollTop = t.scrollTop;
        }
      }, r.handleBodyScroll = function (e) {
        r.handleBodyScrollLeft(e), r.handleBodyScrollTop(e);
      }, r.handleWheel = function (e) {
        var t = r.props.scroll,
          n = void 0 === t ? {} : t;
        if (window.navigator.userAgent.match(/Trident\/7\./) && n.y) {
          var i = e.deltaY,
            o = e.target,
            a = f(r),
            s = a.bodyTable,
            l = a.fixedColumnsBodyLeft,
            c = a.fixedColumnsBodyRight,
            u = 0;
          u = r.lastScrollTop ? r.lastScrollTop + i : i, l && o !== l && (e.preventDefault(), l.scrollTop = u), c && o !== c && (e.preventDefault(), c.scrollTop = u), s && o !== s && (e.preventDefault(), s.scrollTop = u);
        }
      }, r.saveRef = function (e) {
        return function (t) {
          r[e] = t;
        };
      }, r.saveTableNodeRef = function (e) {
        r.tableNode = e;
      }, ["onRowClick", "onRowDoubleClick", "onRowContextMenu", "onRowMouseEnter", "onRowMouseLeave"].forEach(function (t) {
        x.default(void 0 === e[t], "".concat(t, " is deprecated, please use onRow instead."));
      }), x.default(void 0 === e.getBodyWrapper, "getBodyWrapper is deprecated, please use custom components instead."), r.columnManager = new T.default(e.columns, e.children), r.store = _.create({
        currentHoverKey: null,
        fixedColumnsHeadRowsHeight: [],
        fixedColumnsBodyRowsHeight: {}
      }), r.setScrollPosition("left"), r.debouncedWindowResize = O.debounce(r.handleWindowResize, 150), r;
    }
    return s(n, [{
      key: "getChildContext",
      value: function () {
        return {
          table: {
            props: this.props,
            columnManager: this.columnManager,
            saveRef: this.saveRef,
            components: E.default({
              table: "table",
              header: {
                wrapper: "thead",
                row: "tr",
                cell: "th"
              },
              body: {
                wrapper: "tbody",
                row: "tr",
                cell: "td"
              }
            }, this.props.components)
          }
        };
      }
    }, {
      key: "componentDidMount",
      value: function () {
        this.columnManager.isAnyColumnsFixed() && (this.handleWindowResize(), this.resizeEvent = w.default(window, "resize", this.debouncedWindowResize)), this.headTable && (this.headTable.scrollLeft = 0), this.bodyTable && (this.bodyTable.scrollLeft = 0);
      }
    }, {
      key: "componentDidUpdate",
      value: function (e) {
        this.columnManager.isAnyColumnsFixed() && (this.handleWindowResize(), this.resizeEvent || (this.resizeEvent = w.default(window, "resize", this.debouncedWindowResize))), e.data.length > 0 && 0 === this.props.data.length && this.hasScrollX() && this.resetScrollX();
      }
    }, {
      key: "componentWillUnmount",
      value: function () {
        this.resizeEvent && this.resizeEvent.remove(), this.debouncedWindowResize && this.debouncedWindowResize.cancel();
      }
    }, {
      key: "setScrollPosition",
      value: function (e) {
        if (this.scrollPosition = e, this.tableNode) {
          var t = this.props.prefixCls;
          "both" === e ? S.default(this.tableNode).remove(new RegExp("^".concat(t, "-scroll-position-.+$"))).add("".concat(t, "-scroll-position-left")).add("".concat(t, "-scroll-position-right")) : S.default(this.tableNode).remove(new RegExp("^".concat(t, "-scroll-position-.+$"))).add("".concat(t, "-scroll-position-").concat(e));
        }
      }
    }, {
      key: "setScrollPositionClassName",
      value: function () {
        var e = this.bodyTable,
          t = 0 === e.scrollLeft,
          n = e.scrollLeft + 1 >= e.children[0].getBoundingClientRect().width - e.getBoundingClientRect().width;
        t && n ? this.setScrollPosition("both") : t ? this.setScrollPosition("left") : n ? this.setScrollPosition("right") : "middle" !== this.scrollPosition && this.setScrollPosition("middle");
      }
    }, {
      key: "isTableLayoutFixed",
      value: function () {
        var e = this.props,
          t = e.tableLayout,
          n = e.columns,
          r = void 0 === n ? [] : n,
          i = e.useFixedHeader,
          o = e.scroll,
          a = void 0 === o ? {} : o;
        return "undefined" !== typeof t ? "fixed" === t : !!r.some(function (e) {
          var t = e.ellipsis;
          return !!t;
        }) || !(!i && !a.y) || !(!a.x || !0 === a.x || "max-content" === a.x);
      }
    }, {
      key: "resetScrollX",
      value: function () {
        this.headTable && (this.headTable.scrollLeft = 0), this.bodyTable && (this.bodyTable.scrollLeft = 0);
      }
    }, {
      key: "hasScrollX",
      value: function () {
        var e = this.props.scroll,
          t = void 0 === e ? {} : e;
        return "x" in t;
      }
    }, {
      key: "renderMainTable",
      value: function () {
        var e = this.props,
          t = e.scroll,
          n = e.prefixCls,
          r = this.columnManager.isAnyColumnsFixed(),
          i = r || t.x || t.y,
          o = [this.renderTable({
            columns: this.columnManager.groupedColumns(),
            isAnyColumnsFixed: r
          }), this.renderEmptyText(), this.renderFooter()];
        return i ? v.createElement("div", {
          className: "".concat(n, "-scroll")
        }, o) : o;
      }
    }, {
      key: "renderLeftFixedTable",
      value: function () {
        var e = this.props.prefixCls;
        return v.createElement("div", {
          className: "".concat(e, "-fixed-left")
        }, this.renderTable({
          columns: this.columnManager.leftColumns(),
          fixed: "left"
        }));
      }
    }, {
      key: "renderRightFixedTable",
      value: function () {
        var e = this.props.prefixCls;
        return v.createElement("div", {
          className: "".concat(e, "-fixed-right")
        }, this.renderTable({
          columns: this.columnManager.rightColumns(),
          fixed: "right"
        }));
      }
    }, {
      key: "renderTable",
      value: function (e) {
        var t = e.columns,
          n = e.fixed,
          r = e.isAnyColumnsFixed,
          i = this.props,
          o = i.prefixCls,
          a = i.scroll,
          s = void 0 === a ? {} : a,
          l = s.x || n ? "".concat(o, "-fixed") : "",
          c = v.createElement(L.default, {
            key: "head",
            columns: t,
            fixed: n,
            tableClassName: l,
            handleBodyScrollLeft: this.handleBodyScrollLeft,
            expander: this.expander
          }),
          u = v.createElement(A.default, {
            key: "body",
            columns: t,
            fixed: n,
            tableClassName: l,
            getRowKey: this.getRowKey,
            handleWheel: this.handleWheel,
            handleBodyScroll: this.handleBodyScroll,
            expander: this.expander,
            isAnyColumnsFixed: r
          });
        return [c, u];
      }
    }, {
      key: "renderTitle",
      value: function () {
        var e = this.props,
          t = e.title,
          n = e.prefixCls;
        return t ? v.createElement("div", {
          className: "".concat(n, "-title"),
          key: "title"
        }, t(this.props.data)) : null;
      }
    }, {
      key: "renderFooter",
      value: function () {
        var e = this.props,
          t = e.footer,
          n = e.prefixCls;
        return t ? v.createElement("div", {
          className: "".concat(n, "-footer"),
          key: "footer"
        }, t(this.props.data)) : null;
      }
    }, {
      key: "renderEmptyText",
      value: function () {
        var e = this.props,
          t = e.emptyText,
          n = e.prefixCls,
          r = e.data;
        if (r.length) return null;
        var i = "".concat(n, "-placeholder");
        return v.createElement("div", {
          className: i,
          key: "emptyText"
        }, "function" === typeof t ? t() : t);
      }
    }, {
      key: "render",
      value: function () {
        var e,
          t = this,
          n = this.props,
          r = n.prefixCls;
        this.state.columns ? this.columnManager.reset(n.columns) : this.state.children && this.columnManager.reset(null, n.children);
        var o = k.default(n.prefixCls, n.className, (e = {}, i(e, "".concat(r, "-fixed-header"), n.useFixedHeader || n.scroll && n.scroll.y), i(e, "".concat(r, "-scroll-position-left ").concat(r, "-scroll-position-right"), "both" === this.scrollPosition), i(e, "".concat(r, "-scroll-position-").concat(this.scrollPosition), "both" !== this.scrollPosition), i(e, "".concat(r, "-layout-fixed"), this.isTableLayoutFixed()), e)),
          a = this.columnManager.isAnyColumnsLeftFixed(),
          s = this.columnManager.isAnyColumnsRightFixed(),
          l = O.getDataAndAriaProps(n);
        return v.createElement(_.Provider, {
          store: this.store
        }, v.createElement(M.default, Object.assign({}, n, {
          columnManager: this.columnManager,
          getRowKey: this.getRowKey
        }), function (e) {
          return t.expander = e, v.createElement("div", Object.assign({
            ref: t.saveTableNodeRef,
            className: o,
            style: n.style,
            id: n.id
          }, l), t.renderTitle(), v.createElement("div", {
            className: "".concat(r, "-content")
          }, t.renderMainTable(), a && t.renderLeftFixedTable(), s && t.renderRightFixedTable()));
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function (e, t) {
        return e.columns && e.columns !== t.columns ? {
          columns: e.columns,
          children: null
        } : e.children !== t.children ? {
          columns: null,
          children: e.children
        } : null;
      }
    }]), n;
  }(v.Component);
R.childContextTypes = {
  table: y.any,
  components: y.any
}, R.Column = P.default, R.ColumnGroup = j.default, R.defaultProps = {
  data: [],
  useFixedHeader: !1,
  rowKey: "key",
  rowClassName: function () {
    return "";
  },
  onRow: function () {},
  onHeaderRow: function () {},
  prefixCls: "rc-table",
  bodyStyle: {},
  style: {},
  showHeader: !0,
  scroll: {},
  rowRef: function () {
    return null;
  },
  emptyText: function () {
    return "No Data";
  }
}, C.polyfill(R), legacyExports.default = R;
