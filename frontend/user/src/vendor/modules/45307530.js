let legacyModule = module,
  legacyExports = exports;
function r(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}
Object.defineProperty(legacyExports, "__esModule", {
  value: !0
});
var o = require("./51446c63.js"),
  i = r(o),
  a = require("./4d677a57.js"),
  s = r(a),
  c = !0,
  u = !1,
  l = ["altKey", "bubbles", "cancelable", "ctrlKey", "currentTarget", "eventPhase", "metaKey", "shiftKey", "target", "timeStamp", "view", "type"];
function f(e) {
  return null === e || void 0 === e;
}
var p = [{
  reg: /^key/,
  props: ["char", "charCode", "key", "keyCode", "which"],
  fix: function (e, t) {
    f(e.which) && (e.which = f(t.charCode) ? t.keyCode : t.charCode), void 0 === e.metaKey && (e.metaKey = e.ctrlKey);
  }
}, {
  reg: /^touch/,
  props: ["touches", "changedTouches", "targetTouches"]
}, {
  reg: /^hashchange$/,
  props: ["newURL", "oldURL"]
}, {
  reg: /^gesturechange$/i,
  props: ["rotation", "scale"]
}, {
  reg: /^(mousewheel|DOMMouseScroll)$/,
  props: [],
  fix: function (e, t) {
    var n = void 0,
      r = void 0,
      o = void 0,
      i = t.wheelDelta,
      a = t.axis,
      s = t.wheelDeltaY,
      c = t.wheelDeltaX,
      u = t.detail;
    i && (o = i / 120), u && (o = 0 - (u % 3 === 0 ? u / 3 : u)), void 0 !== a && (a === e.HORIZONTAL_AXIS ? (r = 0, n = 0 - o) : a === e.VERTICAL_AXIS && (n = 0, r = o)), void 0 !== s && (r = s / 120), void 0 !== c && (n = -1 * c / 120), n || r || (r = o), void 0 !== n && (e.deltaX = n), void 0 !== r && (e.deltaY = r), void 0 !== o && (e.delta = o);
  }
}, {
  reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
  props: ["buttons", "clientX", "clientY", "button", "offsetX", "relatedTarget", "which", "fromElement", "toElement", "offsetY", "pageX", "pageY", "screenX", "screenY"],
  fix: function (e, t) {
    var n = void 0,
      r = void 0,
      o = void 0,
      i = e.target,
      a = t.button;
    return i && f(e.pageX) && !f(t.clientX) && (n = i.ownerDocument || document, r = n.documentElement, o = n.body, e.pageX = t.clientX + (r && r.scrollLeft || o && o.scrollLeft || 0) - (r && r.clientLeft || o && o.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || o && o.scrollTop || 0) - (r && r.clientTop || o && o.clientTop || 0)), e.which || void 0 === a || (e.which = 1 & a ? 1 : 2 & a ? 3 : 4 & a ? 2 : 0), !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === i ? e.toElement : e.fromElement), e;
  }
}];
function d() {
  return c;
}
function h() {
  return u;
}
function m(e) {
  var t = e.type,
    n = "function" === typeof e.stopPropagation || "boolean" === typeof e.cancelBubble;
  i["default"].call(this), this.nativeEvent = e;
  var r = h;
  "defaultPrevented" in e ? r = e.defaultPrevented ? d : h : "getPreventDefault" in e ? r = e.getPreventDefault() ? d : h : "returnValue" in e && (r = e.returnValue === u ? d : h), this.isDefaultPrevented = r;
  var o = [],
    a = void 0,
    s = void 0,
    c = void 0,
    f = l.concat();
  p.forEach(function (e) {
    t.match(e.reg) && (f = f.concat(e.props), e.fix && o.push(e.fix));
  }), s = f.length;
  while (s) c = f[--s], this[c] = e[c];
  !this.target && n && (this.target = e.srcElement || document), this.target && 3 === this.target.nodeType && (this.target = this.target.parentNode), s = o.length;
  while (s) a = o[--s], a(this, e);
  this.timeStamp = e.timeStamp || Date.now();
}
var v = i["default"].prototype;
(0, s["default"])(m.prototype, v, {
  constructor: m,
  preventDefault: function () {
    var e = this.nativeEvent;
    e.preventDefault ? e.preventDefault() : e.returnValue = u, v.preventDefault.call(this);
  },
  stopPropagation: function () {
    var e = this.nativeEvent;
    e.stopPropagation ? e.stopPropagation() : e.cancelBubble = c, v.stopPropagation.call(this);
  }
}), legacyExports["default"] = m, legacyModule.exports = legacyExports["default"];
