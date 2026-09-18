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
function o(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function i(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function a(e, t, n) {
  return t && i(e.prototype, t), n && i(e, n), e;
}
function s(e, t) {
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
      n = d(e);
    if (p()) {
      var r = d(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return l(this, t);
  };
}
function l(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? f(e) : t;
}
function f(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function p() {
  if ("undefined" === typeof Reflect || !Reflect.construct) return !1;
  if (Reflect.construct.sham) return !1;
  if ("function" === typeof Proxy) return !0;
  try {
    return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
  } catch (e) {
    return !1;
  }
}
function d(e) {
  return d = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) {
    return e.__proto__ || Object.getPrototypeOf(e);
  }, d(e);
}
var h = this && this.__importStar || function (e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var n in e) Object.hasOwnProperty.call(e, n) && (t[n] = e[n]);
    return t["default"] = e, t;
  },
  m = this && this.__importDefault || function (e) {
    return e && e.__esModule ? e : {
      default: e
    };
  };
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var v = h(require("./reactRuntime.js")),
  y = require("./reactReduxRuntime.js"),
  g = m(require("./30687066.js")),
  b = function (e) {
    s(n, e);
    var t = u(n);
    function n() {
      var e;
      return o(this, n), e = t.apply(this, arguments), e.hasExpandIcon = function (t) {
        var n = e.props,
          r = n.expandRowByClick,
          o = n.expandIcon;
        return !e.expandIconAsCell && t === e.expandIconColumnIndex && (!!o || !r);
      }, e.handleExpandChange = function (t, n) {
        var r = e.props,
          o = r.onExpandedChange,
          i = r.expanded,
          a = r.rowKey;
        e.expandable && o(!i, t, n, a);
      }, e.handleRowClick = function (t, n, r) {
        var o = e.props,
          i = o.expandRowByClick,
          a = o.onRowClick;
        i && e.handleExpandChange(t, r), a && a(t, n, r);
      }, e.renderExpandIcon = function () {
        var t = e.props,
          n = t.prefixCls,
          r = t.expanded,
          o = t.record,
          i = t.needIndentSpaced,
          a = t.expandIcon;
        return a ? a({
          prefixCls: n,
          expanded: r,
          record: o,
          needIndentSpaced: i,
          expandable: e.expandable,
          onExpand: e.handleExpandChange
        }) : v.createElement(g.default, {
          expandable: e.expandable,
          prefixCls: n,
          onExpand: e.handleExpandChange,
          needIndentSpaced: i,
          expanded: r,
          record: o
        });
      }, e.renderExpandIconCell = function (t) {
        if (e.expandIconAsCell) {
          var n = e.props.prefixCls;
          t.push(v.createElement("td", {
            className: "".concat(n, "-expand-icon-cell"),
            key: "rc-table-expand-icon-cell"
          }, e.renderExpandIcon()));
        }
      }, e;
    }
    return a(n, [{
      key: "componentWillUnmount",
      value: function () {
        this.handleDestroy();
      }
    }, {
      key: "handleDestroy",
      value: function () {
        var e = this.props,
          t = e.onExpandedChange,
          n = e.rowKey,
          r = e.record;
        this.expandable && t(!1, r, null, n, !0);
      }
    }, {
      key: "render",
      value: function () {
        var e = this.props,
          t = e.childrenColumnName,
          n = e.expandedRowRender,
          r = e.indentSize,
          o = e.record,
          i = e.fixed,
          a = e.expanded;
        this.expandIconAsCell = "right" !== i && this.props.expandIconAsCell, this.expandIconColumnIndex = "right" !== i ? this.props.expandIconColumnIndex : -1;
        var s = o[t];
        this.expandable = !(!s && !n);
        var c = {
          indentSize: r,
          expanded: a,
          onRowClick: this.handleRowClick,
          hasExpandIcon: this.hasExpandIcon,
          renderExpandIcon: this.renderExpandIcon,
          renderExpandIconCell: this.renderExpandIconCell
        };
        return this.props.children(c);
      }
    }]), n;
  }(v.Component);
legacyExports.default = y.connect(function (e, t) {
  var n = e.expandedRowKeys,
    r = void 0 === n ? [] : n,
    o = t.rowKey;
  return {
    expanded: r.includes(o)
  };
})(b);
