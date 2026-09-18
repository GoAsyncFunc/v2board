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
function o(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function i(e, t) {
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
function c(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && u(e, t);
}
function u(e, t) {
  return u = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, u(e, t);
}
function l(e) {
  return function () {
    var t,
      n = h(e);
    if (d()) {
      var r = h(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return f(this, t);
  };
}
function f(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? p(e) : t;
}
function p(e) {
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
function h(e) {
  return h = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, h(e);
}
var m = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  v = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var y = m(require("./reactRuntime.js")),
  g = m(require("./propTypesRuntime.js")),
  b = v(require("./47797478.js")),
  w = v(require("./7273474d.js")),
  x = v(require("./warningRuntime.js")),
  O = require("./reactReduxRuntime.js"),
  E = v(require("./merge.js")),
  _ = v(require("./5046577a.js")),
  k = v(require("./classNames.js")),
  S = require("./reactLifecyclesCompat.js"),
  C = require("./364f6771.js"),
  j = v(require("./426a5a73.js")),
  P = v(require("./43697435.js")),
  T = v(require("./59714446.js")),
  L = v(require("./nullFunction.js")),
  N = v(require("./41484a73.js")),
  M = v(require("./505a4459.js")),
  A = function (e) {
    c(n, e);
    var t = l(n);
    function n(e) {
      var r;
      return i(this, n), r = t.call(this, e), r.state = {}, r.getRowKey = function (e, t) {
        var n = r.props.rowKey,
          o = "function" === typeof n ? n(e, t) : e[n];
        return x.default(void 0 !== o, "Each record in table should have a unique `key` prop,or set `rowKey` to an unique primary key."), void 0 === o ? t : o;
      }, r.handleWindowResize = function () {
        r.syncFixedTableRowHeight(), r.setScrollPositionClassName();
      }, r.syncFixedTableRowHeight = function () {
        var e = r.tableNode.getBoundingClientRect();
        if (!(void 0 !== e.height && e.height <= 0)) {
          var t = r.props.prefixCls,
            n = r.headTable ? r.headTable.querySelectorAll("thead") : r.bodyTable.querySelectorAll("thead"),
            o = r.bodyTable.querySelectorAll(".".concat(t, "-row")) || [],
            i = [].map.call(n, function (e) {
              return e.getBoundingClientRect().height || "auto";
            }),
            a = r.store.getState(),
            s = [].reduce.call(o, function (e, t) {
              var n = t.getAttribute("data-row-key"),
                r = t.getBoundingClientRect().height || a.fixedColumnsBodyRowsHeight[n] || "auto";
              return e[n] = r, e;
            }, {});
          b.default(a.fixedColumnsHeadRowsHeight, i) && b.default(a.fixedColumnsBodyRowsHeight, s) || r.store.setState({
            fixedColumnsHeadRowsHeight: i,
            fixedColumnsBodyRowsHeight: s
          });
        }
      }, r.handleBodyScrollLeft = function (e) {
        if (e.currentTarget === e.target) {
          var t = e.target,
            n = r.props.scroll,
            o = void 0 === n ? {} : n,
            i = p(r),
            a = i.headTable,
            s = i.bodyTable;
          t.scrollLeft !== r.lastScrollLeft && o.x && (t === s && a ? a.scrollLeft = t.scrollLeft : t === a && s && (s.scrollLeft = t.scrollLeft), r.setScrollPositionClassName()), r.lastScrollLeft = t.scrollLeft;
        }
      }, r.handleBodyScrollTop = function (e) {
        var t = e.target;
        if (e.currentTarget === t) {
          var n = r.props.scroll,
            o = void 0 === n ? {} : n,
            i = p(r),
            a = i.headTable,
            s = i.bodyTable,
            c = i.fixedColumnsBodyLeft,
            u = i.fixedColumnsBodyRight;
          if (t.scrollTop !== r.lastScrollTop && o.y && t !== a) {
            var l = t.scrollTop;
            c && t !== c && (c.scrollTop = l), u && t !== u && (u.scrollTop = l), s && t !== s && (s.scrollTop = l);
          }
          r.lastScrollTop = t.scrollTop;
        }
      }, r.handleBodyScroll = function (e) {
        r.handleBodyScrollLeft(e), r.handleBodyScrollTop(e);
      }, r.handleWheel = function (e) {
        var t = r.props.scroll,
          n = void 0 === t ? {} : t;
        if (window.navigator.userAgent.match(/Trident\/7\./) && n.y) {
          var o = e.deltaY,
            i = e.target,
            a = p(r),
            s = a.bodyTable,
            c = a.fixedColumnsBodyLeft,
            u = a.fixedColumnsBodyRight,
            l = 0;
          l = r.lastScrollTop ? r.lastScrollTop + o : o, c && i !== c && (e.preventDefault(), c.scrollTop = l), u && i !== u && (e.preventDefault(), u.scrollTop = l), s && i !== s && (e.preventDefault(), s.scrollTop = l);
        }
      }, r.saveRef = function (e) {
        return function (t) {
          r[e] = t;
        };
      }, r.saveTableNodeRef = function (e) {
        r.tableNode = e;
      }, ["onRowClick", "onRowDoubleClick", "onRowContextMenu", "onRowMouseEnter", "onRowMouseLeave"].forEach(function (t) {
        x.default(void 0 === e[t], "".concat(t, " is deprecated, please use onRow instead."));
      }), x.default(void 0 === e.getBodyWrapper, "getBodyWrapper is deprecated, please use custom components instead."), r.columnManager = new j.default(e.columns, e.children), r.store = O.create({
        currentHoverKey: null,
        fixedColumnsHeadRowsHeight: [],
        fixedColumnsBodyRowsHeight: {}
      }), r.setScrollPosition("left"), r.debouncedWindowResize = C.debounce(r.handleWindowResize, 150), r;
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
          "both" === e ? _.default(this.tableNode).remove(new RegExp("^".concat(t, "-scroll-position-.+$"))).add("".concat(t, "-scroll-position-left")).add("".concat(t, "-scroll-position-right")) : _.default(this.tableNode).remove(new RegExp("^".concat(t, "-scroll-position-.+$"))).add("".concat(t, "-scroll-position-").concat(e));
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
          o = e.useFixedHeader,
          i = e.scroll,
          a = void 0 === i ? {} : i;
        return "undefined" !== typeof t ? "fixed" === t : !!r.some(function (e) {
          var t = e.ellipsis;
          return !!t;
        }) || !(!o && !a.y) || !(!a.x || !0 === a.x || "max-content" === a.x);
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
          o = r || t.x || t.y,
          i = [this.renderTable({
            columns: this.columnManager.groupedColumns(),
            isAnyColumnsFixed: r
          }), this.renderEmptyText(), this.renderFooter()];
        return o ? y.createElement("div", {
          className: "".concat(n, "-scroll")
        }, i) : i;
      }
    }, {
      key: "renderLeftFixedTable",
      value: function () {
        var e = this.props.prefixCls;
        return y.createElement("div", {
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
        return y.createElement("div", {
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
          o = this.props,
          i = o.prefixCls,
          a = o.scroll,
          s = void 0 === a ? {} : a,
          c = s.x || n ? "".concat(i, "-fixed") : "",
          u = y.createElement(P.default, {
            key: "head",
            columns: t,
            fixed: n,
            tableClassName: c,
            handleBodyScrollLeft: this.handleBodyScrollLeft,
            expander: this.expander
          }),
          l = y.createElement(T.default, {
            key: "body",
            columns: t,
            fixed: n,
            tableClassName: c,
            getRowKey: this.getRowKey,
            handleWheel: this.handleWheel,
            handleBodyScroll: this.handleBodyScroll,
            expander: this.expander,
            isAnyColumnsFixed: r
          });
        return [u, l];
      }
    }, {
      key: "renderTitle",
      value: function () {
        var e = this.props,
          t = e.title,
          n = e.prefixCls;
        return t ? y.createElement("div", {
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
        return t ? y.createElement("div", {
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
        var o = "".concat(n, "-placeholder");
        return y.createElement("div", {
          className: o,
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
        var i = k.default(n.prefixCls, n.className, (e = {}, o(e, "".concat(r, "-fixed-header"), n.useFixedHeader || n.scroll && n.scroll.y), o(e, "".concat(r, "-scroll-position-left ").concat(r, "-scroll-position-right"), "both" === this.scrollPosition), o(e, "".concat(r, "-scroll-position-").concat(this.scrollPosition), "both" !== this.scrollPosition), o(e, "".concat(r, "-layout-fixed"), this.isTableLayoutFixed()), e)),
          a = this.columnManager.isAnyColumnsLeftFixed(),
          s = this.columnManager.isAnyColumnsRightFixed(),
          c = C.getDataAndAriaProps(n);
        return y.createElement(O.Provider, {
          store: this.store
        }, y.createElement(M.default, Object.assign({}, n, {
          columnManager: this.columnManager,
          getRowKey: this.getRowKey
        }), function (e) {
          return t.expander = e, y.createElement("div", Object.assign({
            ref: t.saveTableNodeRef,
            className: i,
            style: n.style,
            id: n.id
          }, c), t.renderTitle(), y.createElement("div", {
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
  }(y.Component);
A.childContextTypes = {
  table: g.any,
  components: g.any
}, A.Column = L.default, A.ColumnGroup = N.default, A.defaultProps = {
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
}, S.polyfill(A), legacyExports.default = A;
