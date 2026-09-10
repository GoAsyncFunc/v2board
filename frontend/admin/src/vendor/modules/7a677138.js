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
function i(e, t) {
  if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
}
function o(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function a(e, t, n) {
  return t && o(e.prototype, t), n && o(e, n), e;
}
function s(e, t) {
  if ("function" !== typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), t && l(e, t);
}
function l(e, t) {
  return l = Object.setPrototypeOf || function (e, t) {
    return e.__proto__ = t, e;
  }, l(e, t);
}
function c(e) {
  return function () {
    var t,
      n = d(e);
    if (f()) {
      var r = d(this).constructor;
      t = Reflect.construct(n, arguments, r);
    } else t = n.apply(this, arguments);
    return u(this, t);
  };
}
function u(e, t) {
  return !t || "object" !== r(t) && "function" !== typeof t ? h(e) : t;
}
function h(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function f() {
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
var p = this && this.__importStar || function (e) {
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
var g = p(require("./71317449.js")),
  v = require("./7849304a.js"),
  y = m(require("./30687066.js")),
  b = function (e) {
    s(n, e);
    var t = c(n);
    function n() {
      var e;
      return i(this, n), e = t.apply(this, arguments), e.hasExpandIcon = function (t) {
        var n = e.props,
          r = n.expandRowByClick,
          i = n.expandIcon;
        return !e.expandIconAsCell && t === e.expandIconColumnIndex && (!!i || !r);
      }, e.handleExpandChange = function (t, n) {
        var r = e.props,
          i = r.onExpandedChange,
          o = r.expanded,
          a = r.rowKey;
        e.expandable && i(!o, t, n, a);
      }, e.handleRowClick = function (t, n, r) {
        var i = e.props,
          o = i.expandRowByClick,
          a = i.onRowClick;
        o && e.handleExpandChange(t, r), a && a(t, n, r);
      }, e.renderExpandIcon = function () {
        var t = e.props,
          n = t.prefixCls,
          r = t.expanded,
          i = t.record,
          o = t.needIndentSpaced,
          a = t.expandIcon;
        return a ? a({
          prefixCls: n,
          expanded: r,
          record: i,
          needIndentSpaced: o,
          expandable: e.expandable,
          onExpand: e.handleExpandChange
        }) : g.createElement(y.default, {
          expandable: e.expandable,
          prefixCls: n,
          onExpand: e.handleExpandChange,
          needIndentSpaced: o,
          expanded: r,
          record: i
        });
      }, e.renderExpandIconCell = function (t) {
        if (e.expandIconAsCell) {
          var n = e.props.prefixCls;
          t.push(g.createElement("td", {
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
          i = e.record,
          o = e.fixed,
          a = e.expanded;
        this.expandIconAsCell = "right" !== o && this.props.expandIconAsCell, this.expandIconColumnIndex = "right" !== o ? this.props.expandIconColumnIndex : -1;
        var s = i[t];
        this.expandable = !(!s && !n);
        var l = {
          indentSize: r,
          expanded: a,
          onRowClick: this.handleRowClick,
          hasExpandIcon: this.hasExpandIcon,
          renderExpandIcon: this.renderExpandIcon,
          renderExpandIconCell: this.renderExpandIconCell
        };
        return this.props.children(l);
      }
    }]), n;
  }(g.Component);
legacyExports.default = v.connect(function (e, t) {
  var n = e.expandedRowKeys,
    r = void 0 === n ? [] : n,
    i = t.rowKey;
  return {
    expanded: r.includes(i)
  };
})(b);
